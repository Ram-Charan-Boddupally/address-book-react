import React, { useEffect } from 'react';

import PageRouter from './components/router/appRouter'
import { ContactList } from '../models/contactList';
import contactListData from '../models/contactListData';

function App() {

  useEffect(() => {
    let contactList: ContactList;
    if (window.sessionStorage.getItem('contactsList')) {
      contactList = JSON.parse(window.sessionStorage.getItem('contactsList') as string)
      contactList = ContactList.fromJSON(contactList)
    } else {
      contactList = new ContactList(contactListData);
      window.sessionStorage.setItem("contactsList", JSON.stringify(contactList));
    }
  })

  return (
    <div className='container'>
      <PageRouter />
    </div>
  );
}

export default App;
