import styles from "./AnnouncementTable.module.css";
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs";

export function AnnouncementTable({rows, deleteRow, editRow}) {
    return (
        <section className={styles.AnnouncementTable}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>AnnouncementId</th>
                        <th className={styles.expand}>Title</th>
                        <th className={styles.expand}>Text</th>
                        <th>Faculty</th>
                        <th>University</th>
                        <th>Url</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row => {
                        return <tr key={row.announcementId}>
                            <td>{row.announcementId}</td>
                            <td>{row.title}</td>
                            <td>{row.text}</td>
                            <td>{row.faculty}</td>
                            <td>{row.university}</td>
                            <td>{row.url}</td>
                            <td>
                                <span className={styles.actions}>
                                    <BsFillTrashFill className={styles.deleteBtn} onClick={() => deleteRow(row.announcementId)} />
                                    <BsFillPencilFill onClick={() => editRow(row.announcementId)} />
                                </span>
                            </td>
                        </tr>
                    }))}
                </tbody>
            </table>
        </section>
    )
}