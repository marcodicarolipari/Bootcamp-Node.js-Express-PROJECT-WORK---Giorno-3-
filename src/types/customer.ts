export type UUID = string;

export enum CustomerStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface Customer {
  id: UUID;
  fiscalCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  customerStatus: CustomerStatus;
  createdAt: Date;
}

export interface CreateCustomerDto {
  fiscalCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  customerStatus: CustomerStatus;
}

export type UpdateCustomerDto = Partial<CreateCustomerDto>;
