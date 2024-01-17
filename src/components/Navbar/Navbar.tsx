import {NavLink, useLocation} from "react-router-dom";

import styles from "./Navbar.module.css";

/**
 * Componenta Navbar pentru navigarea în aplicație.
 * @constructor
 */
export function Navbar() {
    const location = useLocation();
    const isAnnouncementsPage = location.pathname === "/announcements"
    const isUniversitiesPage = location.pathname === "/universities"
    const isFacultiesPage = location.pathname === "/faculties"
    const isLocationsPage = location.pathname === "/locations"
    const isEventsPage = location.pathname === "/events"

    /**
     * Funcție pentru a trata acțiunea de deconectare (logout)
     */
    function handleLogOut() {
        localStorage.setItem("loginToken", "");
        window.location.href = "/login";
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>FirstStepApp</div>
            <menu className={styles.menuList}>
                <li>
                    <NavLink className={`${styles.navbarLink} ${isUniversitiesPage ? styles.selected : ''}`}
                             to="universities">Universities</NavLink>
                </li>

                <li>
                    <NavLink className={`${styles.navbarLink} ${isFacultiesPage ? styles.selected : ''}`}
                             to="faculties">Faculties</NavLink>
                </li>

                <li>
                    <NavLink className={`${styles.navbarLink} ${isAnnouncementsPage ? styles.selected : ''}`}
                             to="announcements">Announcements</NavLink>
                </li>

                <li>
                    <NavLink className={`${styles.navbarLink} ${isLocationsPage ? styles.selected : ''}`}
                             to="locations">Locations</NavLink>
                </li>

                <li>
                    <NavLink className={`${styles.navbarLink} ${isEventsPage ? styles.selected : ''}`}
                             to="events">Events</NavLink>
                </li>

                <li>
                    <NavLink className={styles.logoutLink} to="login" onClick={handleLogOut}>Logout</NavLink>
                </li>
            </menu>
        </nav>
    )
}
