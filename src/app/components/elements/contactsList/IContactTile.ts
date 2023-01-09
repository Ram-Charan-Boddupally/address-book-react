export interface IContactTileProps{
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