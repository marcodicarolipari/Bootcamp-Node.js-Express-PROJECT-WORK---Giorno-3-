// Identico al Giorno 2
import {
  Account,
  CreateAccountDto,
  UpdateAccountDto,
  AccountStatus,
} from "../types/account";
import { IAccountRepository } from "../services/accountService";

export class InMemoryAccountRepository implements IAccountRepository {
  private accounts: Account[] = [
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      iban: "IT60X0542811101000000789012",
      holderName: "Marco Rossi",
      balance: 5250.75,
      accountType: "CHECKING",
      status: "ACTIVE",
      createdAt: "2025-01-15T10:30:00.000Z",
      customerId: "550e8400-e29b-41d4-a716-446655440101",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440002",
      iban: "IT40X0300203280123456789012",
      holderName: "Laura Bianchi",
      balance: 15000,
      accountType: "SAVINGS",
      status: "ACTIVE",
      createdAt: "2024-06-20T08:15:00.000Z",
      customerId: "550e8400-e29b-41d4-a716-446655440102",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440003",
      iban: "IT12X0760114800000123456789",
      holderName: "Giuseppe Verdi",
      balance: 0,
      accountType: "CHECKING",
      status: "BLOCKED",
      createdAt: "2023-11-10T12:00:00.000Z",
      customerId: "550e8400-e29b-41d4-a716-446655440103",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440004",
      iban: "IT80X0100503200000001234567",
      holderName: "Anna Ferrari",
      balance: -250.5,
      accountType: "CHECKING",
      status: "SUSPENDED",
      createdAt: "2025-09-01T14:45:00.000Z",
      customerId: "550e8400-e29b-41d4-a716-446655440104",
    },
  ];

  async findAll(): Promise<Account[]> {
    return this.accounts;
  }

  async findById(id: string): Promise<Account | null> {
    return this.accounts.find((a) => a.id === id) ?? null;
  }

  async findByIban(iban: string): Promise<Account | null> {
    return this.accounts.find((a) => a.iban === iban) ?? null;
  }

  async create(dto: CreateAccountDto): Promise<Account> {
    const account: Account = {
      id: crypto.randomUUID(),
      ...dto,
      status: AccountStatus.ACTIVE,
      createdAt: new Date(),
    };
    this.accounts.push(account);
    return account;
  }

  async update(id: string, dto: UpdateAccountDto): Promise<Account | null> {
    const account = await this.findById(id);
    if (!account) return null;
    account.balance = dto.balance;
    return account;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.accounts.findIndex((account) => account.id === id);
    if (index === -1) return false;
    this.accounts.splice(index, 1);
    return true;
  }
}
