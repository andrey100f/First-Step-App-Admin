import styles from "../utils/styles/EntityModal.module.css";
import {useEffect, useState} from "react";
import {FacultyProps} from "./FacultyProps.tsx";
import {UniversityProps} from "../University/UniversityProps.tsx";
import {getAllUniversities} from "../University/UniversityApi.tsx";

interface FacultyModalProps {
    closeModal: () => void;
    onSubmit: (university: FacultyProps) => void;
    defaultValue: FacultyProps;
}

const initialState = {
    universityName: "",
    facultyName: "",
}

export function FacultyModal({closeModal, onSubmit, defaultValue}: FacultyModalProps) {
    const [formState, setFormState] = useState(defaultValue || initialState);
    const [errors, setErrors] = useState("");
    const [universities, setUniversities] = useState<UniversityProps[]>([]);
    const token = localStorage.getItem("loginToken");

    useEffect(() => {
        const getUniversities = async () => {
            const res = await getAllUniversities(token!);
            setUniversities(res);
        }


        getUniversities()
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
