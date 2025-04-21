import { NotFoundLinkError } from "@/application/errors/not-found-link-error";
import {
	getOriginalUrlInputSchema,
	getOriginalUrlOutputSchema,
	getOriginalUrlService,
} from "@/application/services/get-original-url.service";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getOriginalUrlRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/links/:shortCode",
		{
			schema: {
				summary: "Get original URL from short code",
				tags: ["Links"],
				params: getOriginalUrlInputSchema,
				response: {
					200: getOriginalUrlOutputSchema,
					400: z.object({ message: z.string() }),
					500: z.object({ message: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const result = await getOriginalUrlService({
				shortCode: request.params.shortCode,
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
					originalUrl: result.value.originalUrl,
				});
			}
		},
	);
};
