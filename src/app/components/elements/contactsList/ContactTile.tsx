import React,{Component} from "react";
import {ContactList} from '../../../../models/contactList';

import { IContactTileProps, IContactTileState } from './IContactTile'
export default class ConctactTile extends Component<IContactTileProps,IContactTileState>{
    constructor(props:IContactTileProps){
        super(props);

        let contacts = ContactList.fromJSON(JSON.parse(window.sessionStorage.getItem("contactsList") as string));
        let contact = contacts.getContact(this.props.contactId)
        this.state = {
            contactId: this.props.contactId,
            contactName: contact.name,
            contactEmail: contact.email,
            contactNumber: contact.contactInformation[0],
            isClicked: false
        };
        
        this.chickHandler = this.chickHandler.bind(this)
    }

    private chickHandler(): void{
        this.props.onClick()
        this.props.navigate ? this.props.navigate('/Details',{state:{contactId:this.state.contactId}}) : void(0);
    }

    render(): React.ReactNode {
        return (
            <li className={this.props.isClicked? "contact-tile selected":"contact-tile"} key={this.state.contactId} onClick={this.chickHandler}>
                <p className="contact-tile-name"> {this.state.contactName} </p>
                <p className="contact-tile-email"> {this.state.contactEmail} </p>
                <p className="contact-tile-contact"> {this.state.contactNumber} </p>
            </li>
        )
    }
}
