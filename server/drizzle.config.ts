import { env } from "@/infrastructure/config/env";
import type { Config } from "drizzle-kit";

export default {
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	dialect: "postgresql",
	schema: "src/infrastructure/db/schemas/*",
	out: "src/infrastructure/db/migrations",
} satisfies Config;
