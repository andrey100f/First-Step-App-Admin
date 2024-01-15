import {useEffect, useState} from "react";
import {LocationProps} from "./LocationProps.tsx";
import {addLocation, deleteLocation, getAllLocations, updateLocation} from "./LocationApi.tsx";

import styles from "../styles/EntityModal.module.css"
import {LocationTable} from "./LocationTable.tsx";
import {LocationModal} from "./LocationModal.tsx";

export function Location() {
    const [open, setOpen] = useState(false);
    const [locations, setLocations] = useState<LocationProps[]>([]);
    const [locationToEdit, setLocationToEdit] = useState<null | number>(null);

    useEffect(() => {
        const getLocations = async () => {
            const res = await getAllLocations();
            setLocations(res);
        }


        getLocations()
    }, []);

    const handleDeleteLocation = async (locationId: number) => {
        await deleteLocation(locationId);
        alert("Location deleted successfully!!");
        window.location.href = "/locations";
    };

    const handleSubmitLocation = async (locationToSubmit: LocationProps) => {
        if(locationToEdit == null) {
            await addLocation(locationToSubmit);
        }
        else {
            await updateLocation(locationToSubmit.locationId, locationToSubmit);
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