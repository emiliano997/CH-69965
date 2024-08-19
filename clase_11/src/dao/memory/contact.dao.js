import { v4 as uuidv4 } from "uuid";

export class ContactDao {
  #contacts;

  constructor() {
    this.#contacts = [];
  }

  async getAll() {
    return this.#contacts;
  }

  async getById({ id }) {
    return this.#contacts.find((contact) => contact.id === id);
  }

  async create(contact) {
    // contact.id = this.#contacts.length
    //   ? this.#contacts[this.#contacts.length - 1].id + 1
    //   : 1;

    contact.id = uuidv4(); // Generar un id aleatorio
    this.#contacts.push(contact);
    return contact;
  }
}
