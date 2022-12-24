import INavigationProps from "../Inavigation"

export interface IContactFormState{
    name: string;
    email: string;
    mobileNumber: string;
    landLine: string;
    website: string;
    address: string;
    errorState: {
        name: Boolean,
        email: Boolean,
        mobileNumber: Boolean,
        website: Boolean,
    }
}


export interface IContactFormProps extends INavigationProps{
    isEdit: Boolean;
    contactId?: string;
}
