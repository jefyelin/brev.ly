import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/infrastructure/http/server.ts"],
	clean: true,
	format: "esm",
	outDir: "dist",
});
