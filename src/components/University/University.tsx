import { useEffect, useState } from "react";

import styles from "../utils/styles/EntityModal.module.css"
import {UniversityProps} from "./UniversityProps.tsx";
import {addUniversity, deleteUniversity, getAllUniversities, updateUniversity} from "./UniversityApi.tsx";
import {UniversityTable} from "./UniversityTable.tsx";
import {UniversityModal} from "./UniversityModal.tsx";

export function University() {
    const [open, setOpen] = useState(false);
    const [universities, setUniversities] = useState<UniversityProps[]>([]);
    const [universityToEdit, setUniversityToEdit] = useState<null | number>(null);
    const token = localStorage.getItem("loginToken");

    useEffect(() => {
        if(token === "") {
            window.location.href = "/login";
        }
    }, [token]);

    useEffect(() => {
        const getUniversities = async () => {
            const res = await getAllUniversities(token!);
            setUniversities(res);
        }

        getUniversities()
    }, []);

    const handleDeleteUniversity = async (universityId: number) => {
        await deleteUniversity(universityId, token!);
        alert("University deleted successfully!!");
        window.location.href = "/universities";
    };

    const handleSubmit = async (universityToSubmit: UniversityProps) => {
        if(universityToEdit == null) {
            await addUniversity(universityToSubmit, token!);
        }
        else {
            await updateUniversity(universityToSubmit.universityId, universityToSubmit, token!);
        }

        alert("University submitted successfully!!");
        window.location.href = "/universities";
    }

    const handleEditUniversity = (index: number) => {
        setUniversityToEdit(index);
        setOpen(true);
    }

    return (
        <>
            <button className={styles.submitButton} onClick={() => setOpen(true)}>Add</button>
            <UniversityTable universities={universities} deleteUniversity={handleDeleteUniversity} editUniversity={handleEditUniversity} />
            {open && <UniversityModal closeModal={() => {
                setOpen(false);
                setUniversityToEdit(null);
            } } onSubmit={handleSubmit}
                                        defaultValue={universities?.[universityToEdit! - 1]} />}
        </>
    )
}
