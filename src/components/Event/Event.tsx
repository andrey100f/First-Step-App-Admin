import {EventTable} from "./EventTable.tsx";
import {EventModal} from "./EventModal.tsx";

import styles from "../utils/styles/EntityModal.module.css"
import { useEffect, useState } from "react";
import {addEvent, deleteEvent, getAllEvents, updateEvent} from "./EventApi.tsx";
import {EventProps} from "./EventProps.tsx";

/**
 * Componenta principală pentru gestionarea evenimentelor.
 * @constructor
 */
export function Event() {
    const [open, setOpen] = useState(false);
    const [events, setEvents] = useState<EventProps[]>([]);
    const [eventToEdit, setEventToEdit] = useState<null | number>(null);
    const token = localStorage.getItem("loginToken");

    /**
     * Efect secundar pentru verificarea existenței unui token.
     */
    useEffect(() => {
        if(token === "") {
            window.location.href = "/login";
        }
    }, [token]);

    /**
     * Efect secundar pentru obținerea listei de evenimente.
     */
    useEffect(() => {
        const getEvents = async () => {
            const res = await getAllEvents(token!);
            setEvents(res);
        }

        getEvents()
    }, []);

    /**
     * Funcție pentru ștergerea unui eveniment.
     * @param eventId - ID-ul evenimentului de șters.
     */
    const handleDeleteEvent = async (eventId: number) => {
        await deleteEvent(eventId, token!);
        alert("Event deleted successfully!!");
        window.location.href = "/events";
    };

    /**
     * Funcție pentru gestionarea submit-ului evenimentului.
     * @param eventToSubmit - Evenimentul de adăugat sau editat.
     */
    const handleSubmitEvent = async (eventToSubmit: EventProps) => {
        if(eventToEdit == null) {
            await addEvent(eventToSubmit, token!);
        }
        else {
            await updateEvent(eventToSubmit.eventId, eventToSubmit, token!);
        }
        alert("Event submitted successfully!!");
        window.location.href = "/events";
    }

    /**
     * Funcție pentru gestionarea editării unui eveniment.
     * @param index - Indexul evenimentului de editat în listă.
     */
    const handleEditEvent = (index: number) => {
        setEventToEdit(index);
        setOpen(true);
    }

    /**
     * Renderea componentei.
     */
    return (
        <>
            <button className={styles.submitButton} onClick={() => setOpen(true)}>Add</button>
            <EventTable events={events} deleteEvent={handleDeleteEvent} editEvent={handleEditEvent} />
            {open && <EventModal closeModal={() => {
                setOpen(false);
                setEventToEdit(null);
            } } onSubmit={handleSubmitEvent} defaultValue={events?.[eventToEdit! - 1]} />}
        </>
    )
}
