import { useContext, useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { darkmodeContext } from "../misc/DarkmodeContext";
import Piecharts from "../components/PieChart";
import axios from "axios";
import TransHistory from "../components/Table";
import { useNavigate } from "react-router-dom";


function Dashboard() {

    const navigate = useNavigate();
    const { darkmode } = useContext(darkmodeContext);

    const [balance, setBalance] = useState(0);
    const [walletId, setWalletId] = useState(0);

    if (localStorage.getItem("token") === null) {
        useEffect(() => {
            navigate("/")
        }, []);
        return null;
    }
    else {
        const firstName = localStorage.getItem("userFnmae").charAt(0).toUpperCase() + localStorage.getItem("userFnmae").slice(1);
        useEffect(() => {
            const token = localStorage.getItem("token");

            const getBal = async () => {
                try {
                    const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setBalance(response.data.current_balance);
                    setWalletId(response.data.walletId);

                }
                catch (error) {
                    console.log("Error fetching users:", error);
                }
            }
            getBal();
        }, []);

        return (
            <div className={`${darkmode ? "dark" : ""}`}>
                <div className="flex min-h-screen dark:bg-slate-900"> {/* 1. Flex container */}
                    <SideBar /> {/* Sidebar stays on left */}
                    <div className="flex-1 pt-4 sm:ml-64 flex flex-col"> {/* 2. Main right area */}
                        <div className="p-4 border-2 flex-1 flex flex-col dark:bg-slate-900 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                            {/* Heading Section */}
                            <div className="mb-4">
                                <div className="h-24 rounded-2xl">
                                    <h2 className="text-2xl lg:text-4xl text-black dark:text-white font-extrabold">
                                        Welcome to RizzPay, {firstName}
                                    </h2>
                                    <h3 className="mt-1 lg:mt-2 ml-0 lg:ml-1 text-base lg:text-lg text-blue-950 dark:text-white">
                                        Manage your finances with ease using our secure and user-friendly payment application
                                    </h3>
                                </div>
                            </div>
                            <div className=" flex lg:flex-row flex-col flex-1 rounded-2xl">
                                <div className="mr-4 mb-4">
                                    <div className="lg:h-[235px] mt-4 lg:mt-0 pt-6 lg:pt-8 pl-5 h-[180px] w-full lg:w-[400px] flex flex-col justify-content  rounded-2xl bg-gray-200 dark:bg-gray-800">
                                        <h1 className="text-xl lg:text-3xl text-black dark:text-white font-bold">
                                            Balance
                                        </h1>
                                        <h1 className="text-3xl lg:text-5xl mt-8 lg:mt-14 text-black dark:text-white font-extrabold">
                                            &#x20B9;  {balance}
                                        </h1>
                                        <h3 className="mt-1 lg:mt-2 ml-0 lg:ml-1 text-base lg:text-lg text-gray-500 dark:text-slate-300">
                                            Walled ID: {walletId}
                                        </h3>
                                    </div>
                                    <div className="h-[350px] mt-4 mb-4 pt-6 lg:pt-10 pl-5 w-full lg:w-[400px]  rounded-2xl bg-gray-200 dark:bg-gray-800">
                                        <Piecharts />
                                    </div>
                                    <div className="pt-6 lg:pt-8 pl-5 h-[150px] lg:h-[180px] w-full lg:w-[400px] flex flex-col items-center justify-content rounded-2xl bg-gray-200 dark:bg-gray-800">
                                        <h1 className="text-2xl mt-2 lg:text-3xl text-black dark:text-white  font-bold">
                                            Got someone to pay?
                                        </h1>
                                        <button onClick={()=>{
                                            navigate("/transfer")
                                        }}  class="w-[150px] mt-5 text-white bg-gradient-to-br from-blue-400 to-blue-800 hover:from-blue-500 hover:to-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Make payment</button>
                                    </div>
                                </div>
                                <div className="lg:h-auto h-[450px] lg:w-full lg:row-span-3 overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800"><TransHistory /></div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            // </div >
        );
    }
}

export default Dashboard;
