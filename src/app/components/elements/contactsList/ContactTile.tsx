import React,{ useState } from "react";
import { useNavigate } from "react-router";
import {ContactList} from '../../../../models/contactList';

import { IContactTileProps, IContactTileState } from './IContactTile'

export default function ConctactTile(props: IContactTileProps){
    const navigate = useNavigate()

    let contacts = ContactList.fromJSON(JSON.parse(window.sessionStorage.getItem("contactsList") as string));
    let contact = contacts.getContact(props.contactId)
    
    const [tileDetails, setTileDetails] = useState<IContactTileState>({contactId: props.contactId, contactName: contact.name,
                                              contactEmail: contact.email, contactNumber: contact.contactInformation[0], isClicked: false})
    
    function chickHandler(): void{
        props.onClick()
        navigate('/Details',{state:{contactId: tileDetails.contactId}});
    }

    return (
        <li className={props.isClicked? "contact-tile selected":"contact-tile"} key={tileDetails.contactId} onClick={chickHandler}>
            <p className="contact-tile-name"> {tileDetails.contactName} </p>
            <p className="contact-tile-email"> {tileDetails.contactEmail} </p>
            <p className="contact-tile-contact"> {tileDetails.contactNumber} </p>
        </li>
    )
}
