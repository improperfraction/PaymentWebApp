import { useContext, useEffect, useRef, useState } from "react";
import { darkmodeContext } from "../misc/DarkmodeContext";
import { Link, Links, useNavigate } from "react-router-dom";

function SideBar() {

    const navigate = useNavigate();

    const { darkmode, setDarkmode } = useContext(darkmodeContext);
    const [openbar, setOpenbar] = useState(false);

    const barRef = useRef(null);

    useEffect(() => {
        const clickOutside = (e) => {
            if (barRef.current && !barRef.current.contains(e.target)) {
                setOpenbar(false);
            }
        }
        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        }
    }, [setOpenbar]);

    return (
        <div className={`${darkmode ? "dark" : ""}`}>
            <div ref={barRef}>
                <nav class="fixed top-0 z-50 w-full bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-700 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <div class="px-3 py-3 lg:px-5 lg:pl-3">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center justify-start rtl:justify-end">
                                <button onClick={() => {
                                    setOpenbar(!openbar);

                                }} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                    <span class="sr-only">Open sidebar</span>
                                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                    </svg>
                                </button>
                                <Link to={"/"} class="flex ms-2 md:me-24">
                                    <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 me-3" alt="RizzPay Logo" />
                                    <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">RizzPay</span>
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
                        </div>
                    </div>
                </nav>
                <aside id="logo-sidebar" class={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform duration-200 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${openbar ? 'translate-x-0' : '-translate-x-full'}`} aria-label="Sidebar">
                    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-700">
                        <ul class="space-y-2  font-medium">
                            <li>
                                <Link to={"/dashboard"} class="flex items-center p-2 focus:bg-gray-200 dark:focus:bg-gray-800 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 group">
                                    <svg class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                    </svg>
                                    <span class="ms-3">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/transfer"} class="flex items-center p-2 focus:bg-gray-200 dark:focus:bg-gray-800 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" >
                                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                    </svg>

                                    <span class="flex-1 ms-3 whitespace-nowrap">Transfer</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/history"} class="flex items-center p-2 focus:bg-gray-200 dark:focus:bg-gray-800 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" >
                                        <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                                        <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
                                    </svg>
                                    <span class="flex-1 ms-3 whitespace-nowrap">History</span>
                                </Link>
                            </li>
                            <li>
                                <button onClick={() => {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("userFnmae");
                                    localStorage.removeItem("userLname");
                                    navigate("/");

                                }} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" >
                                        <path d="M9.97.97a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 0 1-1.06-1.06l3-3ZM9.75 6.75v6a.75.75 0 0 0 1.5 0v-6h3a3 3 0 0 1 3 3v7.5a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3v-7.5a3 3 0 0 1 3-3h3Z" />
                                        <path d="M7.151 21.75a2.999 2.999 0 0 0 2.599 1.5h7.5a3 3 0 0 0 3-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 0 1-4.5 4.5H7.151Z" />
                                    </svg>
                                    <span class="flex-1 ms-3 whitespace-nowrap">Sign out</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default SideBar;