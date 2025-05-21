import { useEffect, useState } from "react";
import axios from "axios";

export default function QuoteOfTheDay() {
    const [quote, setQuote] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const res = await axios.get("/api/quote-of-the-day/");
                const data = res.data;
                console.log(data);

                if (data && data[0]) {
                    setQuote(`${data[0].q} – ${data[0].a}`);
                }
            } catch (error) {
                console.error("Failed to fetch quote:", error);
                setQuote("Keep pushing forward – Unknown");
            }
        };

        fetchQuote();
    }, []);

    return (
        <div className="bg-white shadow-md rounded p-4 mb-6 border-l-4 border-lifeTrack-primary">
            <h3 className="text-sm text-gray-500 mb-1">Quote of the Day</h3>
            <p className="text-lg font-medium text-gray-700 italic">
                {quote ? `“${quote}”` : "Loading..."}
            </p>
        </div>
    );
}
