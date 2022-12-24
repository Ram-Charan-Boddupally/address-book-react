import React from "react";
import { useLocation, useNavigate } from 'react-router-dom'

import ContactsBlock from '../elements/contactsList/ContactsBlock'
import { ContactForm } from "../elements/contactForm/ContactForm"

export default function AddContact(){
  const location = useLocation()
  const state = location.state

  if(state.isEdit){
    return(<>
        <ContactsBlock/>
        <ContactForm isEdit={true} contactId={state.contactId} navigate={useNavigate()}/>
      </>)
  }else{
    return(<>
            <ContactsBlock/>
            <ContactForm isEdit={false} navigate={useNavigate()}/>
          </>)
  }        
}
