import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

export default function ColorPieChart() {
    // your raw data
    const data = [
        { name: 'Red', value: 30 },
        { name: 'Green', value: 40 },
        { name: 'Yellow', value: 20 },
        { name: 'Blue', value: 10 },
    ];

    // optional: match your slice colors
    const COLORS = ['#f56565', '#48bb78', '#ecc94b', '#4299e1'];

    return (
        // makes it responsive to container size
        <div className="w-full h-64">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {data.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
