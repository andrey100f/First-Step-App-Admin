import {AnnouncementProps} from "./AnnouncementProps.tsx";
import axios from "axios";
import {adminUrl, securityConfig} from "../utils";

export const getAllAnnouncements: (token: string) => Promise<AnnouncementProps[]> = async (token) => {
    try {
        const res = await axios.get(`${adminUrl}/announcements`, securityConfig(token));
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export const addAnnouncement: (announcementToAdd: AnnouncementProps, token: string) => Promise<AnnouncementProps> = async (announcementToAdd, token) => {
    try {
        const res = await axios.post(`${adminUrl}/announcements`, announcementToAdd, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const updateAnnouncement: (announcementId: number, announcementToUpdate: AnnouncementProps, token: string) => Promise<AnnouncementProps> = async (announcementId, announcementToUpdate, token) => {
    try {
        const res = await axios.put(`${adminUrl}/announcements/${announcementId}`, announcementToUpdate, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const deleteAnnouncement: (announcementId: number, token: string) => Promise<AnnouncementProps> = async (announcementId, token) => {
    try {
        const res = await axios.delete(`${adminUrl}/announcements/${announcementId}`, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}
