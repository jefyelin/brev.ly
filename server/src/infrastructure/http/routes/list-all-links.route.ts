import {
	listAllLinksOutputSchema,
	listAllLinksService,
} from "@/application/services/list-all-links.service";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const listAllLinksRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/links",
		{
			schema: {
				summary: "List all links",
				tags: ["Links"],
				response: {
					200: listAllLinksOutputSchema,
					400: z.object({ message: z.string() }),
					500: z.object({ message: z.string() }),
				},
			},
		},
		async (_, reply) => {
			const result = await listAllLinksService();

			if (result.isLeft()) {
				const error = result.value;

				return reply.status(500).send({
					message: error.message,
				});
			}

			if (result.isRight()) {
				return reply.status(200).send({
					links: result.value.links,
				});
			}
		},
	);
};
