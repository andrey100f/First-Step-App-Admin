import styles from "../utils/styles/EntityModal.module.css";
import {useEffect, useState} from "react";
import {EventProps} from "./EventProps.tsx";
import {formatDate} from "../utils";
import {LocationProps} from "../Location/LocationProps.tsx";
import {getAllLocations} from "../Location/LocationApi.tsx";

// Starea inițială a formularului
const initialState = {
    name: "",
    description: "",
    participants: 0,
    locationName: "",
    eventDate: "2024-01-14"
}

/**
 * Proprietățile componentei EventModal.
 */
interface EventModalProps {
    closeModal: () => void;
    onSubmit: (event: EventProps) => void;
    defaultValue: EventProps
}

/**
 * Componenta pentru afișarea unui modal pentru evenimente.
 * @param closeModal - Funcție pentru închiderea modalului.
 * @param onSubmit - Funcție pentru a trimite datele evenimentului la submit.
 * @param defaultValue - Valoare implicită pentru inițializarea formularului.
 */
export function EventModal({closeModal, onSubmit, defaultValue}: EventModalProps) {
    const [formState, setFormState] = useState<EventProps>(defaultValue || initialState);
    const [errors, setErrors] = useState("");
    const [locations, setLocations] = useState<LocationProps[]>([]);
    const token = localStorage.getItem("loginToken");

    /**
     * Efect pentru a formata data inițială a evenimentului la încărcarea componentei.
     */
    useEffect(() => {
        setFormState({
            ...formState,
            eventDate: formatDate(formState.eventDate)
        });
    }, []);

    /**
     * Efect pentru a obține lista de locații la încărcarea componentei.
     */
    useEffect(() => {
        const getLocations = async () => {
            const res = await getAllLocations(token!);
            setLocations(res);
        }


        getLocations()
    }, []);


    /**
     * Funcție pentru a actualiza starea formularului la modificarea valorilor.
     * @param e - Evenimentul de schimbare a valorii unui câmp de input.
     */
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    /**
     * Funcție pentru a actualiza data evenimentului la schimbarea valorii câmpului de data.
     * @param e - Evenimentul de schimbare a valorii câmpului de data.
     */
    const handleChangeDate = (e) => {
        setFormState({
            ...formState,
            eventDate: e.target.value
        })
    }

    /**
     * Funcție pentru a gestiona submit-ul formularului.
     * @param e - Evenimentul de submit al formularului.
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
        if(formState.name && formState.description && formState.participants && formState.locationName) {
            setErrors("");
            return true
        }

        const errorFields = [];

        for(const [key, value] of Object.entries(formState)) {
            if(!value) {
                errorFields.push(key)
            }
        }

        setErrors(errorFields.join(", "))

        return false;
    }

    /**
     * Renderează componenta EventModal.
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
                        <input type="text" name="name" value={formState.name} onChange={handleChange} />
                    </section>

                    <section className={styles.entityFormGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" value={formState.description} onChange={handleChange} />
                    </section>

                    <section className={styles.entityFormGroup}>
                        <label htmlFor="participants">Participants</label>
                        <input type="number" name="participants" value={formState.participants} onChange={handleChange} />
                    </section>

                    <section className={styles.entityFormGroup}>
                        <label htmlFor="locationName">Location</label>
                        <select name="locationName" value={formState.locationName} onChange={handleChange}>
                            <option value="">Select location</option>
                            {locations?.map(location => {
                                return (<option value={location.name}>{location.name}</option>)
                            })}
                        </select>
                    </section>

                    <section className={styles.entityFormGroup}>
                        <label htmlFor="eventDate">Date</label>
                        <input type="date" name="eventDate" value={formatDate(formState.eventDate)} onChange={handleChangeDate}/>
                    </section>

                    {errors &&
                        <section className={styles.error}>{`Please include ${errors}`}</section>}

                    <button className={styles.submitButton} type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            </section>
        </section>
    )
}
