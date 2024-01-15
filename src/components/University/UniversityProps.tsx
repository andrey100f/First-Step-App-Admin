import {FacultyProps} from "../Faculty/FacultyProps.tsx";

export interface UniversityProps {
    universityId: number;
    name: string;
    img: string;
    faculties: FacultyProps[]
}
