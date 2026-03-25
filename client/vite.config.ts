import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@shared": path.resolve(__dirname, "./src/shared"),
			"@entities": path.resolve(__dirname, "./src/entities"),
			"@features": path.resolve(__dirname, "./src/features"),
			"@widgets": path.resolve(__dirname, "./src/widgets"),
			"@pages": path.resolve(__dirname, "./src/pages"),
		},
	},
	plugins: [
		react(),
		babel({ presets: [reactCompilerPreset()] }),
		tailwindcss(),
	],
});
