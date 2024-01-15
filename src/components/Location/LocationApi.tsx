import axios from "axios";
import {LocationProps} from "./LocationProps.tsx";
import {adminUrl, securityConfig} from "../utils";

export const getAllLocations: (token: string) => Promise<LocationProps[]> = async (token) => {
    try {
        const res = await axios.get(`${adminUrl}/locations`, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const addLocation: (locationToAdd: LocationProps, token: string) => Promise<LocationProps> = async (locationToAdd, token) => {
    try {
        const res = await axios.post(`${adminUrl}/locations`, locationToAdd, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const updateLocation: (locationId: number, locationToUpdate: LocationProps, token: string) => Promise<LocationProps> = async (locationId, locationToUpdate, token) => {
    try {
        const res = await axios.put(`${adminUrl}/locations/${locationId}`, locationToUpdate, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const deleteLocation: (locationId: number, token: string) => Promise<LocationProps> = async (locationId, token) => {
    try {
        const res = await axios.delete(`${adminUrl}/locations/${locationId}`, securityConfig(token));

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}
