import styles from "../styles/EntityModal.module.css"
import { useEffect, useState } from "react";
import {FacultyProps} from "./FacultyProps.tsx";
import {addFaculty, deleteFaculty, getAllFaculties, updateFaculty} from "./FacultyApi.tsx";
import {FacultyTable} from "./FacultyTable.tsx";
import {FacultyModal} from "./FacultyModal.tsx";

export function Faculty() {
    const [open, setOpen] = useState(false);
    const [faculties, setFaculties] = useState<FacultyProps[]>([]);
    const [facultyToEdit, setFacultyToEdit] = useState<null | number>(null);
    const token = localStorage.getItem("loginToken");

    useEffect(() => {
        if(token === "") {
            window.location.href = "/login";
        }
    }, [token]);

    useEffect(() => {
        const getFaculties = async () => {
            const res = await getAllFaculties();
            setFaculties(res);
        }


        getFaculties()
    }, []);

    const handleDeleteFaculty = async (eventId: number) => {
        await deleteFaculty(eventId);
        alert("Faculty deleted successfully!!");
        window.location.href = "/faculties";
    };

    const handleSubmitFaculty = async (facultyToSubmit: FacultyProps) => {
        if(facultyToEdit == null) {
            await addFaculty(facultyToSubmit);
        }
        else {
            await updateFaculty(facultyToSubmit.facultyId, facultyToSubmit);
        }
        alert("Faculty submitted successfully!!");
        window.location.href = "/faculties";
    }

    const handleEditFaculty = (index: number) => {
        setFacultyToEdit(index);
        setOpen(true);
    }

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
