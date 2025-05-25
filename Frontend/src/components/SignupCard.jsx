import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupCard() {
    const [email, setEmail] = useState("");
    const [pword, setPword] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [gender, setgender] = useState("");
    const navigate = useNavigate();

    const [status, setStatus] = useState(200);
    const [message, setMessage] = useState("");

    return (
        <>
            <div class="lg:w-full mt-2 w-[330px] mb-3 lg:mb-0 lg:h-[695px]  bg-white rounded-xl lg:rounded-bl-none lg:rounded-tl-none lg:rounded-2xl md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form class="space-y-4 md:space-y-6" onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                            const response = await axios.post("https://rizzpay.onrender.com/api/v1/user/signup", {
                                "email": email,
                                "firstName": firstname,
                                "lastName": lastname,
                                "password": pword,
                                "gender": gender
                            });
                            if (response.status === 200) {
                                localStorage.setItem("token", response.data.token);
                                localStorage.setItem("userFnmae", response.data.user.firstName);
                                localStorage.setItem("userLname", response.data.user.lastName);

                                navigate("/dashboard")
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
                    }}>
                        <div>
                            <label for="firstname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your first name</label>
                            <input type="text" name="firstname" id="firstname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Narendra" required="" onChange={(e) => {
                                setfirstname(e.target.value)
                            }} />
                        </div>
                        <div>
                            <label for="lastname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your last name</label>
                            <input type="text" name="lastname" id="lastname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Gandhi" required="" onChange={(e) => {
                                setlastname(e.target.value)
                            }} />
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                        </div>
                        <div>
                            <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your gender</label>
                            <select name="gender" value={gender} id="gender" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e) => {
                                setgender(e.target.value)
                            }}  >
                                <option value="" disabled selected>Select your gender</option>
                                <option value="male" >Male</option>
                                <option value="female" >Female</option>
                                <option value="other" >Other</option>
                            </select>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e) => {
                                setPword(e.target.value)
                            }} />
                        </div>
                        {/* <button type="submit" class="w-full text-white bg-gradient-to-br from-blue-400 to-blue-800 hover:from-blue-500 hover:to-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                        {status != 200 && <p class="text-sm mt-3 text-center font-semibold text-red-600 dark:text-red-400">
                            {message}
                        </p>}
                        <p class="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <button class="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => {
                                navigate("/signin")
                            }}>Sign in here</button>
                        </p> */}
                        <div>
                            <button type="submit" class="w-full  text-white bg-gradient-to-br from-blue-400 to-blue-800 hover:from-blue-500 hover:to-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                            {status != 200 && <p class="text-sm mt-3 text-center font-semibold text-red-600 dark:text-red-400">
                                {message}
                            </p>}
                            <p class="text-sm mt-4 text-center font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <button class="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => {
                                    navigate("/signin")
                                }}>Sign in here</button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignupCard;