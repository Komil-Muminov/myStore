import { createApp } from "./app";
import { initializeDatabase } from "./config/database";
import { env } from "./config/env";

async function bootstrap(): Promise<void> {
	await initializeDatabase();

	const app = createApp();

	app.listen(env.port, () => {
		console.log(`Сервер запущен:  http://localhost:${env.port}`);
	});
}

bootstrap().catch((error: unknown) => {
	console.error("Ошибка запуска сервера:", error);
	process.exit(1);
});
