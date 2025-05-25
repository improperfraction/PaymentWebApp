import { useContext, useEffect, useState } from "react";
import { darkmodeContext } from "../misc/DarkmodeContext";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function History() {

    const { darkmode } = useContext(darkmodeContext);
    const navigate = useNavigate();

    if (localStorage.getItem("token") === null) {
        useEffect(() => {
            navigate("/")
        }, []);
        return null;
    }
    else {
        const [transData, setTransData] = useState([]);
        const [message, setMessage] = useState("");
        const [status, setStatus] = useState(200);
        useEffect(() => {

            const token = localStorage.getItem("token");
            const transactionHistory = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/account/transhistory`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    if (response.status === 200) {
                        setTransData(response.data.transactions);
                    }
                    else {
                        setStatus(response.status);
                        setMessage(response.data.message);
                    }
                }
                catch (err) {
                    setStatus(err.response.status);
                    setMessage("Something went wrong, please try again");
                }
            }
            transactionHistory();
        }, [])
        return (
            <div className={`${darkmode ? "dark" : ""}`}>
                <SideBar /> {/* Sidebar stays on left */}
                <div className="flex-1 min-h-screen pt-4 sm:ml-64 flex flex-col"> {/* 2. Main right area */}
                    <div className="p-4 border-2 flex-1 flex flex-col dark:bg-slate-900 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                        {/* Heading Section */}
                        <h2 className="text-2xl text-center ml-0 lg:text-start lg:ml-2 lg:text-4xl text-black dark:text-white font-extrabold">
                            Transaction History
                        </h2>
                        <h3 className="mt-1 lg:mt-2 ml-0 lg:ml-3 text-center lg:text-start text-base lg:text-lg text-blue-950 dark:text-white">
                            View all your past transactions in one place.
                        </h3>
                        <HistoryTable transData={transData} />
                    </div>
                </div>
            </div>
        )
    }
}

function HistoryTable({ transData }) {

    const navigate = useNavigate();
    const [cuPg, setCuPg] = useState(1);
    const recordsPerPage = 8; // Number of records per page

    //calculate the indices for slicing the data
    const indexOfLastRecord = cuPg * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = transData.slice(indexOfFirstRecord, indexOfLastRecord);

    //calculate the total number of pages
    const totalPages = Math.ceil(transData.length / recordsPerPage);

    if (transData.length === 0) {
        return (
            <>
                <div className="h-60 flex flex-col items-center justify-center w-full">
                    <h1 className="mt-4 mb-1 font-semibold text-l lg:text-2xl  text-center text-gray-800 dark:text-gray-100"> Your transaction history is waiting to be filled. Start now! </h1>
                    <button onClick={() => {
                        navigate("/transfer")
                    }} class="w-[150px] mt-3 lg:mt-5 text-white bg-gradient-to-br from-blue-400 to-blue-800 hover:from-blue-500 hover:to-blue-900 font-medium rounded-lg text-sm lg:text-base px-5 py-2.5 text-center">Make payment</button>
                </div>
            </>
        )
    }
    else if (transData.length >= 1) {
        return (
            <div className="w-full mt-4">
                <div className="overflow-x-auto rounded-2xl">
                    <table className="min-w-[700px] w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-200 dark:bg-gray-800">
                            <tr className="text-lg text-center text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600">
                                <th className="text-start px-6 py-4">Name/Business</th>
                                <th className="text-start px-6 py-4">Date</th>
                                <th className="text-start px-6 py-4">Amount</th>
                                <th className="text-start px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-200 divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 text-center">
                            {currentRecords.map((transaction, index) => (
                                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
                                    <td className="py-2 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                                        <div className="px-6 flex flex-row items-center">
                                            <img
                                                src={transaction.avatar}
                                                alt="Avatar"
                                                className="w-12 h-12 lg:w-16 lg:h-16 p-1 bg-slate-300 dark:bg-slate-600 rounded-full mr-3 hidden sm:block"
                                            />
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{transaction.Name}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-start whitespace-nowrap text-sm text-gray-500 dark:text-white">
                                        {transaction.date}
                                    </td>
                                    <td className="px-6 py-4 text-start whitespace-nowrap text-sm text-gray-500 dark:text-white">
                                        ₹ {transaction.amount}
                                    </td>
                                    <td className={`px-6 py-4 text-start whitespace-nowrap font-bold text-sm ${transaction.status === "received" ? "text-green-600" : "text-orange-600"}`}>
                                        {transaction.status.toUpperCase()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <div className="flex overflow-x-auto space-x-2 px-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button key={index} onClick={() => setCuPg(index + 1)} className={`px-4 py-2 rounded-lg ${cuPg === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default History;