import {AnnouncementTable} from "./AnnouncementTable/AnnouncementTable.tsx";
import {AnnouncementModal} from "./AnnouncementModal/AnnouncementModal.tsx";

import styles from "./AnnouncementModal/AnnouncementModal.module.css"
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
        // setAnnouncements(announcements.filter((_, idx) => idx !== index));
    };

    const handleSubmit = () => {
        // announcementToEdit === null
        // ? setAnnouncements([...announcements, newAnnouncement])
        //     : setAnnouncements(
        //         announcements.map((announcement, index) => {
        //             if(index !== announcementToEdit) {
        //                 return announcement;
        //             }
        //             else {
        //                 return newAnnouncement;
        //             }
        //         })
        //     )
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