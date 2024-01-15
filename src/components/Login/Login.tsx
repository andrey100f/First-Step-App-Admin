import React, {useEffect} from "react";

import styles from "./Login.module.css";

export function Login() {
    const token = localStorage.getItem("loginToken");

    useEffect(() => {
        if(token !== "") {
            window.location.href = "/universities";
        }
    }, [token]);

    function handleLogIn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        localStorage.setItem("loginToken", "loggedIn");
        window.location.href = "/announcements"
    }

    return (
        <section className={styles.loginFormContainer}>
            <section className={styles.loginLogo}>
                <i className="fa fa-key"></i>
            </section>
            <h1 className={styles.loginTitle}>Admin Panel</h1>

            <section className={styles.loginForm}>
                <form>
                    <section className={styles.loginFormGroup}>
                        <label className={styles.loginFormLabel} htmlFor="username">Username</label>
                        <input className={styles.loginFormInput} type="text" id="email" />
                    </section>

                    <section className={styles.loginFormGroup}>
                        <label className={styles.loginFormLabel} htmlFor="password">Password</label>
                        <input className={styles.loginFormInput} type="password" id="password" />
                    </section>


                    <button className={styles.loginButton} type="submit" onClick={e => handleLogIn(e)}>Log In</button>
                </form>
            </section>

        </section>
    )
}