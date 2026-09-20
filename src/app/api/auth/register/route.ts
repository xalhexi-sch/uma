import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/lib/validation/auth';
import { createSessionToken, setSessionCookie } from '@/server/auth/session';
import { jsonOk, jsonError } from '@/server/api/handler';
import { Role, VerificationStatus } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const parseResult = registerSchema.safeParse(rawBody);

    if (!parseResult.success) {
      const fields: Record<string, string> = {};
      for (const issue of parseResult.error.issues) {
        fields[issue.path.join('.') || 'root'] = issue.message;
      }
      return jsonError('VALIDATION_ERROR', 'Please check all required registration fields', 422, fields);
    }

    const {
      role,
      email,
      password,
      name,
      phone,
      entityName,
      barangay,
      addressText,
      idOrPermitType,
      idOrPermitLast4,
    } = parseResult.data;

    // Check if email already registered
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return jsonError(
        'CONFLICT',
        'An account with this email address already exists. Please log in instead.',
        409
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const result = await prisma.$transaction(async (tx) => {
      let farmerId: number | null = null;
      let businessId: number | null = null;

      if (role === 'BUYER') {
        const business = await tx.business.create({
          data: {
            name: entityName,
            email: email.toLowerCase(),
            phone,
            addressText,
            barangay,
            permitType: idOrPermitType,
            permitLast4: idOrPermitLast4,
            verificationStatus: VerificationStatus.PENDING,
          },
        });
        businessId = business.id;
      } else {
        const farmer = await tx.farmer.create({
          data: {
            name: entityName || name,
            email: email.toLowerCase(),
            phone,
            addressText,
            barangay,
            idType: idOrPermitType,
            idLast4: idOrPermitLast4,
            verificationStatus: VerificationStatus.PENDING,
          },
        });
        farmerId = farmer.id;
      }

      const user = await tx.user.create({
        data: {
          email: email.toLowerCase(),
          passwordHash,
          name,
          phone,
          role: role as Role,
          verificationStatus: VerificationStatus.PENDING,
          farmerId,
          businessId,
        },
      });

      // Welcome Notification
      await tx.notification.create({
        data: {
          userId: user.id,
          type: 'WELCOME',
          title: 'Welcome to UMA Pilot',
          body: 'Your registration is submitted. Our team will verify your details within 1–2 working days.',
          href: '/dashboard',
        },
      });

      // Audit Log
      await tx.auditLog.create({
        data: {
          actorUserId: user.id,
          action: 'REGISTER',
          entity: 'User',
          entityId: user.id,
          meta: { role, entityName, barangay },
        },
      });

      return { user, farmerId, businessId };
    });

    const sessionUser = {
      id: result.user.id,
      email: result.user.email,
      name: result.user.name,
      phone: result.user.phone,
      role: result.user.role,
      farmerId: result.farmerId,
      businessId: result.businessId,
      verificationStatus: result.user.verificationStatus,
    };

    const token = await createSessionToken(sessionUser);
    const res = jsonOk({ user: sessionUser }, 201);
    setSessionCookie(res, token);

    return res;
  } catch (err: unknown) {
    console.error('[Register Error]', err);
    return jsonError('INTERNAL', 'Failed to register account. Please try again.', 500);
  }
}
