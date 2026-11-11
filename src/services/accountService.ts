import { Account, CreateAccountDto, UpdateAccountDto } from "../types/account";

export interface IAccountRepository {
  findAll(): Promise<Account[]>;
  findById(id: string): Promise<Account | null>;
  findByIban(iban: string): Promise<Account | null>;
  create(dto: CreateAccountDto): Promise<Account>;
  update(id: string, dto: UpdateAccountDto): Promise<Account | null>;
  delete(id: string): Promise<boolean>;
}

export class AccountService {
  constructor(private readonly repository: IAccountRepository) {}

  async getAllAccounts(): Promise<Account[]> {
    return this.repository.findAll();
  }

  async getAccountById(id: string): Promise<Account> {
    const account = await this.repository.findById(id);
    if (!account) throw new Error("Account " + id + " non trovato");
    return account;
  }

  async createAccount(dto: CreateAccountDto): Promise<Account> {
    if (dto.balance < 0) throw new Error("Saldo iniziale non può essere negativo");
    const existing = await this.repository.findByIban(dto.iban);
    if (existing) throw new Error("IBAN già registrato");
    return this.repository.create(dto);
  }

  async updateAccount(id: string, dto: UpdateAccountDto): Promise<Account> {
    if (dto.balance < 0) throw new Error("Saldo non può essere negativo");
    const account = await this.repository.update(id, dto);
    if (!account) throw new Error("Account " + id + " non trovato");
    return account;
  }

  async deleteAccount(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw new Error("Account " + id + " non trovato");
  }
}