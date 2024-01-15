import axios from "axios";
import {UniversityProps} from "./UniversityProps.tsx";

export const getAllUniversities: () => Promise<UniversityProps[]> = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/admin/universities");
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export const addUniversity: (universityToAdd: UniversityProps) => Promise<UniversityProps> = async (universityToAdd) => {
    try {
        const res = await axios.post("http://localhost:8080/api/admin/universities", universityToAdd);
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export const updateUniversity: (universityId: number, universityToUpdate: UniversityProps) => Promise<UniversityProps> = async (universityId, universityToUpdate) => {
    try {
        const res = await axios.put(`http://localhost:8080/api/admin/universities/${universityId}`, universityToUpdate);
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export const deleteUniversity: (universityId: number) => Promise<UniversityProps> = async (universityId) => {
    try {
        const res = await axios.delete(`http://localhost:8080/api/admin/universities/${universityId}`);
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}
