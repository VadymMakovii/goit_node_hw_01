const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.normalize("./db/contacts.json");

async function listContacts() {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    return contactsList;
};

async function getContactById(contactId) {
    const data = await fs.readFile(contactsPath, "utf8");
    const contact = await JSON.parse(data).find(item => item.id === contactId.toString());
    return contact;
};

async function addContact(name, email, phone) {
    const id = uid();
    const newContact = {
    id,
    name,
    email,
    phone,
    };
    const data = await fs.readFile(contactsPath, "utf8");
    const list = JSON.parse(data);
    list.push(newContact);
    const newData = JSON.stringify(list);
    return fs.writeFile(contactsPath, newData);
};

async function removeContact(contactId) {
    const data = await fs.readFile(contactsPath, "utf8");
    const filtredList = await JSON.parse(data).filter(item => item.id !== contactId.toString());
    const newData = JSON.stringify(filtredList);
    return fs.writeFile(contactsPath, newData);
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
