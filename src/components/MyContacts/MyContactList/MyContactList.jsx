import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchContacts, deleteContact } from "../../../redux/contacts/contacts-operations";

import { selectContacts, selectFilteredContacts } from '../../../redux/contacts/constants-selectors';

import styles from "./my-contact-list.module.css"

const MyContactList = () => {
    const items = useSelector(selectFilteredContacts);
    const { isLoading, error } = useSelector(selectContacts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const onDeleteContact = (id) => {
        dispatch(deleteContact(id));
    };

    const elements = items.map(({ id, name, phone }) => 
            <li
                className={styles.list}
                key={id}
            >
                {name}: {phone}
                <button
                    onClick={() => onDeleteContact(id)}
                    className={styles.btn}
                    type="button">
                    Delete
                </button>
            </li>
        )

    return (
        <ul>
            {isLoading && <p>...Loading</p>}
            {error && <p>{error}</p>}
            {elements}
        </ul>
    );
};

export default MyContactList;