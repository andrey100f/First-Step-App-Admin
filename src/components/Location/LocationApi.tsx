import axios from "axios";
import {LocationProps} from "./LocationProps.tsx";

export const getAllLocations: () => Promise<LocationProps[]> = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/admin/locations");
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export const addLocation: (locationToAdd: LocationProps) => Promise<LocationProps> = async (locationToAdd) => {
    try {
        const res = await axios.post("http://localhost:8080/api/admin/locations", locationToAdd);
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export const updateLocation: (locationId: number, locationToUpdate: LocationProps) => Promise<LocationProps> = async (locationId, locationToUpdate) => {
    try {
        const res = await axios.put(`http://localhost:8080/api/admin/locations/${locationId}`, locationToUpdate);
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export const deleteLocation: (locationId: number) => Promise<LocationProps> = async (locationId) => {
    try {
        const res = await axios.delete(`http://localhost:8080/api/admin/locations/${locationId}`);
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}
