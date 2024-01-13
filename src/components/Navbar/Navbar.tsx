import {NavLink} from "react-router-dom";

import styles from "./Navbar.module.css";

export function Navbar() {
    function handleLogOut() {
        localStorage.setItem("loginToken", "");
        window.location.href = "/login";
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>FirstStepApp</div>
            <menu className={styles.menuList}>
                <li>
                    <NavLink className={styles.navbarLink} to="universities">Universities</NavLink>
                </li>
                <li>
                    <NavLink className={styles.navbarLink} to="faculties">Faculties</NavLink>
                </li>
                <li>
                    <NavLink className={styles.navbarLink} to="announcements">Announcements</NavLink>
                </li>
                <li>
                    <NavLink className={styles.navbarLink} to="locations">Locations</NavLink>
                </li>
                <li>
                    <NavLink className={styles.navbarLink} to="events">Events</NavLink>
                </li>
                <li>
                    <NavLink className={styles.navbarLink} to="login" onClick={handleLogOut}>Logout</NavLink>
                </li>
            </menu>
        </nav>
    )
}