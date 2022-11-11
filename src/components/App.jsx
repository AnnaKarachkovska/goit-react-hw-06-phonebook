import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import styles from './App.module.css';
import { addContact, deleteContact, setFilter } from 'redux/actions';

const App = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const handleSubmit = ev => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    const isExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact({ name: name, id: nanoid(), number: number }))

    form.reset();
  };

  const handleChange = ev => {
    dispatch(setFilter(ev.currentTarget.value));
  };

  const filterItems = () => {
    const filteredItems = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredItems;
  };

  const deleteItem = ev => {
    dispatch(deleteContact(ev.target.id));
  };

  useEffect(() => {
    localStorage.setItem('Contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <ErrorBoundary>
        <div className={styles.section}>
          <h1>Phonebook</h1>
          <ContactForm formSubmit={handleSubmit} />
          <h2>Contacts</h2>
          <Filter inputChange={handleChange} />
          <ContactList listFilter={filterItems()} listDelete={deleteItem} />
        </div>
      </ErrorBoundary>
    </>
  );
};

export default App;
