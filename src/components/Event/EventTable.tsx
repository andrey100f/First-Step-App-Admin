import styles from "../utils/styles/EntityTable.module.css";
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs";
import {EventProps} from "./EventProps.tsx";
import {formatDate} from "../utils";

interface EventTableProps {
    events: EventProps[];
    deleteEvent: (eventId: number) => void;
    editEvent: (index: number, eventId: number) => void;
}

export function EventTable({events,  deleteEvent, editEvent}: EventTableProps) {
    return (
        <section className={styles.EntityTable}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>EventId</th>
                    <th className={styles.expand}>Name</th>
                    <th className={styles.expand}>Description</th>
                    <th>Participants</th>
                    <th>Location</th>
                    <th>EventDate</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {events?.map((event, index) => {
                    return (<tr key={event.eventId}>
                        <td>{event.eventId}</td>
                        <td>{event.name}</td>
                        <td>{event.description}</td>
                        <td>{event.participants}</td>
                        <td>{event.locationName}</td>
                        <td>{formatDate(event.eventDate)}</td>
                        <td>
                                <span className={styles.actions}>
                                    <BsFillTrashFill className={styles.deleteBtn} onClick={() => deleteEvent(event.eventId)} />
                                    <BsFillPencilFill onClick={() => {
                                        editEvent(index + 1, event.eventId)}
                                    } />
                                </span>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </section>
    )
}
