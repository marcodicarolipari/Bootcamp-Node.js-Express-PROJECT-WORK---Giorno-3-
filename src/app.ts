// Configurazione Express app — separata da index.ts per i test (Giorno 7)
import express from "express";
import cors from "cors";
import helmet from "helmet";
import accountRoutes from "./routes/account.routes";
import customerRoutes from "./routes/customer.routes";
import { errorHandler } from "./errors/errorHandler";

const app = express();

// ─── Middleware (ordine critico!) ───
app.use(helmet());                                     // 1. Security headers
app.use(cors({ origin: "http://localhost:5173" }));    // 2. CORS per React/Vite
app.use(express.json());                               // 3. Parse body JSON

// ─── JSON formatting ───
app.set("json spaces", 2);                             // Indenta JSON con 2 spazi

// ─── Routes ───
app.use("/api/accounts", accountRoutes);
app.use("/api/customers", customerRoutes);

// ─── Health check ───
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── Error handler (deve essere ultimo!) ───
app.use(errorHandler);

export { app };