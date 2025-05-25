import axios from "axios";
import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";


function Piecharts() {
    const [acctData, setacctData] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token");

        const acctDetails = async () => {
            try {
                const response = await axios.get("https://rizzpay.onrender.com/api/v1/account/acctdetails", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setacctData(response.data.account);
                    console.log("Account details fetched successfully:", response.data.account);
                }
                else {
                    console.log("Error fetching account details");
                }
            }
            catch (error) {
                console.log("Error fetching account details:", error);
            }
        }

        acctDetails();
    }, [])
    const data = [
        { name: "Received", value: acctData ? acctData.totalReceived : 0 },
        { name: "Sent", value: acctData ? acctData.totalSent : 0 },
        { name: "Deposit", value: acctData ? acctData.totalDeposited : 0 },
    ];
    const COLORS = ["#EFA00B", "#A88FAC", "#3943B7",];

    return (
        <div className="w-full h-64">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        dataKey="value"
                        nameKey="name"
                        outerRadius={90}
                        fill="#8884d8"
                        label
                    >
                        {data.map((_, index) => {
                            return <Cell key={index} fill={COLORS[index % COLORS.length]} />;
                        })}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" align="center" height={3} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Piecharts;