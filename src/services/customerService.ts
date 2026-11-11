import { Customer, CreateCustomerDto, UpdateCustomerDto } from "../types/customer";
import { NotFoundError } from "../errors/NotFoundError";
import { ConflictError } from "../errors/ConflictError";
import { BadRequestError } from "../errors/BadRequestError";

export interface ICustomerRepository {
  findAll(): Promise<Customer[]>;
  findById(id: string): Promise<Customer | null>;
  findByFiscalCode(fiscalCode: string): Promise<Customer | null>;
  create(dto: CreateCustomerDto): Promise<Customer>;
  update(id: string, dto: UpdateCustomerDto): Promise<Customer | null>;
  delete(id: string): Promise<boolean>;
}

export class CustomerService {
  constructor(private readonly repository: ICustomerRepository) {}

  async getAllCustomers(): Promise<Customer[]> {
    return this.repository.findAll();
  }

  async getCustomerById(id: string): Promise<Customer> {
    const customer = await this.repository.findById(id);
    if (!customer) throw new NotFoundError(`Customer ${id} non trovato`);
    return customer;
  }

  async createCustomer(dto: CreateCustomerDto): Promise<Customer> {
    // Validazione parametri DTO
    if (!dto.fiscalCode || typeof dto.fiscalCode !== "string" || dto.fiscalCode.trim() === "") {
      throw new BadRequestError("fiscalCode è obbligatorio e deve essere una stringa valida");
    }
    if (!dto.firstName || typeof dto.firstName !== "string" || dto.firstName.trim() === "") {
      throw new BadRequestError("firstName è obbligatorio e deve essere una stringa valida");
    }
    if (!dto.lastName || typeof dto.lastName !== "string" || dto.lastName.trim() === "") {
      throw new BadRequestError("lastName è obbligatorio e deve essere una stringa valida");
    }

    // Verifica fiscalCode duplicato
    const existing = await this.repository.findByFiscalCode(dto.fiscalCode);
    if (existing) throw new ConflictError("Fiscal Code già registrato");
    
    return this.repository.create(dto);
  }

  async updateCustomer(id: string, dto: UpdateCustomerDto): Promise<Customer> {
    // Verifica che il customer esista
    const customer = await this.repository.findById(id);
    if (!customer) throw new NotFoundError(`Customer ${id} non trovato`);

    // Validazione solo i campi presenti nel DTO
    if (dto.fiscalCode !== undefined) {
      if (typeof dto.fiscalCode !== "string" || dto.fiscalCode.trim() === "") {
        throw new BadRequestError("fiscalCode deve essere una stringa valida");
      }
      // Se il fiscalCode è diverso da quello attuale, verifica che non sia duplicato
      if (dto.fiscalCode !== customer.fiscalCode) {
        const existing = await this.repository.findByFiscalCode(dto.fiscalCode);
        if (existing) throw new ConflictError("Fiscal Code già registrato");
      }
    }

    if (dto.firstName !== undefined) {
      if (typeof dto.firstName !== "string" || dto.firstName.trim() === "") {
        throw new BadRequestError("firstName deve essere una stringa valida");
      }
    }

    if (dto.lastName !== undefined) {
      if (typeof dto.lastName !== "string" || dto.lastName.trim() === "") {
        throw new BadRequestError("lastName deve essere una stringa valida");
      }
    }

    if (dto.email !== undefined) {
      if (typeof dto.email !== "string" || dto.email.trim() === "") {
        throw new BadRequestError("email deve essere una stringa valida");
      }
    }

    if (dto.phone !== undefined) {
      if (typeof dto.phone !== "string" || dto.phone.trim() === "") {
        throw new BadRequestError("phone deve essere una stringa valida");
      }
    }

    const updated = await this.repository.update(id, dto);
    if (!updated) throw new NotFoundError(`Customer ${id} non trovato`);
    
    return updated;
  }

  async deleteCustomer(id: string): Promise<void> {
    const customer = await this.repository.findById(id);
    if (!customer) throw new NotFoundError(`Customer ${id} non trovato`);
    
    const deleted = await this.repository.delete(id);
    if (!deleted) throw new NotFoundError(`Customer ${id} non trovato`);
  }
}
