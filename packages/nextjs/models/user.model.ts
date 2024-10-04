import { IAddress } from "./address.model";

export interface IUserWithRoles {
  displayName: string;
  email: string;
  firstName?: string;
  isAdmin: boolean;
  isContactPerson?: boolean;
  lastName?: string;
  linkedIn?: string;
  phoneNumber?: string;
  photoUrl: string;
  uid: string;
}

export interface IUserWithRolesFormData {
  address?: IAddress;
  companyName?: string;
  email: string;
  firstName: string;
  lastName: string;
  website: string;
}

export type TPersonReference = Pick<IUserWithRoles, "uid" | "displayName" | "photoUrl">;
