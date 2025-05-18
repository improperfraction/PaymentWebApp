import { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { darkmodeContext } from "../misc/DarkmodeContext";
import { useNavigate } from "react-router-dom";


function Launch() {
    const navigate = useNavigate();
    const { darkmode } = useContext(darkmodeContext);

    return (
        <div className={`${darkmode ? "dark" : ""}`}>
            <div className="w-screen h-screen transition duration-300 bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-900 ">
                <Navbar />
                <div className="mt-20 lg:mt-44  flex flex-col items-center justify-center">
                    <h1 class=" mb-4 lg:flex flex-row text-5xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                        <div className="text-center dark:text-white">Seamless.</div>
                        <div class="lg:mx-2 mt-2 pb-2 lg:my-0 text-transparent bg-clip-text text-center bg-gradient-to-r to-emerald-600 from-sky-400">Payment.</div>
                        <div className="text-center dark:text-white">Experience.</div>
                    </h1>
                    <p className=" text-center font-medium lg:text-xl dark:text-white">Your all-in-one payment solution with a user-friendly dashboard for effortless financial management.</p>
                    <button onClick={() => {
                        navigate("/signup")
                    }} type="button" class="text-white mt-5 lg:mt-7 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br focus:outline-none font-medium rounded-full text-base lg:text-lg px-5 py-2.5 text-center me-2 mb-2">Get Started</button>
                </div>
            </div>

        </div>
    );
}
export default Launch;