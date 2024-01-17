import styles from "../utils/styles/EntityModal.module.css";
import {useEffect, useState} from "react";
import {FacultyProps} from "./FacultyProps.tsx";
import {UniversityProps} from "../University/UniversityProps.tsx";
import {getAllUniversities} from "../University/UniversityApi.tsx";

/**
 * Componenta pentru gestionarea modalului de adăugare/editare a unei facultăți.
 */
interface FacultyModalProps {
    closeModal: () => void;
    onSubmit: (university: FacultyProps) => void;
    defaultValue: FacultyProps;
}

/**
 * Starea inițială a formularului.
 */
const initialState = {
    universityName: "",
    facultyName: "",
}

/**
 * Componenta principală pentru modalul de facultate.
 *
 * @param closeModal - Funcția de închidere a modalului
 * @param onSubmit - Funcția apelată la submiterea formularului
 * @param defaultValue - Valoarea implicită a formularului pentru editare
 */
export function FacultyModal({closeModal, onSubmit, defaultValue}: FacultyModalProps) {
    const [formState, setFormState] = useState(defaultValue || initialState);
    const [errors, setErrors] = useState("");
    const [universities, setUniversities] = useState<UniversityProps[]>([]);
    const token = localStorage.getItem("loginToken");


    /**
     * Obține lista de universități la încărcarea componentei
     */
    useEffect(() => {
        const getUniversities = async () => {
            const res = await getAllUniversities(token!);
            setUniversities(res);
        }


        getUniversities()
    }, []);

    /**
     * Actualizează starea formularului la schimbarea valorii în câmpuri.
     *
     * @param e - Evenimentul de schimbare a valorii
     */
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    /**
     * Gestionează submiterea formularului.
     *
     * @param e - Evenimentul de submitere
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
        if(formState.facultyName && formState.universityName) {
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
                        <label htmlFor="universityName">University</label>
                        <select name="universityName" value={formState.universityName} onChange={handleChange}>
                            <option value="">Select university</option>
                            {universities?.map(university => {
                                return (<option value={university.name}>{university.name}</option>)
                            })}
                        </select>
                    </section>

                    <section className={styles.entityFormGroup}>
                        <label htmlFor="facultyName">Faculty</label>
                        <input type="test" name="facultyName" value={formState.facultyName} onChange={handleChange}/>
                    </section>

                    {errors &&
                        <section className={styles.error}>{`Please include ${errors}`}</section>}

                    <button className={styles.submitButton} type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            </section>
        </section>
    )
}
