import { NotFoundLinkError } from "@/application/errors/not-found-link-error";
import {
	deleteLinkInputSchema,
	deleteLinkService,
} from "@/application/services/delete-link.service";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.delete(
		"/links/:id",
		{
			schema: {
				summary: "Delete a short link",
				tags: ["Links"],
				params: deleteLinkInputSchema,
				response: {
					200: z
						.object({ message: z.string() })
						.describe("Link deleted successfully"),
					404: z.object({ message: z.string() }),
					500: z.object({ message: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const result = await deleteLinkService({ id: request.params.id });

			if (result.isLeft()) {
				const error = result.value;
				const statusCode = error instanceof NotFoundLinkError ? 404 : 500;

				return reply.status(statusCode).send({
					message: error.message,
				});
			}

			if (result.isRight()) {
				return reply.status(200).send({
					message: "Link deleted successfully",
				});
			}
		},
	);
};
