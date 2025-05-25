import { useContext, useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { darkmodeContext } from "../misc/DarkmodeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TransTable from "../components/Transfercard";


function Transfer() {

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
                    const response = await axios.get("https://rizzpay.onrender.com/api/v1/account/balance", {
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
                            <div className=" flex lg:flex-row flex-col flex-1 rounded-2xl">
                                <div className="mr-4 mb-4">
                                    <div className="lg:h-[235px] text-center mt-4 mr-0 lg:mr-3 lg:mt-0 h-[60px] w-full rounded-2xl flex items-center justify-center">
                                        <h1 className="text-xl text-left lg:text-3xl text-black dark:text-white font-bold">
                                            <p>Manage Your Wallet.</p>
                                            <p>Transfer with Ease.</p>
                                        </h1>
                                    </div>
                                     <div className="lg:h-[235px] mt-4 lg:mt-0 pt-6 lg:pt-8 pl-5 h-[180px] w-full lg:w-[400px] flex flex-col justify-content  rounded-2xl text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl">
                                        <h1 className="text-xl lg:text-3xl font-bold">
                                            Balance
                                        </h1>
                                        <h1 className="text-3xl lg:text-5xl mt-8 lg:mt-10 font-extrabold">
                                            &#x20B9;  {balance}
                                        </h1>
                                        <h3 className="mt-1 lg:mt-5 ml-0 lg:ml-1 text-base lg:text-lg text-gray-200">
                                            Walled ID: {walletId}
                                        </h3>
                                    </div>

                                    <div className="lg:h-[235px] hidden lg:block mt-4 pt-6 lg:pt-8 pl-8 h-[180px] w-full flex-col items-center justify-content rounded-2xl bg-gray-200 dark:bg-gray-800">
                                        <h1 className="text-2xl mt-2 lg:text-3xl text-black dark:text-white font-bold">
                                            Want to Review Your Transactions?
                                        </h1>
                                        <button onClick={() => navigate("/history")}
                                            className="w-[150px] mt-5 text-white bg-gradient-to-br from-blue-400 to-blue-800 hover:from-blue-500 hover:to-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                            Click here
                                        </button>
                                    </div>
                                </div>
                                <div className="lg:h-auto h-[400px] lg:w-full lg:row-span-3 overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800"><TransTable/></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Transfer;

