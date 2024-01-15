import styles from "../styles/EntityModal.module.css";
import {useEffect, useState} from "react";
import {LocationProps} from "./LocationProps.tsx";

const initialState = {
    name: "",
    type: "",
    latitude: 0,
    longitude: 0,
    img: "",
    description: "",
    site: ""
}

interface LocationModalProps {
    closeModal: () => void;
    onSubmit: (event: LocationProps) => void;
    defaultValue: LocationProps
}

export function LocationModal({closeModal, onSubmit, defaultValue}: LocationModalProps) {
    const [formState, setFormState] = useState<LocationProps>(defaultValue || initialState);
    const [errors, setErrors] = useState("");

    useEffect(() => {
        setFormState({
            ...formState,
        });
    }, []);

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
        console.log(formState);
        if(formState.name && formState.type && formState.latitude && formState.longitude && formState.img &&
            formState.description && formState.site) {
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
                        <label htmlFor="type">Location Type</label>
                        <select name="type" value={formState.type} onChange={handleChange}>
                            <option value="">Select location type</option>
                            <option value="Club">Club</option>
                            <option value="Cafenea">Cafenea</option>
                            <option value="Restaurant">Restaurant</option>
                        </select>
                    </section>

                    <section className={styles.entityFormGroup}>
                        <label htmlFor="latitude">Latitude</label>
                        <input type="number" name="latitude" value={formState.latitude} onChange={handleChange} />
                    </section>

                    <section className={styles.entityFormGroup}>
                        <label htmlFor="longitude">Longitude</label>
                        <input type="number" name="longitude" value={formState.longitude} onChange={handleChange} />
                    </section>

                    <section className={styles.entityFormGroup}>
                        <label htmlFor="img">Location Img</label>
                        <input type="text" name="img" value={formState.img} onChange={handleChange} />
                    </section>

                    <section className={styles.entityFormGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" value={formState.description} onChange={handleChange} />
                    </section>

                    <section className={styles.entityFormGroup}>
                        <label htmlFor="site">Location Site</label>
                        <input type="text" name="site" value={formState.site} onChange={handleChange} />
                    </section>

                    {errors &&
                        <section className={styles.error}>{`Please include ${errors}`}</section>}

                    <button className={styles.submitButton} type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            </section>
        </section>
    )
}
