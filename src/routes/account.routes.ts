import { Router } from "express";
import { InMemoryAccountRepository } from "../repositories/accountRepository";
import { AccountService } from "../services/accountService";
import { AccountController } from "../controllers/account.controller";

const router = Router();
const repository = new InMemoryAccountRepository();
const service = new AccountService(repository);
const controller = new AccountController(service);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
