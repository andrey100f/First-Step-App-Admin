import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navbar} from "./components/Navbar/Navbar.tsx";
import {useEffect, useState} from "react";
import {Login} from "./components/Login/Login.tsx";
import {Announcement} from "./components/Announcement/Announcement.tsx";
import {Event} from "./components/Event/Event.tsx";
import {Location} from "./components/Location/Location.tsx";
import {University} from "./components/University/University.tsx";
import {Faculty} from "./components/Faculty/Faculty.tsx";

function App() {
    const [showNavbar, setShowNavbar] = useState(true);
    const token = localStorage.getItem("loginToken");

    useEffect(() => {
        if(token !== "") {
            setShowNavbar(true);
        }
        else {
            setShowNavbar(false);
        }
    }, [token]);

    return (
        <>
            <BrowserRouter>
                {showNavbar && (
                    <Navbar />
                )}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="universities" element={<University />} />
                    <Route path="faculties" element={<Faculty />} />
                    <Route path="announcements" element={<Announcement />} />
                    <Route path="locations" element={<Location />} />
                    <Route path="events" element={<Event />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App