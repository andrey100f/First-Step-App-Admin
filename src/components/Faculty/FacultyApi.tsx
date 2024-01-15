import axios from "axios";
import {FacultyProps} from "./FacultyProps.tsx";
import {adminUrl, securityConfig} from "../utils";

export const getAllFaculties: (token: string) => Promise<FacultyProps[]> = async (token) => {
    try {
        const res = await axios.get(`${adminUrl}/faculties`, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const addFaculty: (facultyToAdd: FacultyProps, token: string) => Promise<FacultyProps> = async (facultyToAdd, token) => {
    try {
        const res = await axios.post(`${adminUrl}/faculties`, facultyToAdd, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const updateFaculty: (facultyId: number, facultyToUpdate: FacultyProps, token: string) => Promise<FacultyProps> = async (facultyId, facultyToUpdate, token) => {
    try {
        const res = await axios.put(`${adminUrl}/faculties/${facultyId}`, facultyToUpdate, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const deleteFaculty: (facultyId: number, token: string) => Promise<FacultyProps> = async (facultyId, token) => {
    try {
        const res = await axios.delete(`${adminUrl}/faculties/${facultyId}`, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}
