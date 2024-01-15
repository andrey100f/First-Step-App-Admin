import {EventProps} from "./EventProps.tsx";
import axios from "axios";
import {adminUrl, securityConfig} from "../utils";

export const getAllEvents: (token: string) => Promise<EventProps[]> = async (token) => {
    try {
        const res = await axios.get(`${adminUrl}/events`, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const addEvent: (eventToAdd: EventProps, token: string) => Promise<EventProps> = async (eventToAdd, token) => {
    try {
        const res = await axios.post(`${adminUrl}/events`, eventToAdd, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const updateEvent: (eventId: number, eventToUpdate: EventProps, token: string) => Promise<EventProps> = async (eventId, eventToUpdate, token) => {
    try {
        const res = await axios.put(`${adminUrl}/events/${eventId}`, eventToUpdate, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const deleteEvent: (eventId: number, token: string) => Promise<EventProps> = async (eventId, token) => {
    try {
        const res = await axios.delete(`${adminUrl}/events/${eventId}`, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}
