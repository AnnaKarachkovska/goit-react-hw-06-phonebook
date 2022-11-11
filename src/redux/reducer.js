import { addContact, deleteContact, setFilter } from './actions';
import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from "redux";

const initState = JSON.parse(localStorage.getItem('Contacts')) || [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const filter = '';

export const contactReducer = createReducer(initState, {
  [addContact]: (state, action) => {
    state.push(action.payload);
  },
  [deleteContact]: (state, action) => {
    return state.filter(contact => contact.id !== action.payload);
  },
});

const filterReducer = createReducer(filter, {
    [setFilter]: (state, action) => {
        return state = action.payload;
    }
});

export const rootReducer = combineReducers({
    contacts: contactReducer,
    filter: filterReducer,
});