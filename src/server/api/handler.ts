import { NextRequest, NextResponse } from 'next/server';
import { ZodError, ZodSchema } from 'zod';

export type ErrorCode =
  | 'UNAUTHENTICATED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'INTERNAL';

export class ApiError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    public readonly status: number = 500,
    public readonly fields?: Record<string, string>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class UnauthenticatedError extends ApiError {
  constructor(message = 'You must be logged in to access this resource') {
    super('UNAUTHENTICATED', message, 401);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'You do not have permission to perform this action') {
    super('FORBIDDEN', message, 403);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'The requested resource was not found') {
    super('NOT_FOUND', message, 404);
  }
}

export class ValidationError extends ApiError {
  constructor(message = 'Validation failed', fields?: Record<string, string>) {
    super('VALIDATION_ERROR', message, 422, fields);
  }
}

export class ConflictError extends ApiError {
  constructor(message = 'A conflict occurred with current state') {
    super('CONFLICT', message, 409);
  }
}

export class RateLimitError extends ApiError {
  constructor(message = 'Too many requests. Please try again in a few moments.') {
    super('RATE_LIMITED', message, 429);
  }
}

export interface ApiSuccessResponse<T> {
  ok: true;
  data: T;
}

export interface ApiErrorResponse {
  ok: false;
  error: {
    code: ErrorCode;
    message: string;
    fields?: Record<string, string>;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface SessionUser {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: 'BUYER' | 'FARMER' | 'COURIER' | 'ADMIN';
  farmerId?: number | null;
  businessId?: number | null;
  courierId?: number | null;
  verificationStatus?: 'PENDING' | 'VERIFIED' | 'REJECTED';
}

export interface ApiHandlerOptions<TBody = unknown> {
  roles?: Array<'BUYER' | 'FARMER' | 'COURIER' | 'ADMIN'>;
  schema?: ZodSchema<TBody>;
  requireVerified?: boolean;
  handler: (
    req: NextRequest,
    context: {
      user?: SessionUser;
      body?: TBody;
      params?: Record<string, string | string[]>;
    }
  ) => Promise<unknown>;
}

/**
 * Creates uniform success response.
 */
export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json<ApiSuccessResponse<T>>({ ok: true, data }, { status });
}

/**
 * Creates uniform error response.
 */
export function jsonError(
  code: ErrorCode,
  message: string,
  status: number,
  fields?: Record<string, string>
) {
  return NextResponse.json<ApiErrorResponse>(
    {
      ok: false,
      error: {
        code,
        message,
        ...(fields && Object.keys(fields).length > 0 ? { fields } : {}),
      },
    },
    { status }
  );
}

/**
 * Higher-order wrapper for Next.js Route Handlers.
 * Enforces:
 * 1. Role authentication / authorization
 * 2. Zod request body validation
 * 3. Uniform error formatting with plain English messages and no stack traces leaked
 */
export function apiHandler<TBody = unknown>(options: ApiHandlerOptions<TBody>) {
  return async (
    req: NextRequest,
    routeProps?: { params?: Promise<Record<string, string | string[]>> | Record<string, string | string[]> }
  ) => {
    try {
      // Resolve dynamic route params if Next.js 15/16 provides a Promise
      let resolvedParams: Record<string, string | string[]> = {};
      if (routeProps?.params) {
        resolvedParams =
          'then' in routeProps.params
            ? await routeProps.params
            : routeProps.params;
      }

      let user: SessionUser | undefined;

      // Check role authorization if specified
      if (options.roles && options.roles.length > 0) {
        // Dynamic import session helper to prevent circular dependency
        const { getSessionUser } = await import('@/server/auth/session');
        const sessionUser = await getSessionUser(req);

        if (!sessionUser) {
          throw new UnauthenticatedError();
        }

        if (!options.roles.includes(sessionUser.role)) {
          throw new ForbiddenError(
            `Access restricted. Required role: ${options.roles.join(', ')}`
          );
        }

        if (options.requireVerified && sessionUser.role !== 'ADMIN') {
          if (sessionUser.verificationStatus !== 'VERIFIED') {
            throw new ForbiddenError('Your account is pending verification. Transactions are disabled until verified.');
          }
        }

        user = sessionUser;
      }

      // Validate body if schema provided
      let parsedBody: TBody | undefined;
      if (options.schema) {
        let rawBody: unknown;
        try {
          rawBody = await req.json();
        } catch {
          throw new ValidationError('Invalid JSON body');
        }

        const parseResult = options.schema.safeParse(rawBody);
        if (!parseResult.success) {
          const fields: Record<string, string> = {};
          for (const issue of parseResult.error.issues) {
            const fieldName = issue.path.join('.') || 'root';
            fields[fieldName] = issue.message;
          }
          throw new ValidationError('Please check the submitted fields', fields);
        }
        parsedBody = parseResult.data;
      }

      const result = await options.handler(req, {
        user,
        body: parsedBody,
        params: resolvedParams,
      });

      if (result instanceof NextResponse) {
        return result;
      }

      return jsonOk(result);
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        return jsonError(err.code, err.message, err.status, err.fields);
      }

      if (err instanceof ZodError) {
        const fields: Record<string, string> = {};
        for (const issue of err.issues) {
          fields[issue.path.join('.') || 'root'] = issue.message;
        }
        return jsonError('VALIDATION_ERROR', 'Validation failed', 422, fields);
      }

      // Never leak unexpected exceptions or stack traces to clients
      console.error('[API Handler Uncaught Error]', err);
      return jsonError('INTERNAL', 'An unexpected server error occurred. Please try again.', 500);
    }
  };
}
