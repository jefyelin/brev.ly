import { NotFoundLinkError } from "@/application/errors/not-found-link-error";
import { ShortCodeExistsError } from "@/application/errors/short-code-exists-error";
import {
	createLinkInputSchema,
	createLinkOutputSchema,
	createLinkService,
} from "@/application/services/create-link.service";
import { deleteLink } from "@/application/services/delete-link.service";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.delete(
		"/links",
		{
			schema: {
				summary: "Delete a short link",
				tags: ["Links"],
				querystring: z.object({
					id: z.string().describe("The ID of the link to delete"),
				}),
				response: {
					200: z.string().describe("Link deleted successfully"),
					400: z.object({ message: z.string() }),
					500: z.object({ message: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const result = await deleteLink({ id: request.query.id });

			if (result.isLeft()) {
				const error = result.value;
				const statusCode = error instanceof NotFoundLinkError ? 404 : 500;

				return reply.status(statusCode).send({
					message: error.message,
				});
			}

			if (result.isRight()) {
				return reply.status(200).send("Link deleted successfully");
			}
		},
	);
};
