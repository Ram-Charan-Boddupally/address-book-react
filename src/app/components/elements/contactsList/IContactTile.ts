import INavigationProps from "../Inavigation"

export interface IContactTileProps extends INavigationProps{
    contactId: string;
    
    isClicked: Boolean;
    onClick(): void;
}

export interface IContactTileState{
    contactId: string;
    contactName: string;
    contactEmail: string;
    contactNumber: string;
    isClicked: Boolean;
}

export interface IContactsBlockState{
    selectedTile: string;
}