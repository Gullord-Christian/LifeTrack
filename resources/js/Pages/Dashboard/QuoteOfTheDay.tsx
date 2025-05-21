import { useEffect, useState } from "react";
import axios from "axios";

export default function QuoteOfTheDay() {
    const [quoteText, setQuoteText] = useState<string | null>(null);
    const [quoteAuthor, setQuoteAuthor] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const res = await axios.get("/api/quote-of-the-day/");
                const data = res.data;

                if (data && data[0]) {
                    setQuoteText(data[0].q);
                    setQuoteAuthor(data[0].a);
                }
            } catch (error) {
                console.error("Failed to fetch quote:", error);
                setQuoteText("Keep pushing forward");
                setQuoteAuthor("Unknown");
            }
        };

        fetchQuote();
    }, []);

    return (
        <div className="bg-white shadow-md rounded p-4 mb-6 border-l-4 border-lifeTrack-primary">
            <h3 className="text-sm text-gray-500 mb-1">Quote of the Day</h3>
            {quoteText ? (
                <div>
                    <p className="text-lg font-medium text-gray-700 italic mb-2">
                        “{quoteText}”
                    </p>
                    <p className="text-sm font-semibold text-gray-500 text-right">
                        – {quoteAuthor}
                    </p>
                </div>
            ) : (
                <p className="text-gray-400">Loading...</p>
            )}
        </div>
    );
}
