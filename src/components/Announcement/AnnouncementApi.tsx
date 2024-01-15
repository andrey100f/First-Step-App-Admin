import {AnnouncementProps} from "./AnnouncementProps.tsx";
import axios from "axios";
export const getAllAnnouncements: () => Promise<AnnouncementProps[]> = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/admin/announcements");
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export const addAnnouncement: (announcementToAdd: AnnouncementProps) => Promise<AnnouncementProps> = async (announcementToAdd) => {
    try {
        const res = await axios.post("http://localhost:8080/api/admin/announcements", announcementToAdd);
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export const updateAnnouncement: (announcementId: number, announcementToUpdate: AnnouncementProps) => Promise<AnnouncementProps> = async (announcementId, announcementToUpdate) => {
    try {
        const res = await axios.put(`http://localhost:8080/api/admin/announcements/${announcementId}`, announcementToUpdate);
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export const deleteAnnouncement: (announcementId: number) => Promise<AnnouncementProps> = async (announcementId) => {
    try {
        const res = await axios.delete(`http://localhost:8080/api/admin/announcements/${announcementId}`);
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}
