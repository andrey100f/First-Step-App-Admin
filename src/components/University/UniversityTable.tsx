import styles from "../utils/styles/EntityTable.module.css";
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs";
import {UniversityProps} from "./UniversityProps.tsx";

interface UniversityTableProps {
    universities: UniversityProps[];
    deleteUniversity: (universityId: number) => void;
    editUniversity: (index: number, universityId: number) => void;
}

export function UniversityTable({universities,  deleteUniversity, editUniversity}: UniversityTableProps) {
    return (
        <section className={styles.EntityTable}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>UniversityId</th>
                    <th>Name</th>
                    <th>Img</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {universities?.map(((university, index) => {
                    return <tr key={university.universityId}>
                        <td>{university.universityId}</td>
                        <td>{university.name}</td>
                        <td>{university.img}</td>
                        <td>
                                <span className={styles.actions}>
                                    <BsFillTrashFill className={styles.deleteBtn} onClick={() => deleteUniversity(university.universityId)} />
                                    <BsFillPencilFill onClick={() => editUniversity(index + 1, university.universityId)} />
                                </span>
                        </td>
                    </tr>
                }))}
                </tbody>
            </table>
        </section>
    )
}
