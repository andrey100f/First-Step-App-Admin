import {EventProps} from "./EventProps.tsx";
import axios from "axios";

export const getAllEvents: () => Promise<EventProps[]> = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/admin/events");
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export const addEvent: (eventToAdd: EventProps) => Promise<EventProps> = async (eventToAdd) => {
    try {
        const res = await axios.post("http://localhost:8080/api/admin/events", eventToAdd);
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export const updateEvent: (eventId: number, eventToUpdate: EventProps) => Promise<EventProps> = async (eventId, eventToUpdate) => {
    try {
        const res = await axios.put(`http://localhost:8080/api/admin/events/${eventId}`, eventToUpdate);
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export const deleteEvent: (eventId: number) => Promise<EventProps> = async (eventId) => {
    try {
        const res = await axios.delete(`http://localhost:8080/api/admin/events/${eventId}`);
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}
