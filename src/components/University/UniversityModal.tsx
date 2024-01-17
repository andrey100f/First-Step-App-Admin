import styles from "../utils/styles/EntityModal.module.css";
import {useState} from "react";
import {UniversityProps} from "./UniversityProps.tsx";

/**
 * Props pentru UniversityModal
 */
interface UniversityModalProps {
    closeModal: () => void;
    onSubmit: (university: UniversityProps) => void;
    defaultValue: UniversityProps;
}

/**
 * Starea inițială a formularului
 */
const initialState = {
    name: "",
    img: "",
}

/**
 * Component pentru fereastra modală de adăugare/editare universitate
 * @param closeModal - Funcție pentru închiderea ferestrei modale
 * @param onSubmit - Funcție pentru trimiterea datelor universității la submit
 * @param defaultValue - Valori implicite pentru editarea unei universități
 */
export function UniversityModal({closeModal, onSubmit, defaultValue}: UniversityModalProps) {
    const [formState, setFormState] = useState(defaultValue || initialState);
    const [errors, setErrors] = useState("");

    /**
     * Funcție pentru actualizarea stării formularului la schimbarea valorilor
     * @param e - Evenimentul de schimbare
     */
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    /**
     * Funcție pentru gestionarea submit-ului formularului
     * @param e - Evenimentul de submit
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validateForm()) {
            return;
        }

        onSubmit(formState)
        closeModal();
    }

    /**
     * Verificam daca campurile necesare sunt completate in formState. Daca toate campurile necesare sunt completate,
     * atunci nu exista nici o eroare si returnam true pentru a indica ca formularul este validat cu succes.
     * Daca exista campuri necompletate, le adaugam la lista errorFields. Setam mesajul de eroare cu lista campurilor
     * necompletate si returnam false pentru a indica ca formularul nu este validat.
     */
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


    /**
     * Randarea componentului
     */
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
