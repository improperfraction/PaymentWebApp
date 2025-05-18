import axios from "axios";
import { set } from "mongoose";
import { useEffect, useState } from "react";

function TransTable() {

    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(200);
    const [search, setSearch] = useState("");
    const [mCard, setmCard] = useState(false);
    const [selectedUser, setselectedUser] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");
        const transactionHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/account/bulk?filter=${search}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setUsers(response.data.users);
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
    }, [search])

    return (
        <>
            <div className="mt-4 text-lg lg:text-2xl lg:mt-8 font-semibold lg:font-bold text-center text-black dark:text-white">
                Available users
            </div>
            <div class="mt-3 flex items-center lg:w-[600px] mx-2 lg:mx-auto">
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                    <input onChange={(e) => {
                        setSearch(e.target.value);
                    }} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search user..." required />
                </div>
                <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span class="sr-only">Search</span>
                </button>
            </div>
            <SMTable users={users} mCard={mCard} setmCard={setmCard} selectedUser={selectedUser} setselectedUser={setselectedUser} />
            <LGTable users={users} mCard={mCard} setmCard={setmCard} selectedUser={selectedUser} setselectedUser={setselectedUser} />

            {mCard && selectedUser && (<MoneyCard setmCard={setmCard} mCard={setmCard} selectedUser firstName={selectedUser.firstName} lastName={selectedUser.lastName} userId={selectedUser.userId} avatar={selectedUser.avatar}></MoneyCard>)}
        </>
    )
}

