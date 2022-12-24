import React,{Component} from "react";
import ContactsBlock from '../elements/contactsList/ContactsBlock'

class Home extends React.Component<{},{}>{
    constructor(props:{}){
        super(props);
    }

    render(): React.ReactNode {
        return(
            <ContactsBlock/>
        );
    }
}

export default Home;