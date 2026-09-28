import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import "./AppLayout.css";

function AppLayout() {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <div className="app-content">
                <Outlet />
            </div>
        </>
    );
}

export default AppLayout;
