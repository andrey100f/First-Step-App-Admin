import {AnnouncementProps} from "./AnnouncementProps.tsx";
import axios from "axios";
import {adminUrl, securityConfig} from "../utils";

/**
 * Obține toate anunțurile.
 * @param token - Token-ul de autentificare.
 * @returns Promise<AnnouncementProps[]>
 */
export const getAllAnnouncements: (token: string) => Promise<AnnouncementProps[]> = async (token) => {
    try {
        const res = await axios.get(`${adminUrl}/announcements`, securityConfig(token));
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

/**
 * Adaugă un nou anunț.
 * @param announcementToAdd - Anunțul de adăugat.
 * @param token - Token-ul de autentificare.
 * @returns Promise<AnnouncementProps>
 */
export const addAnnouncement: (announcementToAdd: AnnouncementProps, token: string) => Promise<AnnouncementProps> = async (announcementToAdd, token) => {
    try {
        const res = await axios.post(`${adminUrl}/announcements`, announcementToAdd, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * Actualizează un anunț existent.
 * @param announcementId - ID-ul anunțului de actualizat.
 * @param announcementToUpdate - Datele actualizate ale anunțului.
 * @param token - Token-ul de autentificare.
 * @returns Promise<AnnouncementProps>
 */
export const updateAnnouncement: (announcementId: number, announcementToUpdate: AnnouncementProps, token: string) => Promise<AnnouncementProps> = async (announcementId, announcementToUpdate, token) => {
    try {
        const res = await axios.put(`${adminUrl}/announcements/${announcementId}`, announcementToUpdate, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * Șterge un anunț existent.
 * @param announcementId - ID-ul anunțului de șters.
 * @param token - Token-ul de autentificare.
 * @returns Promise<AnnouncementProps>
 */
export const deleteAnnouncement: (announcementId: number, token: string) => Promise<AnnouncementProps> = async (announcementId, token) => {
    try {
        const res = await axios.delete(`${adminUrl}/announcements/${announcementId}`, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}
