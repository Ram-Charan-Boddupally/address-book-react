import React ,{Component, ComponentState} from 'react'
import {TextField, DefaultButton} from '@fluentui/react'

import {ContactList} from  '../../../../models/contactList'
import {IContactFormProps,IContactFormState} from './IcontactForm'

import '../../../../styles/contactForm.css'
export class ContactForm extends Component<IContactFormProps, IContactFormState>{
    myRefs: any[];

    constructor(props:IContactFormProps){
        super(props);
        this.state = {name: "", email: "", mobileNumber: "", landLine: "", website: "", address: "", 
        errorState: {
            name: false,
            email: false,
            mobileNumber: false,
            website: false,
        }}
        this.myRefs = []
    
        this.inputHandler = this.inputHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.resetHandler = this.resetHandler.bind(this)
    }

    inputHandler(event: any){
        const stateName:string = event.target.name
        const stateValue:string = event.target.value
        let stateStatus: Boolean = true
        let errors = {...this.state.errorState}
        
        switch(stateName){
            case 'name':
                stateStatus = stateValue.search(/^[a-zA-Z ]+$/) === -1 ? true : false
                errors.name =  stateStatus
                break

            case 'email':
                stateStatus = stateValue.search(/^[a-zA-Z]+([a-zA-Z0-9]|[_\.-])+@[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+/) === -1 ? true : false
                errors.email = stateStatus
                break

            case 'mobileNumber':
                stateStatus = stateValue.search(/^(91)[6-9][0-9]{9}$/) === -1 ? true : false
                errors.mobileNumber = stateStatus
                break

            case 'website':
                stateStatus = stateValue.search(/^(https|http):\/\/[a-zA-Z]+([a-zA-Z0-9]|[.:_\/\-%])+/) === -1 ? true : false
                errors.website = stateStatus
                break
        }    

        this.setState({[stateName]: stateValue, errorState: errors} as ComponentState)

        // this.setState({ 
        //     [stateName]: stateValue, 
        //     errorState: {
        //     [stateName]: stateStatus
        //  }} as ComponentState);
    }

    resetHandler(){
        if(!this.props.isEdit){
            this.setState({ name: "", email: "", mobileNumber: "",
                        landLine: "", website: "", address: "" })
        }else{
            this.props.navigate ? (this.props.navigate("../Home")) : void(0)
        }
    }
    
    submitHandler(){
        let contactList = ContactList.fromJSON(JSON.parse(window.sessionStorage.getItem("contactsList") as string));

        // return true if no error in the stateErrors
        let errorVerification = Object.values(this.state.errorState).every(bool=> bool===false)
        let emptyVerification = this.state.name !== "" && this.state.email !== "" && this.state.mobileNumber !== ""
         
        // executes if there is false in empty or error verification
        if(!emptyVerification || !errorVerification){
            let errorIndex:number|undefined, stateName:string = "";
            
            if(!emptyVerification){
                alert("Please check empty the form")

                if(this.state.name === ""){
                    stateName = "name"
                    errorIndex = 0
                }else if(this.state.email === ""){
                    stateName = "email"
                    errorIndex = 1
                }else if(this.state.mobileNumber === ""){
                    stateName = "mobileNumber"
                    errorIndex = 2
                }
            }else{
                alert("Please check the form")

                if(this.state.name.search(/^[a-zA-Z ]+$/) === -1){
                    stateName = "name"
                    errorIndex = 0
                }else if(this.state.email.search(/^[a-zA-Z]+([a-zA-Z0-9]|[_\.-])+@[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+/) ===-1){
                    stateName = "email"
                    errorIndex = 1
                }else if(this.state.mobileNumber.search(/^(91)[6-9][0-9]{9}$/) ===-1 ){
                    stateName = "mobileNumber"
                    errorIndex = 2
                }else if(this.state.website.search(/^(https|http):\/\/[a-zA-Z]+([a-zA-Z0-9]|[.:_\/\-%])+/) ===-1){
                    stateName = "website"
                    errorIndex = 3
                }else{
                    errorIndex = undefined
                }    
            }

            this.setState({ errorState: { ...this.state.errorState, [stateName]: true } })

            // this.setState({errorState:{
            //     ...this.state.errorState,
            //     // [stateName]: true
            // }})

            errorIndex ? this.myRefs[errorIndex].focus() : void(0)
            return false
        }

        if(!this.props.isEdit){
            let contact = contactList.addContact({name:this.state.name, email: this.state.email,
                                               contactInformation: [this.state.mobileNumber,this.state.landLine],
                                                website: this.state.website, address: this.state.address});
        }else{
            contactList.editContact(this.props.contactId as string, {name: this.state.name, email: this.state.email, contactInformation: [ this.state.mobileNumber, this.state.landLine ],
                                 website: this.state.website, address: this.state.address})
        }

        window.sessionStorage.setItem("contactsList",JSON.stringify(contactList));

        this.props.isEdit ? alert("Contact Updated") : alert("Contact Added")
        this.props.navigate ? this.props.navigate("../Home") : void(0)
    }

    componentDidMount(): void {
        if(!this.props.isEdit) return 

        let contactList = ContactList.fromJSON(JSON.parse(window.sessionStorage.getItem("contactsList") as string));
        const contact = contactList.getContact(this.props.contactId as string)

        this.setState({name: contact.name,
                    email: contact.email,
                    mobileNumber: contact.contactInformation[0],
                    landLine: contact.contactInformation[1] as string,
                    website: contact.website,
                    address: contact.address})
    }

    render(): React.ReactNode {

        let buttonsNames = ["SUBMIT", "RESET"]
        if(this.props.isEdit){
            buttonsNames = ["UPDATE", "CANCEL"]
        }

        const errorStyle = {color:"red", fontSize: "small", marginLeft: "5px"}
        return (
            <form className='contact-form float-right'>

                    <TextField label="Name" componentRef={ref => this.myRefs[0] = ref} required name="name" value={this.state.name} onChange={this.inputHandler} />
                    {this.state.errorState.name && <span style={errorStyle}> {this.state.name === "" ? "Name Cant be empty" : "Name is invalid"} </span>}

                    <TextField label="Email" componentRef={ref => this.myRefs[1] = ref} required name="email" value={this.state.email} onChange={this.inputHandler}/>
                    {this.state.errorState.email && <span style={errorStyle}> {this.state.email === "" ? "Email Cant be empty" : "Email is invalid"} </span>}

                    <div className='input-contact-details' style={{display: "flex"}}>
                        <TextField label="mobile number" styles={{fieldGroup: {width: 300, marginRight: 20}}} componentRef={ref => this.myRefs[2] = ref} name="mobileNumber" required value={this.state.mobileNumber} onChange={this.inputHandler}/>

                        <TextField label='landline'  styles={{fieldGroup: {width: 300,}}} name="landLine" value={this.state.landLine} onChange={this.inputHandler}/>
                    </div>
                        {this.state.errorState.mobileNumber && <span style={errorStyle}> {this.state.mobileNumber === "" ? "mobile number Cant be empty" : "mobile number is invalid"} </span>}

                    <TextField label="Website" componentRef={ref => this.myRefs[3] = ref} name='website' value={this.state.website} onChange={this.inputHandler}/>
                    {this.state.errorState.website && <span style={errorStyle}> {this.state.website === "" ? "" : "website is invalid"} </span>}

                    <TextField label="address" name="address" multiline resizable={false} value={this.state.address} onChange={this.inputHandler}/>

                    <div className='contact-form-buttons'>
                        <DefaultButton className="form-action-button" onClick={this.submitHandler} text={buttonsNames[0]}/>
                        <DefaultButton className="form-cancel-button" onClick={this.resetHandler} text={buttonsNames[1]}/>
                    </div>
            </form>
        )
    }
}