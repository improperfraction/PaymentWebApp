import { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { darkmodeContext } from "../misc/DarkmodeContext";
import SigninCard from "../components/SigninCard";
import SigninInfo from "../misc/SigninInfo";
import { useNavigate } from "react-router-dom";

function Signin() {
    const { darkmode } = useContext(darkmodeContext)
    const navigate = useNavigate();

    if (localStorage.getItem("token") != null) {
        useEffect(() => {
            navigate("/")
        }, []);
        return null;
    }
    else {
        return (
            <>
                <div className={`${darkmode ? "dark" : ""}`}>
                    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-900 transition duration-300">
                        <Navbar />
                        <div className="flex-1 flex flex-row justify-center items-center">
                            <SigninInfo />
                            <SigninCard />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Signin;