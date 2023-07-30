const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts()
        .then(console.table)
        .catch((error) => console.log(`${error} \n Try again!`));
      break;

    case "get":
      getContactById(id)
        .then((data) =>
          data
            ? console.log(data)
            : console.log("No such contact! \n Try again!")
        )
        .catch((error) => console.log(`${error} \n Try again!`));
      break;

    case "add":
      addContact(name, email, phone)
        .then((data)=>console.log('Add contact: \n', data))
        .catch((error) => console.log(`${error} \n Try again!`));
      break;

    case "remove":
      removeContact(id)
        .then((data) =>
          data
            ? console.log('Remove contact: \n',data)
            : console.log("No such contact! \n Try again!")
        )
        .catch((error) => console.log(`${error} \n Try again!`));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
