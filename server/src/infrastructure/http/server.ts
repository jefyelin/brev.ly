import { env } from "@/infrastructure/config/env";
import { fastifyCors } from "@fastify/cors";
import { fastifyMultipart } from "@fastify/multipart";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import chalk from "chalk";
import { fastify } from "fastify";
import {
	hasZodFastifySchemaValidationErrors,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { createLinkRoute } from "./routes/create-link.route";
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
			title: "Upload Server",
			version: "1.0.0",
		},
	},
	transform: transformSwaggerSchema,
});

server.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

server.register(createLinkRoute);

server.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
	server.log.info(chalk.green("Server started!\n"));

	server.log.info(chalk.blue(`Server: http://localhost:${env.PORT}`));
	server.log.info(chalk.magenta(`Docs: http://localhost:${env.PORT}/docs\n`));
});
