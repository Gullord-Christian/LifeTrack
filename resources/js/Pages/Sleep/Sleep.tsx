import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import SleepForm from "./SleepForm";
import { formatMinutes, getSleepScoreCategory } from "./SleepUtils";
import SleepCard from "./SleepCard";
import SleepHistory from "./SleepHistory";
import api from "@/lib/api";

export interface SleepEntry {
    id: number;
    date: string;
    bed_time: string; // datetime
    wake_time: string; // datetime
    time_in_bed_minutes: number;
    actual_sleep_minutes: number;
    sleep_score: number;
    awake_minutes: number;
    rem_minutes: number;
    light_minutes: number;
    deep_minutes: number;
    notes?: string;
}

export default function Sleep() {
    const [sleepData, setSleepData] = useState<SleepEntry[]>([]);
    const [showForm, setShowForm] = useState(false);

    const fetchSleep = async () => {
        try {
            const res = await api.get("/api/sleep");

            if (Array.isArray(res.data)) {
                setSleepData(res.data);
            } else if (res.data?.data && Array.isArray(res.data.data)) {
                setSleepData(res.data.data);
            } else {
                console.error("Unexpected response:", res.data);
                setSleepData([]);
            }
        } catch (error) {
            console.error("Error fetching sleep data:", error);
            setSleepData([]);
        }
    };

    useEffect(() => {
        fetchSleep();
    }, []);

    return (
        <AuthenticatedLayout>
            <Head title="Sleep Tracker" />
            <div className="max-w-5xl mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Sleep Tracker</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-lifeTrack-dark text-white px-4 py-2 rounded hover:bg-lifeTrack-primary"
                    >
                        + Log Sleep
                    </button>
                </div>

                {sleepData.length === 0 ? (
                    <div className="bg-white text-gray-500 italic p-6 rounded shadow">
                        Log your sleep, track trends, and improve your rest.
                    </div>
                ) : (
                    <>
                        <SleepCard sleepData={sleepData} />
                        <SleepHistory sleepData={sleepData} />
                    </>
                )}

                {showForm && (
                    <div className="mt-8">
                        <SleepForm
                            onSave={fetchSleep}
                            onClose={() => {
                                setShowForm(false);
                                fetchSleep();
                            }}
                        />
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
