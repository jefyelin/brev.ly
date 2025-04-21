import { type Either, left, right } from "@/core/either";
import { db } from "@/infrastructure/db";
import { z } from "zod";
import { InternalServerErrorError } from "../errors/internal-server-error";

export const listAllLinksOutputSchema = z.object({
	links: z.array(
		z.object({
			id: z.string(),
			originalUrl: z.string().url(),
			shortCode: z.string(),
			accessCount: z.number(),
			createdAt: z.date(),
		}),
	),
});

export type ListAllLinksOutput = z.infer<typeof listAllLinksOutputSchema>;

export const listAllLinksService = async (): Promise<
	Either<Error, ListAllLinksOutput>
> => {
	try {
		const links = await db.query.links.findMany({
			columns: {
				id: true,
				originalUrl: true,
				shortCode: true,
				accessCount: true,
				createdAt: true,
			},
			orderBy: (fields, { desc }) => [desc(fields.createdAt)],
		});

		return right({
			links,
		});
	} catch {
		return left(new InternalServerErrorError());
	}
};
