import axios from "axios";
import {UniversityProps} from "./UniversityProps.tsx";
import {adminUrl, securityConfig} from "../utils";

export const getAllUniversities: (token: string) => Promise<UniversityProps[]> = async (token) => {
    try {
        const res = await axios.get(`${adminUrl}/universities`, securityConfig(token));
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const addUniversity: (universityToAdd: UniversityProps, token: string) => Promise<UniversityProps> = async (universityToAdd, token) => {
    try {
        const res = await axios.post(`${adminUrl}/universities`, universityToAdd, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const updateUniversity: (universityId: number, universityToUpdate: UniversityProps, token: string) => Promise<UniversityProps> = async (universityId, universityToUpdate, token) => {
    try {
        const res = await axios.put(`${adminUrl}/universities/${universityId}`, universityToUpdate, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const deleteUniversity: (universityId: number, token: string) => Promise<UniversityProps> = async (universityId, token) => {
    try {
        const res = await axios.delete(`${adminUrl}/universities/${universityId}`, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}
