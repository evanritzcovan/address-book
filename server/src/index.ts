import { createApp } from "./app.js";

const PORT = Number(process.env.PORT ?? 43121);

const app = createApp();

app.listen(PORT, "127.0.0.1", () => {
  process.stdout.write(`Address Book API on http://127.0.0.1:${PORT}\n`);
});
