import {IAddress} from "./address.model";
import {IAccessibilitySettings} from "./accessibility.model";
import {INotificationSettings} from "./notification-settings";

export interface IUserWithRoles {
    accessibilitySettings: IAccessibilitySettings;
    apiKey?: string;
    displayName: string;
    email: string;
    emailVerificationCode?: string;
    firstName?: string;
    isAdmin: boolean;
    isContactPerson?: boolean;
    isEmailVerified: boolean;
    isPhoneNumberVerified: boolean;
    lastName?: string;
    linkedIn?: string;
    notificationSettings: INotificationSettings;
    phoneNumber?: string;
    photoUrl: string;
    stripeClientId?: string;
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

export type TPersonReference = Pick<IUserWithRoles, 'uid' | 'displayName' | 'photoUrl'>;
