import styles from "../styles/EntityModal.module.css";
import {useState} from "react";
import {AnnouncementProps} from "./AnnouncementProps.tsx";

interface AnnouncementModalProps {
    closeModal: () => void;
    onSubmit: (announcement: AnnouncementProps) => void;
    defaultValue: AnnouncementProps;
}

const initialState = {
    title: "",
    text: "",
    faculty: "Facultatea de Matematica si Informatica",
    university: "Universitatea Babes Bolyai",
    url: ""
}

export function AnnouncementModal({closeModal, onSubmit, defaultValue}: AnnouncementModalProps) {
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
        if(formState.title && formState.text && formState.university && formState.faculty && formState.url) {
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
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" value={formState.title} onChange={handleChange} />
                    </section>

                    <section className={styles.entityFormGroup}>
                        <label htmlFor="text">Text</label>
                        <textarea name="text" value={formState.text} onChange={handleChange} />
                    </section>

                    <section className={styles.entityFormGroup}>
                        <label htmlFor="faculty">Faculty</label>
                        <select name="faculty" value={formState.faculty} onChange={handleChange}>
                            <option value="Facultatea de Matematica si Informatica">Facultatea de Matematica si Informatica</option>
                            <option value="Facultatea de Matematica si Informatica">Facultatea de Matematica si Informatica</option>
                            <option value="Facultatea de Matematica si Informatica">Facultatea de Matematica si Informatica</option>
                        </select>
                    </section>

                    <section className={styles.entityFormGroup}>
                        <label htmlFor="University">University</label>
                        <select name="University" value={formState.university} onChange={handleChange}>
                            <option value="Universitatea Babes-Bolyai">Universitatea Babes-Bolyai</option>
                            <option value="Universitatea Babes-Bolyai">Universitatea Babes-Bolyai</option>
                            <option value="Universitatea Babes-Bolyai">Universitatea Babes-Bolyai</option>
                        </select>
                    </section>

                    <section className={styles.entityFormGroup}>
                        <label htmlFor="url">Url</label>
                        <input type="text" name="url" value={formState.url} onChange={handleChange}/>
                    </section>

                    {errors &&
                        <section className={styles.error}>{`Please include ${errors}`}</section>}

                    <button className={styles.submitButton} type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            </section>
        </section>
    )
}