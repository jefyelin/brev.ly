import {
	exportLinksCSVOutputSchema,
	exportLinksCSVService,
} from "@/application/services/export-links-csv.service";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const exportLinksCSVRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/links/export",
		{
			schema: {
				summary: "Export all links to CSV",
				tags: ["Links"],
				response: {
					200: exportLinksCSVOutputSchema,
					500: z.object({ message: z.string() }),
				},
			},
		},
		async (_, reply) => {
			const result = await exportLinksCSVService();

			if (result.isLeft()) {
				const error = result.value;

				return reply.status(500).send({
					message: error.message,
				});
			}

			if (result.isRight()) {
				return reply.status(200).send(result.value);
			}
		},
	);
};
