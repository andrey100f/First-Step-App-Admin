import styles from "../utils/styles/EntityModal.module.css";
import {useEffect, useState} from "react";
import {EventProps} from "./EventProps.tsx";
import {formatDate} from "../utils";
import {LocationProps} from "../Location/LocationProps.tsx";
import {getAllLocations} from "../Location/LocationApi.tsx";

const initialState = {
    name: "",
    description: "",
    participants: 0,
    locationName: "",
    eventDate: "2024-01-14"
}

interface EventModalProps {
    closeModal: () => void;
    onSubmit: (event: EventProps) => void;
    defaultValue: EventProps
}

export function EventModal({closeModal, onSubmit, defaultValue}: EventModalProps) {
    const [formState, setFormState] = useState<EventProps>(defaultValue || initialState);
    const [errors, setErrors] = useState("");
    const [locations, setLocations] = useState<LocationProps[]>([]);
    const token = localStorage.getItem("loginToken");

    useEffect(() => {
        setFormState({
            ...formState,
            eventDate: formatDate(formState.eventDate)
        });
    }, []);

    useEffect(() => {
        const getLocations = async () => {
            const res = await getAllLocations(token!);
            setLocations(res);
        }


        getLocations()
    }, []);


    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeDate = (e) => {
        setFormState({
            ...formState,
            eventDate: e.target.value
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
