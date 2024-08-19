import { contactDao, productDao } from "../dao/index.js";
import { ContactRepository } from "./contact.repository.js";
import { ProductRepository } from "./product.repository.js";

const contactRepository = new ContactRepository(contactDao);
const productRepository = new ProductRepository(productDao);

export { contactRepository, productRepository };
