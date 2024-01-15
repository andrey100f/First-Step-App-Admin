import styles from "../styles/EntityModal.module.css";
import {useState} from "react";
import {UniversityProps} from "./UniversityProps.tsx";

interface UniversityModalProps {
    closeModal: () => void;
    onSubmit: (university: UniversityProps) => void;
    defaultValue: UniversityProps;
}

const initialState = {
    name: "",
    img: "",
}

export function UniversityModal({closeModal, onSubmit, defaultValue}: UniversityModalProps) {
    const [formState, setFormState] = useState(defaultValue || initialState);
    const [errors, setErrors] = useState("");

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validateForm()) {
            return;
        }

        onSubmit(formState)
        closeModal();
    }

    const validateForm = () => {
        if(formState.name && formState.img) {
            setErrors("")
            return true;
        }

        const errorFileds = []
        for(const [key, value] of Object.entries(formState)) {
            if(!value) {
                errorFileds.push(key)
            }
        }

        setErrors(errorFileds.join(", "))
        return false;
    }

    return (
        <section className={styles.modalContainer}
                 onClick={(e) => {
                     if(e.target.className === styles.modalContainer) {
                         closeModal();
                     }
                 }}>
            <section className={styles.modal}>
                <form>
                    <section className={styles.entityFormGroup}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={formState.name} onChange={handleChange}/>
                    </section>

                    <section className={styles.entityFormGroup}>
                        <label htmlFor="img">University Img</label>
                        <input type="text" name="img" value={formState.img} onChange={handleChange}/>
                    </section>

                    {errors &&
                        <section className={styles.error}>{`Please include ${errors}`}</section>}

                    <button className={styles.submitButton} type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            </section>
        </section>
    )
}