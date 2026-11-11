import { Customer, CreateCustomerDto, UpdateCustomerDto } from "../types/customer";
import { ICustomerRepository } from "../services/customerService";

export class InMemoryCustomerRepository implements ICustomerRepository {
  private customers: Customer[] = [
    {
      id: "550e8400-e29b-41d4-a716-446655440101",
      fiscalCode: "RSSMRC90A01H501Z",
      firstName: "Marco",
      lastName: "Rossi",
      email: "marco.rossi@example.com",
      phone: "+393331234567",
      customerStatus: "ACTIVE",
      createdAt: "2025-01-15T10:30:00.000Z",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440102",
      fiscalCode: "BNCLRA85C41F205X",
      firstName: "Laura",
      lastName: "Bianchi",
      email: "laura.bianchi@example.com",
      phone: "+393491112233",
      customerStatus: "ACTIVE",
      createdAt: "2024-06-20T08:15:00.000Z",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440103",
      fiscalCode: "VRDGPP78D15H501A",
      firstName: "Giuseppe",
      lastName: "Verdi",
      email: "giuseppe.verdi@example.com",
      phone: "+393201234567",
      customerStatus: "SUSPENDED",
      createdAt: "2023-11-10T12:00:00.000Z",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440104",
      fiscalCode: "FRRNNA92E45F839B",
      firstName: "Anna",
      lastName: "Ferrari",
      email: "anna.ferrari@example.com",
      phone: "+393471234567",
      customerStatus: "INACTIVE",
      createdAt: "2025-09-01T14:45:00.000Z",
    },
  ];

  async findAll(): Promise<Customer[]> {
    return this.customers;
  }

  async findById(id: string): Promise<Customer | null> {
    return this.customers.find((a) => a.id === id) ?? null;
  }

  async findByFiscalCode(fiscalCode: string): Promise<Customer | null> {
    return this.customers.find((a) => a.fiscalCode === fiscalCode) ?? null;
  }

  async create(dto: CreateCustomerDto): Promise<Customer> {
    const customer: Customer = {
      id: crypto.randomUUID(),
      ...dto,
      createdAt: new Date()
    };
    this.customers.push(customer);
    return customer;
  }

  async update(id: string, dto: UpdateCustomerDto): Promise<Customer | null> {
    const index = this.customers.findIndex((c) => c.id === id);
    if (index === -1) return null;

    this.customers[index] = {
      ...this.customers[index],
      ...dto,
    };
    return this.customers[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.customers.findIndex((c) => c.id === id);
    if (index === -1) return false;

    this.customers.splice(index, 1);
    return true;
  }
}
