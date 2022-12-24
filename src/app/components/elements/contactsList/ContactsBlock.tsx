import React, { useState } from "react"
import { useNavigate, useNavigation } from "react-router"

import ConctactTile from './ContactTile'
import { ContactList } from "../../../../models/contactList"
import { IContactsBlockState } from "./IContactTile" 

import '../../../../styles/contactsList.css'

function ContactBlock(){
    let contacts = ContactList.fromJSON(JSON.parse(window.sessionStorage.getItem("contactsList") as string));
    let contactTilesList = [];

    let [activeTile, setActiveTile] = useState<IContactsBlockState>({selectedTile: ""})

    for(let i=0; i< contacts.getListLength(); i++){
        const clickStatus = contacts.contactList[i].id === activeTile? true : false
        contactTilesList.push(<ConctactTile contactId={contacts.contactList[i].id} isClicked={clickStatus} onClick={()=>{setActiveTile(contacts.contactList[i].id)}} navigate={useNavigate()}/>)
    }

    return(
        <div className="contacts-block">
            <h3>CONTACTS</h3>
            <ul className="contacts-list">
                {contactTilesList}
            </ul>
        </div>
    )
}

export default ContactBlock;