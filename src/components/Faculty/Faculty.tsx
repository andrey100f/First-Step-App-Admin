import styles from "../utils/styles/EntityModal.module.css"
import { useEffect, useState } from "react";
import {FacultyProps} from "./FacultyProps.tsx";
import {addFaculty, deleteFaculty, getAllFaculties, updateFaculty} from "./FacultyApi.tsx";
import {FacultyTable} from "./FacultyTable.tsx";
import {FacultyModal} from "./FacultyModal.tsx";

/**
 * Componenta pentru gestionarea datelor despre facultăți.
 * @constructor
 */
export function Faculty() {
    const [open, setOpen] = useState(false);
    const [faculties, setFaculties] = useState<FacultyProps[]>([]);
    const [facultyToEdit, setFacultyToEdit] = useState<null | number>(null);
    const token = localStorage.getItem("loginToken");

    /**
     * Verifică dacă utilizatorul este autentificat la nivel global.
     * Dacă nu, îl redirectionează către pagina de autentificare.
     */
    useEffect(() => {
        if(token === "") {
            window.location.href = "/login";
        }
    }, [token]);

    /**
     * Obține lista de facultăți la încărcarea componentei.
     */
    useEffect(() => {
        const getFaculties = async () => {
            const res = await getAllFaculties(token!);
            setFaculties(res);
        }

        getFaculties()
    }, []);

    /**
     * Șterge o facultate după ID-ul acesteia.
     * @param facultyId - ID-ul facultății de șters.
     */
    const handleDeleteFaculty = async (eventId: number) => {
        await deleteFaculty(eventId, token!);
        alert("Faculty deleted successfully!!");
        window.location.href = "/faculties";
    };

    /**
     * Gestionează submiterea unei facultăți.
     * Adaugă sau actualizează facultatea în funcție de existența ID-ului.
     * @param facultyToSubmit - Informații despre facultatea de submitat.
     */
    const handleSubmitFaculty = async (facultyToSubmit: FacultyProps) => {
        if(facultyToEdit == null) {
            await addFaculty(facultyToSubmit, token!);
        }
        else {
            await updateFaculty(facultyToSubmit.facultyId, facultyToSubmit, token!);
        }

        alert("Faculty submitted successfully!!");
        window.location.href = "/faculties";
    }

    /**
     * Deschide modalul de editare pentru o facultate.
     * @param index - Indexul facultății în listă.
     */
    const handleEditFaculty = (index: number) => {
        setFacultyToEdit(index);
        setOpen(true);
    }

    /**
     * Renderează componenta Faculty.
     */
    return (
        <>
            <button className={styles.submitButton} onClick={() => setOpen(true)}>Add</button>
            <FacultyTable faculties={faculties} deleteFaculty={handleDeleteFaculty} editFaculty={handleEditFaculty} />
            {open && <FacultyModal closeModal={() => {
                setOpen(false);
                setFacultyToEdit(null);
            } } onSubmit={handleSubmitFaculty} defaultValue={faculties?.[facultyToEdit! - 1]} />}
        </>
    )
}
