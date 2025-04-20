import { type Either, left, right } from "@/core/either";
import { db } from "@/infrastructure/db";
import { links } from "@/infrastructure/db/schemas/links";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { InternalServerErrorError } from "../errors/internal-server-error";
import { ShortCodeExistsError } from "../errors/short-code-exists-error";

export const createLinkInputSchema = z.object({
	originalUrl: z.string().url(),
	shortCode: z
		.string()
		.min(3)
		.max(20)
		.regex(/^[a-zA-Z0-9_-]+$/),
});

export const createLinkOutputSchema = z.object({
	id: z.string(),
	originalUrl: z.string().url(),
	shortCode: z.string(),
	accessCount: z.number(),
	createdAt: z.date(),
});

export type CreateLinkInput = z.infer<typeof createLinkInputSchema>;

export type CreateLinkOutput = z.infer<typeof createLinkOutputSchema>;

export const createLinkService = async (
	input: CreateLinkInput,
): Promise<Either<Error, CreateLinkOutput>> => {
	try {
		const existingLink = await db.query.links.findFirst({
			where: eq(links.shortCode, input.shortCode),
		});

		if (existingLink) {
			return left(new ShortCodeExistsError());
		}

		const [createdLink] = await db
			.insert(links)
			.values({
				originalUrl: input.originalUrl,
				shortCode: input.shortCode,
			})
			.returning();

		return right({
			...createdLink,
			id: createdLink.id.toString(),
		});
	} catch {
		return left(new InternalServerErrorError());
	}
};
