import styles from "../utils/styles/EntityModal.module.css";
import {useEffect, useState} from "react";
import {AnnouncementProps} from "./AnnouncementProps.tsx";
import {UniversityProps} from "../University/UniversityProps.tsx";
import {getAllUniversities} from "../University/UniversityApi.tsx";

/**
 * Proprietățile necesare pentru componenta AnnouncementModal.
 */
interface AnnouncementModalProps {
    closeModal: () => void;
    onSubmit: (announcement: AnnouncementProps) => void;
    defaultValue: AnnouncementProps;
}

/**
 * Starea inițială a formularului.
 */
const initialState = {
    title: "",
    text: "",
    faculty: "",
    university: "",
    url: ""
}

/**
 * Componenta pentru fereastra modală de adăugare/editare anunț.
 * @param closeModal - Funcție pentru închiderea ferestrei modale.
 * @param onSubmit - Funcție pentru trimiterea formularului.
 * @param defaultValue - Valoarea implicită a formularului pentru editare.
 */
export function AnnouncementModal({closeModal, onSubmit, defaultValue}: AnnouncementModalProps) {
    const [formState, setFormState] = useState(defaultValue || initialState);
    const [errors, setErrors] = useState("");
    const [universities, setUniversities] = useState<UniversityProps[]>([]);
    const token = localStorage.getItem("loginToken");

    /**
     * Efect secundar pentru obținerea listei de universități.
     */
    useEffect(() => {
        const getUniversities = async () => {
            const res = await getAllUniversities(token!);
            setUniversities(res);
        }


        getUniversities()
    }, []);

    /**
     * Funcție pentru gestionarea modificărilor în formular.
     * @param e - Evenimentul de schimbare.
     */
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    /**
     * Funcție pentru gestionarea trimiterii formularului.
     * @param e - Evenimentul de submit.
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

    /**
     * Renderea componentei.
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
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" value={formState.title} onChange={handleChange} />
                    </section>

                    <section className={styles.entityFormGroup}>
                        <label htmlFor="text">Text</label>
                        <textarea name="text" value={formState.text} onChange={handleChange} />
                    </section>

                    <section className={styles.entityFormGroup}>
                        <label htmlFor="university">University</label>
                        <select name="university" value={formState.university} onChange={handleChange}>
                            <option value="">Select university</option>
                            {universities?.map(university => {
                                return (<option value={university.name}>{university.name}</option>)
                            })}
                        </select>
                    </section>

                    <section className={styles.entityFormGroup}>
                        <label htmlFor="faculty">Faculty</label>
                        <select name="faculty" value={formState.faculty} onChange={handleChange}>
                            <option value="">Select faculty</option>
                            {universities
                                ?.filter(university => university.name === formState.university)
                                ?.map(university =>
                                    university.faculties.map(faculty => (
                                        <option key={faculty.facultyName} value={faculty.facultyName}>
                                            {faculty.facultyName}
                                        </option>
                                    ))
                                )
                            }

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
