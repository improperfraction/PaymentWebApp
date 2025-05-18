import axios from "axios";
import { useEffect, useState } from "react";


function Test() {
    return (
        <div className="w-full overflow-x-scroll bg-gray-100 p-4">
        <div className="min-w-[800px]">
            <p className="text-lg font-bold">This is a horizontally scrollable div.</p>
            <p>Content inside this div will scroll horizontally if it overflows the container width.</p>
            <p>Try resizing the window to see the horizontal scroll in action.</p>
        </div>
    </div>
    )
}


export default Test;