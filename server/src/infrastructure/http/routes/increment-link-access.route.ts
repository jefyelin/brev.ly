import { NotFoundLinkError } from "@/application/errors/not-found-link-error";
import {
	incrementLinkAccessInputSchema,
	incrementLinkAccessService,
} from "@/application/services/increment-link-access.service";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const incrementLinkAccessRoute: FastifyPluginAsyncZod = async (
	server,
) => {
	server.patch(
		"/links/:id/hit",
		{
			schema: {
				summary: "Increment link access count",
				tags: ["Links"],
				params: incrementLinkAccessInputSchema,
				response: {
					200: z
						.object({ message: z.string() })
						.describe("Link access count incremented successfully"),
					400: z.object({ message: z.string() }),
					500: z.object({ message: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const result = await incrementLinkAccessService({
				id: request.params.id,
			});

			if (result.isLeft()) {
				const error = result.value;
				const statusCode = error instanceof NotFoundLinkError ? 404 : 500;

				return reply.status(statusCode).send({
					message: error.message,
				});
			}

			if (result.isRight()) {
				return reply.status(200).send({
					message: "Link access count incremented successfully",
				});
			}
		},
	);
};
