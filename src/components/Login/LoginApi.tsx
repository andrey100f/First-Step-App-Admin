import axios from "axios";
import {config, loginUrl} from "../utils";

/**
 * Interfața pentru obiectul de autentificare
 */
interface AuthProps {
    token: string;
}

/**
 * Funcția de autentificare
 * @param email - Adresa de email pentru autentificare
 * @param password - Parola pentru autentificare
 * @returns Promisiune rezolvată cu obiectul de autentificare sau respinsă cu eroarea
 */
export const login: (email?: string, password?: string) => Promise<AuthProps> = async (email, password) => {
    try {
        const res = await axios.post(loginUrl, {email, password}, config);

        return Promise.resolve(res.data);
    }
    catch (err) {
        return Promise.reject(err);
    }
}
