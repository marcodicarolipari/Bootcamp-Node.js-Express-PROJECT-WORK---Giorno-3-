import { NextFunction, Request, Response } from "express";
import { AccountService } from "../services/accountService";

export class AccountController {
  constructor(private readonly service: AccountService) {}

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accounts = await this.service.getAllAccounts();
      res.status(200).json({ data: accounts });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const account = await this.service.getAccountById(req.params.id);
      res.status(200).json({ data: account });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const account = await this.service.createAccount(req.body);
      res.status(201).json({ data: account });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const account = await this.service.updateAccount(req.params.id, req.body);
      res.status(200).json({ data: account });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.service.deleteAccount(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
