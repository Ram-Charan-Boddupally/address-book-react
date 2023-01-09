export interface IContactState{
    name: string;
    email: string;
    mobileNumber:string;
    landLine: string|undefined;
    website: string;
    address:string;

    contactId: string;
}

export interface IContactProps{
    contactId: string;
}
