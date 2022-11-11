import { createAction } from "@reduxjs/toolkit";

export const addContact = createAction('contacts/AddContact');

export const deleteContact = createAction('contacts/deleteContact');

export const setFilter = createAction('filters/setFilter');
