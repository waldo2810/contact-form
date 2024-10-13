type ContactPrimitives = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  line1: string;
  city: string;
  state: string;
  country: string;
  line2?: string;
  deleted: boolean;
};

type ModifyContactFields = {
  firstName?: ContactFirstName;
  lastName?: ContactLastName;
  email?: ContactEmail;
  birthDate?: ContactBirthDate;
  line1?: string;
  city?: string;
  state?: string;
  country?: string;
  line2?: string;
};
