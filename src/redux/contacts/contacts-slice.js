import { createSlice } from "@reduxjs/toolkit";

import { fetchContacts, deleteContact, addContact } from "./contacts-operations";

const initialState = {
        items: [],
        isLoading: false,
        error: null,
};

const pending = (state) => {
    state.isLoading = true;
};

const rejected = (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
};

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.pending, pending)
            .addCase(fetchContacts.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.items = payload;
                state.error = null;
            })
            .addCase(fetchContacts.rejected, rejected)
            .addCase(deleteContact.pending, pending)
            .addCase(deleteContact.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.items = state.items.filter(({ id }) => id !== payload);
                state.error = null;
            })
            .addCase(deleteContact.rejected, rejected)
            .addCase(addContact.pending, pending)
            .addCase(addContact.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.items.push(payload);
                state.error = null;
            })
            .addCase(addContact.rejected, rejected)
    }
});

export default contactsSlice.reducer;