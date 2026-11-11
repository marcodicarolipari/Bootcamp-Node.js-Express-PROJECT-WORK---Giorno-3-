// Entry point — avvia il server HTTP
import { app } from "./app";

const PORT = parseInt(process.env.PORT ?? "3000", 10);

const server = app.listen(PORT, () => {
  console.log("🏦 LipariBank API su http://localhost:" + PORT);
  console.log("   GET  /api/accounts");
  console.log("   GET  /api/accounts/:id");
  console.log("   POST /api/accounts");
  console.log("   PUT  /api/accounts/:id");
  console.log("   DEL  /api/accounts/:id");
});

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Porta ${PORT} già in uso`);
  } else {
    console.error("❌ Errore server:", error.message);
  }
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("❌ Promise rejection non gestita:", reason);
  process.exit(1);
});