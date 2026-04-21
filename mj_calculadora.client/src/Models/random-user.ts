export interface Name {
  first: string;
  last: string;
}

export interface Street {
  number: number;
  name: string;
}

export interface Location {
  street: Street;
  city: string;
  country: string;
}

export interface RandomUser {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  phone: string;
}
