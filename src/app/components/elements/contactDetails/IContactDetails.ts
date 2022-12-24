import INavigationProps from "../Inavigation"

export interface IContactState{
    name: string;
    email: string;
    mobileNumber:string;
    landLine: string|undefined;
    website: string;
    address:string;

    contactId: string;
}

export interface IContactProps extends INavigationProps{
    contactId: string;
}
