import { useState } from "react";
import { useDispatch } from 'react-redux';
import { nanoid } from "nanoid";

import { addContact } from "../../../redux/contacts/contacts-operations.js";

import styles from './my-contact-form.module.css'

const INITIAL_STATE = {
    contacts: [],
    filter: '',
    name: '',
    phone: ''
};

const MyContactForm = () => {
    const [state, setState] = useState({ ...INITIAL_STATE });
    // const {items} = useSelector(selectAllContacts);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchContacts());
    // }, []);
    // const isDublicate = ({ name, phone }) => {
    //     const normalizedName = name.toLowerCase();
    //     const normalizedPhone = phone.trim();
        
    //     const dublicate = items.find(item => {
    //         const normalizeCurrentName = item.name.toLowerCase();
    //         const normalizeCurrentPhone = item.phone.trim();
    //         return (normalizeCurrentName === normalizedName || normalizeCurrentPhone === normalizedPhone)
    //     })
    //     return Boolean(dublicate);
    // };

    const onAddContact = (data) => {
        dispatch(addContact(data));
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setState({
            ...state,
            [name]: value,
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddContact({ ...state });
        // if (!isDublicate({ ...state })) {
            reset();
        // }
    };

    const reset = () => {
        setState({ ...INITIAL_STATE });
    };

    
    const contactNameId = nanoid();
    const contactPhoneId = nanoid();
    
    const { name, phone } = state;

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formElements}>
                <label htmlFor={contactNameId}>Name</label>
                <input
                    value={name}
                    onChange={handleChange}
                    id={contactNameId}
                    name="name"
                    required
                    type="text"
                    placeholder="Name" />
            </div>
            <div className={styles.formElements}>
                <label htmlFor={contactPhoneId}>Phone</label>
                <input
                    value={phone}
                    onChange={handleChange}
                    id={contactPhoneId}
                    name="phone"
                    required
                    pattern="^[+0-9\-\(\)\s]+$"
                    type="tel"
                    placeholder="Phone" />
            </div>
            <button className={styles.btn} type="submit">Add contact</button>
        </form>
    );
}

export default MyContactForm;