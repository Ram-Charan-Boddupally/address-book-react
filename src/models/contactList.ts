import {IContactProps} from './IcontactList'

class Contact implements IContactProps{    
    id:any;
    name:string;
    email:string;
    contactInformation: [string,string?];
    website: string;
    address: string;

    constructor(object:any){
        this.id = object.id;
        this.name = object.name != null ? object.name : "";
        this.email = object.email != null ? object.email : "";
        this.contactInformation = object.contactInformation != null ? object.contactInformation : [];
        this.website = object.website != null ? object.website : "";
        this.address = object.address != null ? object.address : "";
        this.contactInformation[1] = object.contactInformation[1] != null ? object.contactInformation[1] : "";
    }

    public editInformation(object:any):Contact{
        this.name = object.name != null ? object.name : this.name;
        this.email = object.email != null ? object.email : this.email;
        this.contactInformation[0] = object.contactInformation[0] != null ? object.contactInformation[0] : this.contactInformation[0];
        this.contactInformation[1] = object.contactInformation[1] != null ? object.contactInformation[1] : this.contactInformation[0];

        this.website = object.webiste != null ? object.webiste : this.website;
        this.address = object.address != null ? object.address : this.address;

        return object
    }
}

class ContactList{
    contactList: any;

    constructor(contactDetailsList:IContactProps[]){
        this.contactList = []
        // if contact list is not null append details
        // console.log(contactDetailsList,"const",typeof contactDetailsList)
        if(contactDetailsList){
            for(const emp of contactDetailsList){
                if(!emp.id) emp.id = this.getContactId(emp.id);
                let contact = new Contact(emp);
                this.contactList.push(contact);
            }
        }
    }

    private getContactId(empId:string|undefined):string{
        empId = 'emp';
        if(this.getListLength() > 0) empId += parseInt(this.contactList[this.getListLength()-1].id.split("emp")[1])+1;
        else empId += 0;

        return empId;
    }

    public addContact(contactDetails:any):Contact{
        contactDetails.id = this.getContactId(contactDetails.id);

        let contact = new Contact(contactDetails);
        this.contactList.push(contact)
        return contact;
    }

    public editContact(id:string, contactDetails:any):Contact|null{
        // console.log(this.contactList)
        for(const emp of this.contactList){
            if(emp.id == id){
                emp.editInformation(contactDetails);
                return contactDetails;
            }
        }
        return null;
    }
    
    public deleteContact(empId: string):boolean{
        let status = false;
        let actualLength = this.getListLength()
 
        this.contactList = this.contactList.filter((employee:any) => employee.id != empId);
        if(actualLength > this.contactList.getListLength){
            status = true;
        }

        return status;
    }

    public getListLength():number{
        return this.contactList.length;
    }
    
    public getContact(empId:string):Contact{
        return this.contactList.filter((contact:Contact) => contact.id == empId)[0]
    }

    private toJSON():any{
        return this.contactList;
    }
    
    public static fromJSON(json:any){
        let contactsList = new ContactList(json);
        return contactsList;
    }
}

export {Contact,ContactList};