function SMTable({ users, mCard, setmCard, setselectedUser }) {
    return (
        <div className="lg:hidden">
            <div className="mt-3 lg:mt-5 flex flex-row items-center justify-center">
                <table className="w-full lg:w-2/3 divide-y divide-gray-200 dark:divide-gray-700">
                    <tbody className="bg-gray-200 divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 text-center ">
                        {users.slice(0,4).map((user, index) => {
                            return (
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
                                    <td className=" py-2 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                                        <div className=" flex flex-row items-center justify-start ml-2 ">
                                            <img src={user.avatar} alt="Avatar" className="w-12 h-12 lg:w-16 lg:h-16 p-1 bg-slate-300 dark:bg-slate-600 rounded-full mr-3" />
                                            <div className="flex flex-col">
                                                <p className="text-center pt-2  whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white" >{user.firstName[0].toUpperCase()+ user.firstName.slice(1,)} {user.lastName[0].toUpperCase()+ user.lastName.slice(1,)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="items-center relative group">
                                        <button className="px-2 py-2 bg-slate-100 dark:bg-slate-600 dark:hover:bg-slate-800 hover:bg-slate-200 rounded-full" onClick={() => {
                                            setmCard(!mCard);
                                            setselectedUser({
                                                firstName: user.firstName,
                                                lastName: user.lastName,
                                                userId: user._id,
                                                avatar: user.avatar
                                            })
                                        }} type="button">
                                            <svg className="w-6 h-6 lg:w-8 lg:h-8" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M61.06 2.93974C60.8633 2.74408 60.6161 2.60685 60.346 2.54329C60.0759 2.47974 59.7934 2.49235 59.53 2.57974L3.53004 21.2397C3.25136 21.3373 3.00767 21.5149 2.82951 21.7504C2.65134 21.9858 2.54662 22.2686 2.52847 22.5633C2.51032 22.858 2.57954 23.1515 2.72747 23.407C2.87539 23.6625 3.09544 23.8687 3.36004 23.9997L28.21 35.7897L40 60.6397C40.1209 60.8959 40.3118 61.1127 40.5507 61.2649C40.7896 61.4171 41.0668 61.4985 41.35 61.4997H41.44C41.7371 61.4836 42.0227 61.38 42.2611 61.2021C42.4995 61.0242 42.68 60.7799 42.78 60.4997L61.44 4.49974C61.531 4.23043 61.5436 3.9408 61.4763 3.66461C61.4091 3.38842 61.2647 3.13703 61.06 2.93974V2.93974Z" fill="#97CCEF"></path>
                                                <path d="M60.79 2.71988C60.5015 2.54438 60.1624 2.47069 59.827 2.51057C59.4917 2.55045 59.1794 2.70161 58.94 2.93988L28.29 33.5799C28.0688 33.8029 27.9222 34.089 27.8703 34.3988C27.8184 34.7086 27.8637 35.0269 28 35.3099L40 60.6399C40.1216 60.8976 40.3141 61.1154 40.5549 61.2677C40.7958 61.42 41.0751 61.5005 41.36 61.4999H41.45C41.746 61.4844 42.0307 61.381 42.2676 61.2028C42.5045 61.0247 42.6829 60.78 42.78 60.4999L61.45 4.49988C61.5622 4.17259 61.5577 3.81658 61.4374 3.49219C61.3172 3.16779 61.0884 2.89495 60.79 2.71988V2.71988Z" fill="#0099D6"></path>
                                            </svg>
                                            {/* Tooltip */}
                                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">Send money</div>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function LGTable({ users, mCard, setmCard, setselectedUser }) {
    return (
        <div className="hidden lg:block">
            <div className=" mt-3 lg:mt-5 flex flex-row items-center justify-center">
                <table className="w-full lg:w-2/3 divide-y divide-gray-200 dark:divide-gray-700">
                    <tbody className="bg-gray-200 divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 text-center ">
                        {users.slice(0,8).map((user, index) => {
                            return (
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
                                    <td className=" py-2 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                                        <div className=" flex flex-row items-center justify-start ml-2 ">
                                            <img src={user.avatar} alt="Avatar" className="w-12 h-12 lg:w-16 lg:h-16 p-1 bg-slate-300 dark:bg-slate-600 rounded-full mr-3" />
                                            <div className="flex flex-col">
                                                <p className="text-center pt-2  whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white" >{user.firstName[0].toUpperCase()+ user.firstName.slice(1,)} {user.lastName[0].toUpperCase()+ user.lastName.slice(1,)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="items-center relative group">
                                        <button className="px-2 py-2 bg-slate-100 dark:bg-slate-600 dark:hover:bg-slate-800 hover:bg-slate-200 rounded-full" onClick={() => {
                                            setmCard(!mCard);
                                            setselectedUser({
                                                firstName: user.firstName,
                                                lastName: user.lastName,
                                                userId: user._id,
                                                avatar: user.avatar
                                            })
                                        }} type="button">
                                            <svg className="w-6 h-6 lg:w-8 lg:h-8" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M61.06 2.93974C60.8633 2.74408 60.6161 2.60685 60.346 2.54329C60.0759 2.47974 59.7934 2.49235 59.53 2.57974L3.53004 21.2397C3.25136 21.3373 3.00767 21.5149 2.82951 21.7504C2.65134 21.9858 2.54662 22.2686 2.52847 22.5633C2.51032 22.858 2.57954 23.1515 2.72747 23.407C2.87539 23.6625 3.09544 23.8687 3.36004 23.9997L28.21 35.7897L40 60.6397C40.1209 60.8959 40.3118 61.1127 40.5507 61.2649C40.7896 61.4171 41.0668 61.4985 41.35 61.4997H41.44C41.7371 61.4836 42.0227 61.38 42.2611 61.2021C42.4995 61.0242 42.68 60.7799 42.78 60.4997L61.44 4.49974C61.531 4.23043 61.5436 3.9408 61.4763 3.66461C61.4091 3.38842 61.2647 3.13703 61.06 2.93974V2.93974Z" fill="#97CCEF"></path>
                                                <path d="M60.79 2.71988C60.5015 2.54438 60.1624 2.47069 59.827 2.51057C59.4917 2.55045 59.1794 2.70161 58.94 2.93988L28.29 33.5799C28.0688 33.8029 27.9222 34.089 27.8703 34.3988C27.8184 34.7086 27.8637 35.0269 28 35.3099L40 60.6399C40.1216 60.8976 40.3141 61.1154 40.5549 61.2677C40.7958 61.42 41.0751 61.5005 41.36 61.4999H41.45C41.746 61.4844 42.0307 61.381 42.2676 61.2028C42.5045 61.0247 42.6829 60.78 42.78 60.4999L61.45 4.49988C61.5622 4.17259 61.5577 3.81658 61.4374 3.49219C61.3172 3.16779 61.0884 2.89495 60.79 2.71988V2.71988Z" fill="#0099D6"></path>
                                            </svg>
                                            {/* Tooltip */}
                                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">Send money</div>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function MoneyCard({ firstName, lastName, userId, avatar, setmCard, mCard }) {
    const token = localStorage.getItem("token");
    const [amt, setAmt] = useState('');
    const [status, setStatus] = useState(200);
    const [message, setMessage] = useState("");
    return (
        <div className="w-screen h-screen fixed inset-0 bg-black bg-opacity-20 z-50 flex flex-row items-center justify-center">
            <div class="w-full mx-6 lg:mx-0 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-4 dark:bg-gray-700 dark:border-gray-700">
                <form class="" onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                        const response = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                            to: userId,
                            amount: amt
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });

                        if (response.status === 200) {
                            setMessage(response.data.message);
                        }
                        else {
                            setMessage(response.data.message);
                        }
                    }
                    catch (err) {
                        setStatus(err.response.status);
                        setMessage(err.response.data.error);
                    }
                    finally {
                        setAmt('');
                        setTimeout(() => {
                            setmCard(!mCard);
                        }, 2000);
                    }
                }} action="#">
                    <div className="flex flex-row justify-end text-black dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {
                            setmCard(!mCard)
                        }} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </div>
                    <h5 class="text-2xl text-center font-bold text-gray-900 dark:text-white">Send Money</h5>
                    <div className="flex flex-col items-center justify-center mt-6">
                        <img src={avatar} alt="Avatar" className="w-12 h-12 lg:w-16 lg:h-16 p-1 bg-slate-300 dark:bg-slate-600 rounded-full mr-3" />
                        <p className="text-black dark:text-white font-semibold text-center">{firstName[0].toUpperCase()+firstName.slice(1,)} {lastName[0].toUpperCase()+ lastName.slice(1,)}</p>
                    </div>
                    <div className="mt-5">
                        <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount (₹)</label>
                        <input type="number" value={amt} onChange={(e) => {
                            setAmt(Number(e.target.value));
                        }} name="password" id="password" placeholder="Enter amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <button type="submit" class="w-full mt-6 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">Initiate Transfer</button>
                </form>
                {status != 200 && <p class="text-sm mt-3 text-center font-semibold text-red-600 dark:text-red-400">{message}</p>}
                {status === 200 && <p class="text-sm mt-3 text-center font-semibold text-green-600 dark:text-green-400">{message}</p>}
            </div>
        </div>
    )
}

export default TransTable;