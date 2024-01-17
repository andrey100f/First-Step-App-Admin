import styles from "../utils/styles/EntityTable.module.css";
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs";
import {FacultyProps} from "./FacultyProps.tsx";

/**
 * Componenta pentru afișarea unei tabele de facultăți
 */
interface FacultyTableProps {
    faculties: FacultyProps[];
    deleteFaculty: (facultyId: number) => void;
    editFaculty: (index: number, facultyId: number) => void;
}

/**
 * Funcția de reprezentare a tabelei facultăților
 * @param faculties - Lista de facultăți
 * @param deleteFaculty - Funcția de ștergere a unei facultăți
 * @param editFaculty - Funcția de editare a unei facultăți
 * @constructor
 */
export function FacultyTable({faculties,  deleteFaculty, editFaculty}: FacultyTableProps) {
    return (
        <section className={styles.EntityTable}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>FacultyId</th>
                    <th>FacultyName</th>
                    <th>UniversityName</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {faculties?.map(((faculty, index) => {
                    return <tr key={faculty.facultyId}>
                        <td>{faculty.facultyId}</td>
                        <td>{faculty.facultyName}</td>
                        <td>{faculty.universityName}</td>
                        <td>
                                <span className={styles.actions}>
                                    <BsFillTrashFill className={styles.deleteBtn} onClick={() => deleteFaculty(faculty.facultyId)} />
                                    <BsFillPencilFill onClick={() => editFaculty(index + 1, faculty.facultyId)} />
                                </span>
                        </td>
                    </tr>
                }))}
                </tbody>
            </table>
        </section>
    )
}
