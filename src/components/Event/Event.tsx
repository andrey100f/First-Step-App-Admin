import {EventTable} from "./EventTable.tsx";
import {EventModal} from "./EventModal.tsx";

import styles from "../styles/EntityModal.module.css"
import { useEffect, useState } from "react";
import {addEvent, deleteEvent, getAllEvents, updateEvent} from "./EventApi.tsx";
import {EventProps} from "./EventProps.tsx";

export function Event() {
    const [open, setOpen] = useState(false);
    const [events, setEvents] = useState<EventProps[]>([]);
    const [eventToEdit, setEventToEdit] = useState<null | number>(null);

    useEffect(() => {
        const getEvents = async () => {
            const res = await getAllEvents();
            setEvents(res);
        }


        getEvents()
    }, []);

    const handleDeleteEvent = async (eventId: number) => {
        await deleteEvent(eventId);
        alert("Event deleted successfully!!");
        window.location.href = "/events";
    };

    const handleSubmitEvent = async (eventToSubmit: EventProps) => {
        if(eventToEdit == null) {
            await addEvent(eventToSubmit);
        }
        else {
            await updateEvent(eventToSubmit.eventId, eventToSubmit);
        }
        alert("Event submitted successfully!!");
        window.location.href = "/events";
    }

    const handleEditEvent = (index: number) => {
        setEventToEdit(index);
        setOpen(true);
    }

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