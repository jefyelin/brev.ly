import { type Either, left, right } from "@/core/either";
import { db } from "@/infrastructure/db";
import { links } from "@/infrastructure/db/schemas/links";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { InternalServerErrorError } from "../errors/internal-server-error";
import { NotFoundLinkError } from "../errors/not-found-link-error";

export const incrementLinkAccessInputSchema = z.object({
	id: z.string().uuid().describe("ID of the link to increment access count"),
});

export type IncrementLinkAccessInput = z.infer<
	typeof incrementLinkAccessInputSchema
>;

export const incrementLinkAccessService = async (
	input: IncrementLinkAccessInput,
): Promise<Either<Error, undefined>> => {
	try {
		const existingLink = await db.query.links.findFirst({
			where: eq(links.id, input.id),
		});

		if (!existingLink) {
			return left(new NotFoundLinkError());
		}

		await db
			.update(links)
			.set({
				accessCount: existingLink.accessCount + 1,
			})
			.where(eq(links.id, input.id));

		return right(undefined);
	} catch {
		return left(new InternalServerErrorError());
	}
};
