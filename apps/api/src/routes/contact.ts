import { Router, type IRouter, type NextFunction, type Request, type Response } from "express";
import { PostContactBody } from "@workspace/api-zod";
import pino from "pino";
import { connect } from "../agents-core/db.js";

const logger = pino({ name: "contact-route" });
const router: IRouter = Router();

type ContactSubmissionDocument = {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new";
  createdAt: Date;
  updatedAt: Date;
};

type ZodLikeError = {
  name?: string;
  issues?: Array<{
    path?: Array<string | number>;
    message?: string;
  }>;
};

function isZodError(error: unknown): error is ZodLikeError {
  return Boolean(
    error &&
      typeof error === "object" &&
      (error as { name?: unknown }).name === "ZodError",
  );
}

function trimField(value: unknown): unknown {
  return typeof value === "string" ? value.trim() : value;
}

function normalizeContactBody(body: unknown) {
  const record = body && typeof body === "object" ? body as Record<string, unknown> : {};

  return {
    name: trimField(record["name"]),
    email: trimField(record["email"]),
    subject: trimField(record["subject"]),
    message: trimField(record["message"]),
  };
}

function getValidationDetails(error: ZodLikeError) {
  return (error.issues ?? []).map((issue) => ({
    field: issue.path?.join(".") || "body",
    message: issue.message || "Invalid value",
  }));
}

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = PostContactBody.parse(normalizeContactBody(req.body));
    const now = new Date();

    const submission: ContactSubmissionDocument = {
      name: body.name,
      email: body.email.toLowerCase(),
      subject: body.subject,
      message: body.message,
      status: "new",
      createdAt: now,
      updatedAt: now,
    };

    let db;
    try {
      db = await connect();
    } catch (error) {
      logger.error({ error }, "Database unavailable for contact submission");
      return res.status(503).json({
        error: "database_unavailable",
        message: "Contact submissions are temporarily unavailable. Please try again later.",
      });
    }

    const result = await db
      .collection<ContactSubmissionDocument>("contact_submissions")
      .insertOne(submission);

    return res.status(201).json({
      success: true,
      id: result.insertedId.toString(),
      message: "Contact submission received.",
    });
  } catch (error) {
    if (isZodError(error)) {
      const details = getValidationDetails(error);
      logger.warn({ details }, "Validation failed for contact submission");
      return res.status(400).json({
        error: "validation_error",
        message: "Please check the contact form fields and try again.",
        details,
      });
    }

    logger.error({ error }, "Internal server error during contact submission");
    return next(error);
  }
});

export default router;
