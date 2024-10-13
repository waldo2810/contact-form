export interface ModifyContactDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  birthDate?: string;
  sex?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    country?: string;
  };
}
