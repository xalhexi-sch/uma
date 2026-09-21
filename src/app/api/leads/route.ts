import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { leadSchema } from '@/lib/validation/lead';
import { jsonOk, jsonError } from '@/server/api/handler';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const parseResult = leadSchema.safeParse(rawBody);

    if (!parseResult.success) {
      const fields: Record<string, string> = {};
      for (const issue of parseResult.error.issues) {
        fields[issue.path.join('.') || 'root'] = issue.message;
      }
      return jsonError('VALIDATION_ERROR', 'Please fill out all required fields correctly.', 422, fields);
    }

    const { name, phone, email, type, barangay, message, honeypot } = parseResult.data;

    // Honeypot check: If bot filled the hidden honeypot, quietly return ok
    if (honeypot && honeypot.length > 0) {
      return jsonOk({ received: true });
    }

    // Persist lead
    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        email: email || null,
        type,
        barangay: barangay || null,
        message: message || null,
      },
    });

    // Record audit log entry
    await prisma.auditLog.create({
      data: {
        action: 'SUBMIT_LEAD',
        entity: 'Lead',
        entityId: lead.id,
        meta: {
          name,
          type,
          barangay,
        },
      },
    });

    return jsonOk({
      id: lead.id,
      message: 'Thank you! We have received your details and our Butuan operations team will contact you within 2 working days.',
    });
  } catch (error) {
    console.error('[Leads API Error]:', error);
    return jsonError('INTERNAL', 'Failed to submit your details. Please try again or reach out via WhatsApp/Phone.', 500);
  }
}
