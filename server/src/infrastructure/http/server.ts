import { env } from "@/infrastructure/config/env";
import { fastifyCors } from "@fastify/cors";
import { fastifyMultipart } from "@fastify/multipart";
import { fastifySwagger } from "@fastify/swagger";
import scalarReference from "@scalar/fastify-api-reference";
import chalk from "chalk";
import { fastify } from "fastify";
import {
	hasZodFastifySchemaValidationErrors,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { version } from "../../../package.json";
import { createLinkRoute } from "./routes/create-link.route";
import { deleteLinkRoute } from "./routes/delete-link.route";
import { exportLinksCSVRoute } from "./routes/export-link-csv.route";
import { getOriginalUrlRoute } from "./routes/get-original-url.route";
import { incrementLinkAccessRoute } from "./routes/increment-link-access.route";
import { listAllLinksRoute } from "./routes/list-all-links.route";
import { transformSwaggerSchema } from "./transform-swagger-schema";

const envToLogger = {
	development: {
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "pid,hostname",
			},
		},
	},
	production: true,
	test: false,
};

const server = fastify({
	logger: envToLogger[env.NODE_ENV] ?? true,
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, _, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: `Validation error: ${JSON.stringify(`${error.message}`)}`,
		});
	}

	server.log.error(error);

	return reply.status(500).send({ message: "Internal server error." });
});

server.register(fastifyCors, { origin: "*" });

server.register(fastifyMultipart);
server.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Brev.ly API",
			version: version,
		},
	},
	transform: transformSwaggerSchema,
});

server.register(scalarReference, {
	routePrefix: "/docs",
});

server.register(createLinkRoute);
server.register(deleteLinkRoute);
server.register(getOriginalUrlRoute);
server.register(listAllLinksRoute);
server.register(incrementLinkAccessRoute);
server.register(exportLinksCSVRoute);

server.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
	server.log.info(chalk.green("Server started!\n"));

	server.log.info(chalk.blue(`Server: http://localhost:${env.PORT}`));
	server.log.info(chalk.magenta(`Docs: http://localhost:${env.PORT}/docs\n`));
});
