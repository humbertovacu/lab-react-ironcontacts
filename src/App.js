import React, { useState } from 'react';
import './App.css';
import contactList from './contacts.json';
const newContacts = [...contactList];
newContacts.splice(0,5)
let randomContact = ""
const fiveContacts = contactList.slice(0,5)
const contactIds = [];
const usedContacts = [];
fiveContacts.forEach(contact => {contactIds.push(contact.id)})

function App() {

let [contacts, updateContacts] = useState(fiveContacts);
let contactToImport = ""; 
let max = newContacts.length;
let randomIndex = Math.floor(Math.random() * max);

const createRandomNum = () => {
randomContact = newContacts[randomIndex]}

const addContacts = () => {
  let createContact = () => { 
  createRandomNum()
  if(!contactIds.includes(randomContact.id)){
      contactToImport = randomContact
      contactIds.push(randomContact.id)
      newContacts.splice(randomIndex, 1)
      return true
    } else {usedContacts.push(randomContact)}
    } 
    createContact()
    updateContacts([contactToImport, ...contacts])
  }

  const sortByName = () => {

    const currentContacts = [...contacts]
    currentContacts.sort(function (a,b) {
      if(a.name < b.name) {
        return -1;
      }
      if(a.name > b.name) {
        return 1;
      }
      return 0;
    })

    updateContacts(currentContacts)

  }

  const sortByPopularity = () => {

    const currentContacts = [...contacts]
    currentContacts.sort(function (a,b) {
      if(a.popularity > b.popularity) {
        return -1;
      }
      if(a.popularity < b.popularity) {
        return 1;
      }
      return 0;
    })

    updateContacts(currentContacts)

  }

  const deleteContact = (event) => {
    event.preventDefault()
    const currentContacts = [...contacts]
    const selectedContact = event.target.value
    const contactToRemove = currentContacts.findIndex(({id}) => 
      id === selectedContact)
    currentContacts.splice(contactToRemove, 1);
    updateContacts(currentContacts)
  }
  

  return (
    <div className="App">
      <div className='buttonContainer'>
        <button onClick={addContacts}>Add Random Contact</button>
        <button onClick={sortByName}>Sort By Name</button>
        <button onClick={sortByPopularity}>Sort By Popularity</button>
      </div>
      <div className='tableContainer'>
        <table className="contactTable">
          <thead >
            <tr>
              <th className="tableHeaders">Picture</th>
              <th className="tableHeaders">Name</th>
              <th className="tableHeaders">Popularity</th>
              <th className="tableHeaders">Won an Oscar</th>
              <th className="tableHeaders">Won an Emmy</th>
              <th className="tableHeaders">Delete</th>
            </tr>
          </thead>
          <tbody>
              {contacts.map(contact => {
                return(
                <tr key={contact.id}>
                  <td><img src={contact.pictureUrl} alt="contact" width={100}/></td>
                  <td>{contact.name}</td>
                  <td>{contact.popularity}</td>
                  <td>{contact.wonOscar && <td className='trophy'><i className="fa fa-trophy"></i></td>}</td>
                  <td>{contact.wonEmmy && <td className='trophy'><i className="fa fa-trophy"></i></td>}</td>
                  <td><button value={contact.id} onClick={deleteContact}>Delete</button></td>
                </tr>)
              })}
            </tbody>
        </table>
        </div>
    </div>
  );
}

export default App;
