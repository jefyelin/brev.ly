import { ShortCodeExistsError } from "@/application/errors/short-code-exists-error";
import {
	createLinkInputSchema,
	createLinkOutputSchema,
	createLinkService,
} from "@/application/services/create-link.service";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/links",
		{
			schema: {
				summary: "Create a new short link",
				tags: ["Links"],
				body: createLinkInputSchema,
				response: {
					201: createLinkOutputSchema,
					400: z.object({ message: z.string() }),
					500: z.object({ message: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const result = await createLinkService(request.body);

			if (result.isLeft()) {
				const error = result.value;
				const statusCode = error instanceof ShortCodeExistsError ? 400 : 500;

				return reply.status(statusCode).send({
					message: error.message,
				});
			}

			if (result.isRight()) {
				return reply.status(201).send(result.value);
			}
		},
	);
};
