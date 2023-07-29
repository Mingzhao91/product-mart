export interface User {
  email: string;
  fullname: string;
  password: string;
  roles?: { type: string }[];
}
