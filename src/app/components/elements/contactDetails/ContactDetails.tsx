import React,{Component} from "react";
import { useNavigate, useLocation } from "react-router";

import { ContactList } from "../../../../models/contactList";
import { IContactProps, IContactState } from './IContactDetails'

import '../../../../styles/contactDetails.css'
import delIcon from '../../../../media/images/delete1.png'
import editIcon from '../../../../media/images/edit1.jpg'

export function ContactDetailsBlock(){
    const location = useLocation();
    const {contactId} = location.state;
    return <ConctactDetails contactId={contactId} location={useLocation()} navigate={useNavigate()}/>
}

export class ConctactDetails extends Component<IContactProps,IContactState>{
    contactList: ContactList 
    constructor(props:IContactProps){
        super(props);

        this.contactList = ContactList.fromJSON(JSON.parse(window.sessionStorage.getItem("contactsList") as string));
        this.state = { contactId: "", name: "", email: "", mobileNumber: "", 
                    landLine: "", website: "", address: "" }
        
        this.editContact = this.editContact.bind(this)
        this.deleteContact = this.deleteContact.bind(this)
    }

    static getDerivedStateFromProps(props:IContactProps,state:IContactState){        
        if(props.contactId != state.contactId){
            
            let contactList = ContactList.fromJSON(JSON.parse(window.sessionStorage.getItem("contactsList") as string));
            let contact = contactList.getContact(props.contactId);

            return { contactId:props.contactId, name:contact.name,
                email:contact.email, mobileNumber:contact.contactInformation[0],
                landline:contact.contactInformation[1], website:contact.website,
                address:contact.address } 
        }
        return null
    }
    
    private editContact():void{
        this.props.navigate? this.props.navigate('/Add',{state:{isEdit:true, contactId:this.props.contactId}}) : void(0);
    }

    private deleteContact(){
        // delete the contact from the model
        if(window.confirm("Confirm to delete the contact")){
            let delStatus:Boolean = this.contactList.deleteContact(this.props.contactId);
            sessionStorage.setItem("contactsList",JSON.stringify(this.contactList))
            this.props.navigate ? this.props.navigate('/Home') : void(0);
        }
    }

    render(): React.ReactNode {
        return (
        <div className="contact-details float-right">
            <div className="contact-detail-options">
                <a className="editContact" onClick={this.editContact}> <img src={delIcon} alt="editicon"/> EDIT</a>
                <a className="deleteContact" onClick={this.deleteContact}> <img src={editIcon} alt="delete-icon"/> DELETE</a>
            </div>

            <div className="user-name contact-information">{this.state.name}</div>
            <div className="email-address contact-information">Email: {this.state.email}</div>
            <div className="mobile-number contact-information">Mobile: {this.state.mobileNumber}</div>
            <div className="landLine-number contact-information">Landline: {this.state.landLine !== "" ? this.state.landLine : "NA"}</div>
            <div className="website contact-information">Website: {this.state.website}</div>
            <div className="address contact-information">Address: {this.state.address !== "" ? this.state.address : "NA"}</div>
        </div>)
    }
}