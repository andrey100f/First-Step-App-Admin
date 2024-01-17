import axios from "axios";
import {UniversityProps} from "./UniversityProps.tsx";
import {adminUrl, securityConfig} from "../utils";

/**
 * Obține toate universitățile din server.
 * @param token - Tokenul de autentificare pentru a accesa resursele protejate
 * @returns Promise cu un array de obiecte UniversityProps
 */
export const getAllUniversities: (token: string) => Promise<UniversityProps[]> = async (token) => {
    try {
        const res = await axios.get(`${adminUrl}/universities`, securityConfig(token));
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * Adaugă o nouă universitate pe server.
 * @param universityToAdd - Datele universității de adăugat
 * @param token - Tokenul de autentificare pentru a accesa resursele protejate
 * @returns Promise cu obiectul UniversityProps al universității adăugate
 */
export const addUniversity: (universityToAdd: UniversityProps, token: string) => Promise<UniversityProps> = async (universityToAdd, token) => {
    try {
        const res = await axios.post(`${adminUrl}/universities`, universityToAdd, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * Actualizează o universitate existentă pe server.
 * @param universityId - ID-ul universității de actualizat
 * @param universityToUpdate - Datele actualizate pentru universitate
 * @param token - Tokenul de autentificare pentru a accesa resursele protejate
 * @returns Promise cu obiectul UniversityProps al universității actualizate
 */
export const updateUniversity: (universityId: number, universityToUpdate: UniversityProps, token: string) => Promise<UniversityProps> = async (universityId, universityToUpdate, token) => {
    try {
        const res = await axios.put(`${adminUrl}/universities/${universityId}`, universityToUpdate, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * Șterge o universitate de pe server.
 * @param universityId - ID-ul universității de șters
 * @param token - Tokenul de autentificare pentru a accesa resursele protejate
 * @returns Promise cu obiectul UniversityProps al universității șterse
 */
export const deleteUniversity: (universityId: number, token: string) => Promise<UniversityProps> = async (universityId, token) => {
    try {
        const res = await axios.delete(`${adminUrl}/universities/${universityId}`, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}
