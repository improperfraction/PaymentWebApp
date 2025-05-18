import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SigninCard() {
    const [email, setEmail] = useState("");
    const [pword, setPword] = useState("");
    const [status, setStatus] = useState(200);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    return (
        <>
            <div class="lg:w-full lg:h-[412px] w-[330px] bg-white rounded-xl lg:rounded-bl-none lg:rounded-tl-none lg:rounded-2xl md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                "email": email,
                                "password": pword
                            });
                            if (response.status === 200) {
                                localStorage.setItem("token", response.data.token);
                                localStorage.setItem("userFnmae", response.data.user.firstName);
                                localStorage.setItem("userLname", response.data.user.lastName);
                                navigate("/dashboard")
                            }
                        }
                        catch (err) {
                            setStatus(err.response.status);
                            setMessage(err.response.data.message);
                        }
                    }} class="space-y-4 md:space-y-6">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" onChange={(e) => {
                                setEmail(e.target.value)
                            }} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                        </div>
                        <div className="">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e) => {
                                setPword(e.target.value)
                            }} />
                        </div>
                        <div>
                            <button type="submit" class="w-full  text-white bg-gradient-to-br from-blue-400 to-blue-800 hover:from-blue-500 hover:to-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                            {status != 200 && <p class="text-sm mt-3 text-center font-semibold text-red-600 dark:text-red-400">
                                {message}
                            </p>}
                            <p class="text-sm mt-3 text-center font-light text-gray-500 dark:text-gray-400">
                                Dont have an account? <button onClick={() => {
                                    navigate("/signup")
                                }} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up here</button>
                            </p>
                        </div>

                    </form>

                </div>
            </div>
        </>
    )
}

export default SigninCard;