import {AnnouncementTable} from "./AnnouncementTable.tsx";
import {AnnouncementModal} from "./AnnouncementModal.tsx";

import styles from "../styles/EntityModal.module.css"
import { useEffect, useState } from "react";
import {getAnnouncements} from "./AnnouncementApi.tsx";
import {AnnouncementProps} from "./AnnouncementProps.tsx";

export function Announcement() {
    const [open, setOpen] = useState(false);
    const [announcements, setAnnouncements] = useState<AnnouncementProps[]>([]);
    const [announcementToEdit, setAnnouncementToEdit] = useState(0);

    useEffect(() => {
        const getRows = async () => {
            const res = await getAnnouncements();
            setAnnouncements(res);
        }


        getRows()
    }, []);

    const handleDeleteAnnouncement = () => {
        console.log("announcement deleted");
    };

    const handleSubmit = () => {
        console.log("announcement submitted");
    }

    const handleEditAnnouncement = (index: number) => {
        setAnnouncementToEdit(index);
        setOpen(true);
    }

    return (
        <>
            <button className={styles.submitButton} onClick={() => setOpen(true)}>Add</button>
            <AnnouncementTable rows={announcements} deleteRow={handleDeleteAnnouncement} editRow={handleEditAnnouncement} />
            {open && <AnnouncementModal closeModal={() => {
                setOpen(false);
                setAnnouncementToEdit(0);
            } } onSubmit={handleSubmit}
                                        defaultValue={announcementToEdit !== 0 && announcements?.[announcementToEdit]} />}
        </>
    )
}