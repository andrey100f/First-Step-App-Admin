import styles from "../utils/styles/EntityTable.module.css";
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs";
import {LocationProps} from "./LocationProps.tsx";

interface LocationTableProps {
    locations: LocationProps[];
    deleteLocation: (locationId: number) => void;
    editLocation: (index: number, locationId: number) => void;
}

export function LocationTable({locations,  deleteLocation, editLocation}: LocationTableProps) {
    return (
        <section className={styles.EntityTable}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>LocationId</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Img</th>
                    <th>Description</th>
                    <th>Site</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {locations?.map((location, index) => {
                    return (<tr key={location.locationId}>
                            <td>{location.locationId}</td>
                            <td>{location.name}</td>
                            <td>{location.type}</td>
                            <td>{location.latitude}</td>
                            <td>{location.longitude}</td>
                            <td>{location.img}</td>
                            <td>{location.description}</td>
                            <td>{location.site}</td>
                            <td>
                                <span className={styles.actions}>
                                    <BsFillTrashFill className={styles.deleteBtn} onClick={() => deleteLocation(location.locationId)} />
                                    <BsFillPencilFill onClick={() => {
                                        editLocation(index + 1, location.locationId)}
                                    } />
                                </span>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </section>
    )
}
