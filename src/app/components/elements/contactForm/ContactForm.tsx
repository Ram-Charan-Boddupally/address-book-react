import React ,{ useState, useEffect, ComponentState } from 'react'
import {TextField, DefaultButton} from '@fluentui/react'

import {ContactList} from  '../../../../models/contactList'
import {IContactFormProps,IContactFormState} from './IcontactForm'

import '../../../../styles/contactForm.css'
import { useNavigate } from 'react-router'

export function ContactForm(props:IContactFormProps){
    const [formDetails, setFormDetails] = useState<IContactFormState>({name: "", email: "",
                                             mobileNumber: "", landLine: "", website: "",
                                            address: "", 
                                                    errorState: {
                                                            name: false,
                                                            email: false,
                                                            mobileNumber: false,
                                                            website: false,
                                                        }})

    const navigate = useNavigate()    
    let myRefs:any[] = [];
    
    function inputHandler(event:any){
        const stateName:string = event.target.name
        const stateValue:string = event.target.value
        let stateStatus: Boolean = true
        let errors = {...formDetails.errorState}
        
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

        setFormDetails({...formDetails, [stateName]: stateValue, errorState: errors} as ComponentState)
    }

    function resetHandler(){
        if(!props.isEdit){
            setFormDetails({ name: "", email: "", mobileNumber: "",
                        landLine: "", website: "", address: "",                                                    errorState: {
                            name: false,
                            email: false,
                            mobileNumber: false,
                            website: false,
                        }})
        }else{
            navigate("../Home")
        }
    }
    
    function submitHandler(){
        let contactList = ContactList.fromJSON(JSON.parse(window.sessionStorage.getItem("contactsList") as string));

        // return true if no error in the stateErrors
        let errorVerification = Object.values(formDetails.errorState).every(bool=> bool===false)
        let emptyVerification = formDetails.name !== "" && formDetails.email !== "" && formDetails.mobileNumber !== ""
         
        // executes if there is false in empty or error verification
        if(!emptyVerification || !errorVerification){
            let errorIndex:number|undefined, stateName:string = "";
            
            if(!emptyVerification){
                alert("Please check empty the form")

                if(formDetails.name === ""){
                    stateName = "name"
                    errorIndex = 0
                }else if(formDetails.email === ""){
                    stateName = "email"
                    errorIndex = 1
                }else if(formDetails.mobileNumber === ""){
                    stateName = "mobileNumber"
                    errorIndex = 2
                }
            }else{
                alert("Please check the form")

                if(formDetails.name.search(/^[a-zA-Z ]+$/) === -1){
                    stateName = "name"
                    errorIndex = 0
                }else if(formDetails.email.search(/^[a-zA-Z]+([a-zA-Z0-9]|[_\.-])+@[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+/) ===-1){
                    stateName = "email"
                    errorIndex = 1
                }else if(formDetails.mobileNumber.search(/^(91)[6-9][0-9]{9}$/) ===-1 ){
                    stateName = "mobileNumber"
                    errorIndex = 2
                }else if(formDetails.website.search(/^(https|http):\/\/[a-zA-Z]+([a-zA-Z0-9]|[.:_\/\-%])+/) ===-1){
                    stateName = "website"
                    errorIndex = 3
                }else{
                    errorIndex = undefined
                }
            }

            setFormDetails({ ...formDetails, errorState: { ...formDetails.errorState, [stateName]: true } })

            errorIndex ? myRefs[errorIndex].focus() : void(0)
            return false
        }

        if(!props.isEdit){
            let contact = contactList.addContact({name:formDetails.name, email: formDetails.email,
                                               contactInformation: [formDetails.mobileNumber,formDetails.landLine],
                                                website: formDetails.website, address: formDetails.address});
            alert("Contact Updated")
        }else{
            contactList.editContact(props.contactId as string, {name: formDetails.name, email: formDetails.email, contactInformation: [ formDetails.mobileNumber, formDetails.landLine ],
                                 website: formDetails.website, address: formDetails.address})
            alert("Contact Added")
        }

        window.sessionStorage.setItem("contactsList",JSON.stringify(contactList));
        navigate("../Home");
    }

    useEffect(()=>{
        if(!props.isEdit) return 

        let contactList = ContactList.fromJSON(JSON.parse(window.sessionStorage.getItem("contactsList") as string));
        const contact = contactList.getContact(props.contactId as string)

        setFormDetails({name: contact.name, email: contact.email, mobileNumber: contact.contactInformation[0],
                    landLine: contact.contactInformation[1] as string,
                    website: contact.website, address: contact.address,
                errorState:{...formDetails.errorState}})
    },[])

    let buttonsNames = props.isEdit ? ["UPDATE", "CANCEL"] : ["SUBMIT", "RESET"]
    const errorStyle = {color:"red", fontSize: "small", marginLeft: "5px"}

    return (
        <form className='contact-form float-right'>

                <TextField label="Name" componentRef={ref => myRefs[0] = ref} required name="name" value={formDetails.name} onChange={inputHandler} />
                {formDetails.errorState.name && <span style={errorStyle}> {formDetails.name === "" ? "Name Cant be empty" : "Name is invalid"} </span>}

                <TextField label="Email" componentRef={ref => myRefs[1] = ref} required name="email" value={formDetails.email} onChange={inputHandler}/>
                {formDetails.errorState.email && <span style={errorStyle}> {formDetails.email === "" ? "Email Cant be empty" : "Email is invalid"} </span>}

                <div className='input-contact-details' style={{display: "flex"}}>
                    <TextField label="mobile number" styles={{fieldGroup: {width: 300, marginRight: 20}}} componentRef={ref => myRefs[2] = ref} name="mobileNumber" required value={formDetails.mobileNumber} onChange={inputHandler}/>

                    <TextField label='landline'  styles={{fieldGroup: {width: 300,}}} name="landLine" value={formDetails.landLine} onChange={inputHandler}/>
                </div>
                    {formDetails.errorState.mobileNumber && <span style={errorStyle}> {formDetails.mobileNumber === "" ? "mobile number Cant be empty" : "mobile number is invalid"} </span>}

                <TextField label="Website" componentRef={ref => myRefs[3] = ref} name='website' value={formDetails.website} onChange={inputHandler}/>
                {formDetails.errorState.website && <span style={errorStyle}> {formDetails.website === "" ? "" : "website is invalid"} </span>}

                <TextField label="address" name="address" multiline resizable={false} value={formDetails.address} onChange={inputHandler}/>

                <div className='contact-form-buttons'>
                    <DefaultButton className="form-action-button" onClick={submitHandler} text={buttonsNames[0]}/>
                    <DefaultButton className="form-cancel-button" onClick={resetHandler} text={buttonsNames[1]}/>
                </div>
        </form>
    )   
}