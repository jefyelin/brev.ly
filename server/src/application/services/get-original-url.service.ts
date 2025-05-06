import { type Either, left, right } from "@/core/either";
import { db } from "@/infrastructure/db";
import { links } from "@/infrastructure/db/schemas/links";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { InternalServerErrorError } from "../errors/internal-server-error";
import { NotFoundLinkError } from "../errors/not-found-link-error";

export const getOriginalUrlInputSchema = z.object({
	shortCode: z
		.string()
		.min(3)
		.max(20)
		.regex(/^[a-zA-Z0-9_-]+$/),
});

export const getOriginalUrlOutputSchema = z.object({
	id: z.string(),
	originalUrl: z.string().url(),
});

type GetOriginalUrlInput = z.infer<typeof getOriginalUrlInputSchema>;

type GetOriginalUrlOutput = z.infer<typeof getOriginalUrlOutputSchema>;

export const getOriginalUrlService = async (
	input: GetOriginalUrlInput,
): Promise<Either<Error, GetOriginalUrlOutput>> => {
	try {
		const link = await db.query.links.findFirst({
			columns: { id: true, originalUrl: true },
			where: eq(links.shortCode, input.shortCode),
		});

		if (!link) {
			return left(new NotFoundLinkError());
		}

		return right({
			id: link.id,
			originalUrl: link.originalUrl,
		});
	} catch {
		return left(new InternalServerErrorError());
	}
};
