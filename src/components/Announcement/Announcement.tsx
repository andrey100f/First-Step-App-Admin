import {AnnouncementTable} from "./AnnouncementTable/AnnouncementTable.tsx";
import {AnnouncementModal} from "./AnnouncementModal/AnnouncementModal.tsx";

import styles from "./AnnouncementModal/AnnouncementModal.module.css"
import {useState} from "react";

export function Announcement() {
    const [open, setOpen] = useState(false);
    const [announcements, setAnnouncements] = useState([
        {
            announcementId: 1,
            title:"Incasarea taxelor pentru examenele restante din sesiunea de IARNA (inclusiv studentii aflati in prelungire de studii)",
            text: "Plati Examene - Studenti Anii II si III, Masteranzi Anul II! pentru Sesiunea Ianuarie-Februarie 2024",
            faculty: "Facultatea de Matematica si Informatica",
            university: "Universitatea Babes Bolyai",
            url: "https://www.cs.ubbcluj.ro/incasarea-taxelor-pentru-examenele-restante-din-sesiunea-de-iarna-inclusiv-studentii-aflati-in-prelungire-de-studii/"
        },
        {
            announcementId: 2,
            title:"InnoHack – Students Hackathon @ CS InnoHUB",
            text: " Participa la InnoHack: Eveniment de Inovatie si Tehnologie pentru a Transforma Ideilor in Solutii Pratice!",
            faculty: "Facultatea de Matematica si Informatica",
            university: "Universitatea Babes Bolyai",
            url: "https://www.cs.ubbcluj.ro/innohack-students-hackathon-cs-innohub/"
        },
        {
            announcementId: 3,
            title:"Destresiune, editia 2023",
            text: "Evenimentul Destresiune: Weekend distractiv cu activitati tropicale, inclusiv Bingo Muzical, Quiz Night, Q&A, Beerpong, Escape Room, si stand-up.",
            faculty: "Facultatea de Matematica si Informatica",
            university: "Universitatea Babes Bolyai",
            url: "https://www.cs.ubbcluj.ro/destresiune-editia-2023/"
        }
    ]);
    const [announcementToEdit, setAnnouncementToEdit] = useState(null);

    const handleDeleteAnnouncement = (index) => {
        setAnnouncements(announcements.filter((_, idx) => idx !== index));
    };

    const handleSubmit = (newAnnouncement) => {
        announcementToEdit === null
        ? setAnnouncements([...announcements, newAnnouncement])
            : setAnnouncements(
                announcements.map((announcement, index) => {
                    if(index !== announcementToEdit) {
                        return announcement;
                    }
                    else {
                        return newAnnouncement;
                    }
                })
            )
    }

    const handleEditAnnouncement = (index) => {
        setAnnouncementToEdit(index);
        setOpen(true);
    }

    return (
        <>
            <button className={styles.submitButton} onClick={() => setOpen(true)}>Add</button>
            <AnnouncementTable rows={announcements} deleteRow={handleDeleteAnnouncement} editRow={handleEditAnnouncement} />
            {open && <AnnouncementModal closeModal={() => {
                setOpen(false);
                setAnnouncementToEdit(null);
            } } onSubmit={handleSubmit}
                                        defaultValue={announcementToEdit !== null && announcements[announcementToEdit]} />}
        </>
    )
}