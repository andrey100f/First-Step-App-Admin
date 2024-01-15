import {useEffect, useState} from "react";
import {LocationProps} from "./LocationProps.tsx";
import {addLocation, deleteLocation, getAllLocations, updateLocation} from "./LocationApi.tsx";

import styles from "../utils/styles/EntityModal.module.css"
import {LocationTable} from "./LocationTable.tsx";
import {LocationModal} from "./LocationModal.tsx";

export function Location() {
    const [open, setOpen] = useState(false);
    const [locations, setLocations] = useState<LocationProps[]>([]);
    const [locationToEdit, setLocationToEdit] = useState<null | number>(null);
    const token = localStorage.getItem("loginToken");

    useEffect(() => {
        if(token === "") {
            window.location.href = "/login";
        }
    }, [token]);

    useEffect(() => {
        const getLocations = async () => {
            const res = await getAllLocations(token!);
            setLocations(res);
        }

        getLocations()
    }, []);

    const handleDeleteLocation = async (locationId: number) => {
        await deleteLocation(locationId, token!);
        alert("Location deleted successfully!!");
        window.location.href = "/locations";
    };

    const handleSubmitLocation = async (locationToSubmit: LocationProps) => {
        if(locationToEdit == null) {
            await addLocation(locationToSubmit, token!);
        }
        else {
            await updateLocation(locationToSubmit.locationId, locationToSubmit, token!);
        }

        alert("Location submitted successfully!!");
        window.location.href = "/locations";
    }

    const handleEditLocation = (index: number) => {
        setLocationToEdit(index);
        setOpen(true);
    }

    return (
        <>
            <button className={styles.submitButton} onClick={() => setOpen(true)}>Add</button>
            <LocationTable locations={locations} deleteLocation={handleDeleteLocation} editLocation={handleEditLocation} />
            {open && <LocationModal closeModal={() => {
                setOpen(false);
                setLocationToEdit(null);
            } } onSubmit={handleSubmitLocation} defaultValue={locations?.[locationToEdit! - 1]} />}
        </>
    )
}
