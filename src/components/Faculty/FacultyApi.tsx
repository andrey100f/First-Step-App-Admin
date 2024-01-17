import axios from "axios";
import {FacultyProps} from "./FacultyProps.tsx";
import {adminUrl, securityConfig} from "../utils";

/**
 * Obține toate facultățile.
 * @param token - Token-ul de autentificare.
 * @returns Promise care conține un array de obiecte FacultyProps.
 */
export const getAllFaculties: (token: string) => Promise<FacultyProps[]> = async (token) => {
    try {
        const res = await axios.get(`${adminUrl}/faculties`, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * Adaugă o facultate nouă.
 * @param facultyToAdd - Informații despre facultatea de adăugat.
 * @param token - Token-ul de autentificare.
 * @returns Promise care conține obiectul FacultyProps adăugat.
 */
export const addFaculty: (facultyToAdd: FacultyProps, token: string) => Promise<FacultyProps> = async (facultyToAdd, token) => {
    try {
        const res = await axios.post(`${adminUrl}/faculties`, facultyToAdd, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * Actualizează informațiile unei facultăți existente.
 * @param facultyId - ID-ul facultății de actualizat.
 * @param facultyToUpdate - Noile informații despre facultate.
 * @param token - Token-ul de autentificare.
 * @returns Promise care conține obiectul FacultyProps actualizat.
 */
export const updateFaculty: (facultyId: number, facultyToUpdate: FacultyProps, token: string) => Promise<FacultyProps> = async (facultyId, facultyToUpdate, token) => {
    try {
        const res = await axios.put(`${adminUrl}/faculties/${facultyId}`, facultyToUpdate, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * Șterge o facultate după ID-ul acesteia.
 * @param facultyId - ID-ul facultății de șters.
 * @param token - Token-ul de autentificare.
 * @returns Promise care conține obiectul FacultyProps șters.
 */
export const deleteFaculty: (facultyId: number, token: string) => Promise<FacultyProps> = async (facultyId, token) => {
    try {
        const res = await axios.delete(`${adminUrl}/faculties/${facultyId}`, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}
