import { Router } from "express";
import { InMemoryCustomerRepository } from "../repositories/customerRepository";
import { CustomerService } from "../services/customerService";
import { CustomerController } from "../controllers/customer.controller";

const router = Router();
const repository = new InMemoryCustomerRepository();
const service = new CustomerService(repository);
const controller = new CustomerController(service);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
