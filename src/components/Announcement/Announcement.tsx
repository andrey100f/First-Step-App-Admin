import {AnnouncementTable} from "./AnnouncementTable.tsx";
import {AnnouncementModal} from "./AnnouncementModal.tsx";

import styles from "../styles/EntityModal.module.css"
import { useEffect, useState } from "react";
import {addAnnouncement, deleteAnnouncement, getAllAnnouncements, updateAnnouncement} from "./AnnouncementApi.tsx";
import {AnnouncementProps} from "./AnnouncementProps.tsx";

export function Announcement() {
    const [open, setOpen] = useState(false);
    const [announcements, setAnnouncements] = useState<AnnouncementProps[]>([]);
    const [announcementToEdit, setAnnouncementToEdit] = useState<null | number>(0);

    useEffect(() => {
        const getAnnouncements = async () => {
            const res = await getAllAnnouncements();
            setAnnouncements(res);
        }


        getAnnouncements()
    }, []);

    const handleDeleteAnnouncement = async (announcementId: number) => {
        await deleteAnnouncement(announcementId);
        alert("Announcement deleted successfully!!");
        window.location.href = "/announcements";
    };

    const handleSubmit = async (announcementToSubmit: AnnouncementProps) => {
        if(announcementToEdit == null) {
            await addAnnouncement(announcementToSubmit);
        }
        else {
            await updateAnnouncement(announcementToSubmit.announcementId, announcementToSubmit);
        }
        alert("Announcement submitted successfully!!");
        window.location.href = "/announcements";
    }

    const handleEditAnnouncement = (index: number) => {
        setAnnouncementToEdit(index);
        setOpen(true);
    }

    return (
        <>
            <button className={styles.submitButton} onClick={() => setOpen(true)}>Add</button>
            <AnnouncementTable announcements={announcements} deleteAnnouncement={handleDeleteAnnouncement} editAnnouncement={handleEditAnnouncement} />
            {open && <AnnouncementModal closeModal={() => {
                setOpen(false);
                setAnnouncementToEdit(null);
            } } onSubmit={handleSubmit}
                                        defaultValue={announcements?.[announcementToEdit! - 1]} />}
        </>
    )
}
