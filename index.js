const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const argv = require("yargs").argv;

async function invokeAction ({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts)
      break;

    case "get":
      const searchedContact = await getContactById(id);
      console.log(searchedContact);
      break;

    case "add":
      const updatedList = await addContact(name, email, phone);
      console.log(updatedList);
      break;

    case "remove":
      const removedContact = await removeContact(id);
       console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
