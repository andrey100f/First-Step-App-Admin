import { useEffect, useState } from "react";

import styles from "../utils/styles/EntityModal.module.css"
import {UniversityProps} from "./UniversityProps.tsx";
import {addUniversity, deleteUniversity, getAllUniversities, updateUniversity} from "./UniversityApi.tsx";
import {UniversityTable} from "./UniversityTable.tsx";
import {UniversityModal} from "./UniversityModal.tsx";

/**
 * Componenta principală pentru gestionarea universităților.
 * @constructor
 */
export function University() {
    const [open, setOpen] = useState(false);
    const [universities, setUniversities] = useState<UniversityProps[]>([]);
    const [universityToEdit, setUniversityToEdit] = useState<null | number>(null);
    const token = localStorage.getItem("loginToken");

    /**
     * Efect secundar pentru a verifica dacă utilizatorul este autentificat.
     */
    useEffect(() => {
        if(token === "") {
            window.location.href = "/login";
        }
    }, [token]);

    /**
     * Efect secundar pentru a încărca lista de universități la încărcarea componentei.
     */
    useEffect(() => {
        const getUniversities = async () => {
            const res = await getAllUniversities(token!);
            setUniversities(res);
        }

        getUniversities()
    }, []);

    /**
     * Funcție pentru gestionarea ștergerii unei universități.
     * @param universityId - ID-ul universității de șters
     */
    const handleDeleteUniversity = async (universityId: number) => {
        await deleteUniversity(universityId, token!);
        alert("University deleted successfully!!");
        window.location.href = "/universities";
    };

    /**
     * Funcție pentru gestionarea submiterii unei universități.
     * @param universityToSubmit - Datele universității de trimis la server
     */
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

    /**
     * Funcție pentru gestionarea editării unei universități.
     * @param index - Indexul universității de editat
     */
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
