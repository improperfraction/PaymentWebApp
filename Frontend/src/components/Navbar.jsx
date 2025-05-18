import { useContext, useState } from "react";
import { darkmodeContext } from "../misc/DarkmodeContext";
import { Link } from "react-router-dom";

function Navbar() {

    const { darkmode, setDarkmode } = useContext(darkmodeContext);
    return (
        <>
            <div className={`${darkmode ? "dark" : ""}`}>
                <nav className=" border-b-2 flex flex-row justify-between bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-700 border-gray-300 dark:border-gray-700 transform transition duration-200 ease-in-out">
                    <div className="max-w-screen items-center justify-between p-4">
                        <Link to={"/"} class="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="RizzPay Logo" />
                            <span className="self-center text-2xl font-extrabold whitespace-nowrap transition duration-300 dark:text-white">RizzPay</span>
                        </Link>
                    </div>
                    <button onClick={() => {
                        setDarkmode(!darkmode);
                    }} className="h-full px-2 py-2 mr-4 mt-3 rounded-full transform transition duration-200 ease-in-out bg-gray-400 dark:bg-gray-500">{
                            darkmode ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                </svg>
                        }</button>
                </nav>
            </div>
        </>
    )
}

export default Navbar;