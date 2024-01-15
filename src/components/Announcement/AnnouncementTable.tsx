import styles from "../styles/EntityTable.module.css";
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs";
import {AnnouncementProps} from "./AnnouncementProps.tsx";

interface AnnouncementTableProps {
    announcements: AnnouncementProps[];
    deleteAnnouncement: (announcementId: number) => void;
    editAnnouncement: (index: number, announcementId: number) => void;
}

export function AnnouncementTable({announcements,  deleteAnnouncement, editAnnouncement}: AnnouncementTableProps) {
    return (
        <section className={styles.EntityTable}>
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
                    {announcements?.map(((announcement, index) => {
                        return <tr key={announcement.announcementId}>
                            <td>{announcement.announcementId}</td>
                            <td>{announcement.title}</td>
                            <td>{announcement.text}</td>
                            <td>{announcement.faculty}</td>
                            <td>{announcement.university}</td>
                            <td>{announcement.url}</td>
                            <td>
                                <span className={styles.actions}>
                                    <BsFillTrashFill className={styles.deleteBtn} onClick={() => deleteAnnouncement(announcement.announcementId)} />
                                    <BsFillPencilFill onClick={() => editAnnouncement(index + 1, announcement.announcementId)} />
                                </span>
                            </td>
                        </tr>
                    }))}
                </tbody>
            </table>
        </section>
    )
}
