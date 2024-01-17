import {useEffect, useState} from "react";
import {LocationProps} from "./LocationProps.tsx";
import {addLocation, deleteLocation, getAllLocations, updateLocation} from "./LocationApi.tsx";

import styles from "../utils/styles/EntityModal.module.css"
import {LocationTable} from "./LocationTable.tsx";
import {LocationModal} from "./LocationModal.tsx";

/**
 * Componenta pentru gestionarea locațiilor
 * @constructor
 */
export function Location() {
    const [open, setOpen] = useState(false);
    const [locations, setLocations] = useState<LocationProps[]>([]);
    const [locationToEdit, setLocationToEdit] = useState<null | number>(null);
    const token = localStorage.getItem("loginToken");

    /**
     * Efect lateral pentru a verifica token-ul la încărcarea componentei
     */
    useEffect(() => {
        if(token === "") {
            window.location.href = "/login";
        }
    }, [token]);

    /**
     * Efect lateral pentru a obține locațiile la încărcarea componentei
     */
    useEffect(() => {
        const getLocations = async () => {
            const res = await getAllLocations(token!);
            setLocations(res);
        }

        getLocations()
    }, []);

    /**
     * Funcție pentru ștergerea unei locații
     * @param locationId - ID-ul locației de șters
     */
    const handleDeleteLocation = async (locationId: number) => {
        await deleteLocation(locationId, token!);
        alert("Location deleted successfully!!");
        window.location.href = "/locations";
    };

    /**
     * Funcție pentru gestionarea adăugării și actualizării unei locații
     * @param locationToSubmit - Locația de adăugat sau actualizat
     */
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

    /**
     * Funcție pentru gestionarea editării unei locații
     * @param index - Indexul locației de editat
     */
    const handleEditLocation = (index: number) => {
        setLocationToEdit(index);
        setOpen(true);
    }

    /**
     * Renderează butonul de adăugare, tabela de locații și modalul pentru adăugare/editare
     */
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
