import axios from "axios";
import {LocationProps} from "./LocationProps.tsx";
import {adminUrl, securityConfig} from "../utils";

/**
 * Obține toate locațiile din backend folosind un token de autorizare.
 * @param token - Tokenul de autorizare
 * @returns - Promise rezolvată cu un array de obiecte LocationProps
 */
export const getAllLocations: (token: string) => Promise<LocationProps[]> = async (token) => {
    try {
        const res = await axios.get(`${adminUrl}/locations`, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * Adaugă o nouă locație în backend folosind un token de autorizare.
 * @param locationToAdd - Locația de adăugat
 * @param token - Tokenul de autorizare
 * @returns - Promise rezolvată cu obiectul LocationProps al locației adăugate
 */
export const addLocation: (locationToAdd: LocationProps, token: string) => Promise<LocationProps> = async (locationToAdd, token) => {
    try {
        const res = await axios.post(`${adminUrl}/locations`, locationToAdd, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * Actualizează o locație existentă în backend folosind un token de autorizare.
 * @param locationId - ID-ul locației de actualizat
 * @param locationToUpdate - Locația actualizată
 * @param token - Tokenul de autorizare
 * @returns - Promise rezolvată cu obiectul LocationProps al locației actualizate
 */
export const updateLocation: (locationId: number, locationToUpdate: LocationProps, token: string) => Promise<LocationProps> = async (locationId, locationToUpdate, token) => {
    try {
        const res = await axios.put(`${adminUrl}/locations/${locationId}`, locationToUpdate, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * Șterge o locație existentă din backend folosind un token de autorizare.
 * @param locationId - ID-ul locației de șters
 * @param token - Tokenul de autorizare
 * @returns - Promise rezolvată cu obiectul LocationProps al locației șterse
 */
export const deleteLocation: (locationId: number, token: string) => Promise<LocationProps> = async (locationId, token) => {
    try {
        const res = await axios.delete(`${adminUrl}/locations/${locationId}`, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}
