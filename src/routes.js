import ContactForm from "./pages/ContactForm";
import ContactList from "./pages/ContactList";

const routes = [
  { path: "/contact", name: "contact", component: ContactForm },
  { path: "/contact-list", name: "contactList", component: ContactList }
];
export default routes;
