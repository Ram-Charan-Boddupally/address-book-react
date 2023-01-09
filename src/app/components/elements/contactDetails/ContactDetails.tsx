import React,{useEffect, useState} from "react";
import { useNavigate, useLocation, NavigateFunction } from "react-router";

import { ContactList } from "../../../../models/contactList";
import { IContactProps, IContactState } from './IContactDetails'

import '../../../../styles/contactDetails.css'
import delIcon from '../../../../media/images/delete1.png'
import editIcon from '../../../../media/images/edit1.jpg'

function deleteContact(contactList:ContactList, contactId:string, navigate:NavigateFunction){
    // delete the contact from the model
    if(window.confirm("Confirm to delete the contact")){
        contactList.deleteContact(contactId);
        sessionStorage.setItem("contactsList",JSON.stringify(contactList))

        navigate('/Home');
    }
}


export default function ConctactDetails(){

    const navigate = useNavigate()
    const location = useLocation()
    let {contactId} = location.state;
    
    let contactList:ContactList = ContactList.fromJSON(JSON.parse(window.sessionStorage.getItem("contactsList") as string));
    const [contact, setContact] = useState<IContactState>({ contactId: "", name: "", email: "", mobileNumber: "", 
                                    landLine: "", website: "", address: "" })
    
    useEffect(()=>{
        let contact = contactList.getContact(contactId);

        setContact({ contactId:contactId, name:contact.name,
            email:contact.email, mobileNumber:contact.contactInformation[0],
            landLine:contact.contactInformation[1], website:contact.website,
            address:contact.address })
        },[contactId])

    function editContact():void{
        navigate('/Add',{state:{isEdit:true, contactId:contactId}})    
    }
                    
    return (
    <div className="contact-details float-right">
        <div className="contact-detail-options">
            <a className="editContact" onClick={editContact}> <img src={editIcon} alt="editicon"/> EDIT</a>
            <a className="deleteContact" onClick={()=>deleteContact(contactList, contactId, navigate)}> <img src={delIcon} alt="delete-icon"/> DELETE</a>
        </div>

        <div className="user-name contact-information">{contact.name}</div>
        <div className="email-address contact-information">Email: {contact.email}</div>
        <div className="mobile-number contact-information">Mobile: {contact.mobileNumber}</div>
        <div className="landLine-number contact-information">Landline: {contact.landLine !== "" ? contact.landLine : "NA"}</div>
        <div className="website contact-information">Website: {contact.website}</div>
        <div className="address contact-information">Address: {contact.address !== "" ? contact.address : "NA"}</div>
    </div>)
 
}