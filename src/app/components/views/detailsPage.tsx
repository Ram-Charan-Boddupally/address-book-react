import React from "react";
import ContactDetails from '../elements/contactDetails/ContactDetails'
import ContactsBlock from '../elements/contactsList/ContactsBlock'

export default class DetailsBlock extends React.Component<{},{}>{
    constructor(props:{}){
        super(props);
    }

    render(): React.ReactNode {
        return(
            <>
                <ContactsBlock/>
                <ContactDetails/>
            </>
        );
    }
}
