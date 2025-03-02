import { useState, useEffect, useRef } from "react";

const useTriviaData = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const subscribed = useRef(false);

    useEffect(() => {
        const pullData = async () => {
            setLoading(true);
            try {
                const resp = await fetch(
                    "https://kbc-backend.netlify.app/.netlify/functions/TriviaApi"
                );
                if (!resp.ok) {
                    const errorData = await resp.json();
                    throw new Error(
                        errorData.error || "Unknown error occurred"
                    );
                }
                const respData = await resp.json();
                setData(respData);
            } catch (error) {
                console.log("Error calling Trivia API:", error.message);
            } finally {
                setLoading(false);
            }
        };

        if (!subscribed.current) {
            subscribed.current = true;
            pullData();
        }

        return () => {
            setData([]);
            subscribed.current = false;
        };
    }, []);

    return { loading, data };
};

export default useTriviaData;
