import axios from "axios";
import {FacultyProps} from "./FacultyProps.tsx";

export const getAllFaculties: () => Promise<FacultyProps[]> = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/admin/faculties");
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export const addFaculty: (facultyToAdd: FacultyProps) => Promise<FacultyProps> = async (facultyToAdd) => {
    try {
        const res = await axios.post("http://localhost:8080/api/admin/faculties", facultyToAdd);
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export const updateFaculty: (facultyId: number, facultyToUpdate: FacultyProps) => Promise<FacultyProps> = async (facultyId, facultyToUpdate) => {
    try {
        const res = await axios.put(`http://localhost:8080/api/admin/faculties/${facultyId}`, facultyToUpdate);
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export const deleteFaculty: (facultyId: number) => Promise<FacultyProps> = async (facultyId) => {
    try {
        const res = await axios.delete(`http://localhost:8080/api/admin/faculties/${facultyId}`);
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}
