import { NextFunction, Request, Response } from "express";
import { CustomerService } from "../services/customerService";

export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const customers = await this.service.getAllCustomers();
      res.status(200).json({ data: customers });
    } catch (error) {
      next(error);
    }
  };

  getById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const customer = await this.service.getCustomerById(req.params.id);
      res.status(200).json({ data: customer });
    } catch (error) {
      next(error);
    }
  };

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const customer = await this.service.createCustomer(req.body);
      res.status(201).json({ data: customer });
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const customer = await this.service.updateCustomer(req.params.id, req.body);
      res.status(200).json({ data: customer });
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.service.deleteCustomer(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
