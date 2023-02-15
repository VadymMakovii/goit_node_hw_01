const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const contactsList = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(contactsList);
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const contact = data.find((item) => item.id === contactId.toString());
    return contact;
  } catch (error) {
    console.warn(`Something went wrong! Error message:${error.message}`);
  }
}

async function addContact(name, email, phone) {
  try {
    const id = uid();
    const newContact = {
      id,
      name,
      email,
      phone,
    };
    const data = await listContacts();
    data.push(newContact);
    const newData = JSON.stringify(data, null, 2);
    await fs.writeFile(contactsPath, newData);
    return newData;
  } catch (error) {
    console.warn(`Something went wrong! Error message:${error.message}`);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const filtredList = data.filter(
      (item) => item.id !== contactId.toString()
    );
    const newData = JSON.stringify(filtredList, null, 2);
    await fs.writeFile(contactsPath, newData);
    return newData;
  } catch (error) {
    console.warn(`Something went wrong! Error message:${error.message}`);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
