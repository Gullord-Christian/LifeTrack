import { useEffect, useState } from "react";
import axios from "axios";
import {
    formatDuration,
    formatPaceDisplay,
    getZone,
    getTotalMinutes,
} from "../Trackers/Active/Utils/RunUtils";

interface BackendRun {
    id: number;
    date: string;
    duration_minutes: number;
    duration_seconds: number;
    distance: number;
    avg_hr?: number;
    notes?: string;
}

export default function TodayRunWidget() {
    const [run, setRun] = useState<BackendRun | null>(null);

    useEffect(() => {
        axios
            .get("/api/runs/today")
            .then((res) => {
                if (res.data) setRun(res.data);
            })
            .catch(() => {
                setRun(null);
            });
    }, []);

    if (!run) {
        return (
            <div className="bg-white shadow-md rounded p-4 mb-6 border-l-4 border-lifeTrack-primary">
                <h3 className="text-sm text-gray-500 mb-1">Today's Run</h3>
                <p className="text-gray-400 italic">No run logged today</p>
            </div>
        );
    }

    const duration = {
        minutes: run.duration_minutes,
        seconds: run.duration_seconds,
    };
    const durationMinutes = getTotalMinutes(duration);
    const pace = formatPaceDisplay(durationMinutes, run.distance);
    const hrZone = run.avg_hr ? getZone(run.avg_hr) : null;

    return (
        <div className="bg-white shadow-md rounded p-4 mb-6 border-l-4 border-lifeTrack-primary">
            <h3 className="text-sm text-gray-500 mb-1">Today's Run</h3>
            <div className="space-y-1 text-sm">
                <p>
                    <span className="font-semibold">Distance:</span>{" "}
                    {run.distance} mi
                </p>
                <p>
                    <span className="font-semibold">Duration:</span>{" "}
                    {formatDuration(duration)}
                </p>
                <p>
                    <span className="font-semibold">Pace:</span> {pace}
                </p>
                {run.avg_hr && hrZone && (
                    <p>
                        <span className="font-semibold">HR Zone:</span>{" "}
                        <span
                            className={`inline-block px-2 py-1 rounded ${hrZone.color}`}
                        >
                            Zone {hrZone.zone} – {hrZone.label}
                        </span>
                    </p>
                )}
                {run.notes && (
                    <p>
                        <span className="font-semibold">Notes:</span>{" "}
                        {run.notes}
                    </p>
                )}
            </div>
        </div>
    );
}
