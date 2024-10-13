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

type TableAlign = 'left' | 'center' | 'right';

type TableConfig = {
  headers: {
    data: string[];
    fontSize?: number;
    fontFamily?: string;
    align?: TableAlign;
  };
  rows: {
    data: string[];
    fontSize?: number;
    fontFamily?: string;
    align?: TableAlign;
  };
  lineWidth?: number;
  widths: number[];
};

type PDFConfig = {
  title: {
    text: string;
    fontFamily?: string;
    fontSize?: number;
    align?: TableAlign;
  };
  table: TableConfig;
};
