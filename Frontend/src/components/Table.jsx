import axios from "axios";
import { useEffect, useState } from "react";

function TransHistory() {

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

    if (transData.length === 0) {
        return (
            <>
                <div className="flex flex-col items-center justify-center w-full">
                    <h1 className="mt-4 mb-1 font-bold text-xl lg:text-2xl  text-center text-gray-800 dark:text-gray-100"> Your Recent Transactions </h1>
                    <div className="mb-2 flex flex-col items-center justify-center w-3/4 lg:w-1/2 border-b-2 border-gray-400 dark:border-gray-600">
                    </div>
                </div>
                <div className="h-2/3 flex flex-col items-center justify-center w-full">
                    <h1 className="mt-4 mb-1 font-semibold text-l lg:text-2xl  text-center text-gray-800 dark:text-gray-100"> Your transaction history is waiting to be filled. Start now! </h1>
                </div>
            </>
        )
    }
    else if (transData.length >= 1) {
        return (
            <>
                <div className="flex flex-col items-center justify-center w-full">
                    <h1 className="mt-4 mb-1 font-bold text-xl lg:text-2xl  text-center text-gray-800 dark:text-gray-100"> Your Recent Transactions </h1>
                    <div className="mb-2 flex flex-col items-center justify-center w-3/4 lg:w-1/2 border-b-2 border-gray-400 dark:border-gray-600">
                    </div>
                </div>
                <LGTable transData={transData} />
                <SMTable transData={transData} />
            </>
        )
    }
}

function LGTable({ transData }) {
    return (
        <>
            <div className="hidden lg:block">
                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-200 dark:bg-gray-800">
                        <tr className="text-lg text-center text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600">
                            <th className="dark:bg-gray-800 text-start px-6 py-4">Name/Business</th>
                            <th className="dark:bg-gray-800 text-start px-8 py-4">Date</th>
                            <th className="dark:bg-gray-800 py-4 px-2 text-start">Amount</th>
                            <th className="dark:bg-gray-800 py-4 px-4 text-start">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-200 divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 text-center ">
                        {transData.slice(0, 8).map((transaction, index) => {
                            return (
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
                                    <td className=" py-2 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                                        <div className="px-8 flex flex-row items-center justify-start">
                                            <img src={transaction.avatar} alt="Avatar" className="w-16 h-16 p-1 bg-slate-300 dark:bg-slate-600 hidden lg:block rounded-full mr-3" />
                                            <p className="text-center py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white" >{transaction.Name}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 text-start py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">{transaction.date}</td>
                                    <td className="px-6 text-start py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">&#x20B9; {transaction.amount}</td>
                                    <td className={`px-6 text-start py-4 whitespace-nowrap font-bold text-sm ${transaction.status === "received" ? "text-green-600" : "text-orange-600"}`}>{transaction.status.toUpperCase()}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

function SMTable({ transData }) {
    return (
        <>
            <div className="block lg:hidden ">
                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-200 dark:bg-gray-800">
                        <tr className="text-lg text-center text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600">
                            <th className="dark:bg-gray-800 text-center py-4">Name/Business</th>
                            {/* <th className="dark:bg-gray-800 py-4">Date</th> */}
                            <th className="dark:bg-gray-800 py-4">Amount</th>
                            {/* <th className="dark:bg-gray-800 py-4">Status</th> */}
                        </tr>
                    </thead>
                    <tbody className="bg-gray-200 divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 text-center ">
                        {transData.slice(0, 4).map((transaction, index) => {
                            return (
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
                                    <td className=" py-2 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                                        <div className="ml-5 flex flex-row items-center justify-start">
                                            <img src={transaction.avatar} alt="Avatar" className="w-16 h-16 p-1 bg-slate-300 dark:bg-slate-600 rounded-full mr-3" />
                                            <div className="flex flex-col">
                                                <p className="text-center pt-2  whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white" >{transaction.Name}</p>
                                                <p className="text-center pt-1 whitespace-nowrap text-sm font-light text-gray-700 dark:text-gray-300" >{transaction.date}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 font-semibold ${transaction.status === "sent" ? "text-orange-600" : "text-green-600"} whitespace-nowrap text-sm`} >{transaction.status === "sent" ? `- ₹${transaction.amount}` : `+ ₹${transaction.amount}`}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TransHistory;