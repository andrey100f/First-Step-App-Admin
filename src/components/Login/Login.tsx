import React, {useEffect, useState} from "react";

import styles from "./Login.module.css";
import {login} from "./LoginApi.tsx";

/**
 * Proprietățile pentru componenta de login
 */
interface LoginProps {
    email: string;
    password: string;
}

/**
 * Starea inițială a componentei
 */
const initialState = {
    email: "",
    password: ""
}

/**
 * Componenta pentru pagina de login
 * @constructor
 */
export function Login() {
    const token = localStorage.getItem("loginToken");
    const [formState, setFormState] = useState<LoginProps>(initialState);
    const [errors, setErrors] = useState("");

    /**
     * Efect secundar pentru verificarea existenței unui token.
     * Dacă token-ul există, utilizatorul este redirecționat la pagina "universities".
     */
    useEffect(() => {
        if(token !== "") {
            window.location.href = "/universities";
        }
    }, [token]);

    /**
     * Funcție pentru validarea formularului de login
     */
    const validateForm = () => {
        if(formState.email && formState.password) {
            setErrors("")
            return true;
        }

        const errorFileds = []
        for(const [key, value] of Object.entries(formState)) {
            if(!value) {
                errorFileds.push(key)
            }
        }

        setErrors(errorFileds.join(", "))
        return false;
    }

    /**
     * Funcție pentru gestionarea evenimentului de schimbare a valorilor în formular
     * @param e - Evenimentul de schimbare
     */
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    /**
     * Funcție asincronă pentru gestionarea evenimentului de logare
     * @param e - Evenimentul de click pe butonul de logare
     */
    async function handleLogIn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        if(!validateForm()) {
            return;
        }

        const logInToken = await login(formState.email, formState.password);
        localStorage.setItem("loginToken", logInToken.token);
        window.location.href = "/announcements"
    }

    /**
     * Renderea componentei
     */
    return (
        <section className={styles.loginFormContainer}>
            <section className={styles.loginLogo}>
                <i className="fa fa-key"></i>
            </section>
            <h1 className={styles.loginTitle}>Admin Panel</h1>

            <section className={styles.loginForm}>
                <form>
                    <section className={styles.loginFormGroup}>
                        <label className={styles.loginFormLabel} htmlFor="email">Username</label>
                        <input name="email" value={formState.email} className={styles.loginFormInput} type="text" onChange={handleChange} />
                    </section>

                    <section className={styles.loginFormGroup}>
                        <label className={styles.loginFormLabel} htmlFor="password">Password</label>
                        <input className={styles.loginFormInput} type="password" name="password" value={formState.password} onChange={handleChange} />
                    </section>

                    {errors &&
                        <section className={styles.error}>{`Please include ${errors}`}</section>}

                    <button className={styles.loginButton} type="submit" onClick={e => handleLogIn(e)}>Log In</button>
                </form>
            </section>

        </section>
    )
}
