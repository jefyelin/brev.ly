import { type Either, left, right } from "@/core/either";
import { db } from "@/infrastructure/db";
import { links } from "@/infrastructure/db/schemas/links";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { InternalServerErrorError } from "../errors/internal-server-error";
import { NotFoundLinkError } from "../errors/not-found-link-error";

export const deleteLinkInputSchema = z.object({
	id: z.string(),
});

type DeleteLinkInput = z.infer<typeof deleteLinkInputSchema>;

export const deleteLink = async (
	input: DeleteLinkInput,
): Promise<Either<Error, undefined>> => {
	try {
		const deletedLink = await db
			.delete(links)
			.where(eq(links.id, input.id))
			.returning();

		if (deletedLink.length === 0) {
			return left(new NotFoundLinkError());
		}

		return right(undefined);
	} catch {
		return left(new InternalServerErrorError());
	}
};
