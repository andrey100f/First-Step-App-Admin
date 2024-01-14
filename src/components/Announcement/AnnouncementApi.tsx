import {AnnouncementProps} from "./AnnouncementProps.tsx";
import axios from "axios";

export const getAnnouncements: () => Promise<AnnouncementProps[]> = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/admin/announcements");
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}