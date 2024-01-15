import axios from "axios";
import {config, loginUrl} from "../utils";

interface AuthProps {
    token: string;
}

export const login: (email?: string, password?: string) => Promise<AuthProps> = async (email, password) => {
    try {
        const res = await axios.post(loginUrl, {email, password}, config);

        return Promise.resolve(res.data);
    }
    catch (err) {
        return Promise.reject(err);
    }
}
