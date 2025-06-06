import { useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { SleepCycleType } from "./SleepUtils";

interface Props {
    onClose: () => void;
    onSave: () => void;
}

const sleepCycleTypes: SleepCycleType[] = ["Awake", "REM", "Light", "Deep"];

export default function SleepForm({ onClose, onSave }: Props) {
    const [form, setForm] = useState({
        date: format(new Date(), "yyyy-MM-dd"),
        bed_time: "",
        wake_time: "",
        sleep_score: "",
        actualSleep: { hours: "", minutes: "" },
        cycles: {
            Awake: { hours: "", minutes: "" },
            REM: { hours: "", minutes: "" },
            Light: { hours: "", minutes: "" },
            Deep: { hours: "", minutes: "" },
        },
        notes: "",
    });

    const getMinutes = (hours: string, minutes: string) =>
        parseInt(hours || "0") * 60 + parseInt(minutes || "0");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            date: form.date,
            bed_time: form.bed_time,
            wake_time: form.wake_time,
            actual_sleep_minutes: getMinutes(
                form.actualSleep.hours,
                form.actualSleep.minutes
            ),
            sleep_score: parseInt(form.sleep_score),
            notes: form.notes,
            awake_minutes: getMinutes(
                form.cycles.Awake.hours,
                form.cycles.Awake.minutes
            ),
            rem_minutes: getMinutes(
                form.cycles.REM.hours,
                form.cycles.REM.minutes
            ),
            light_minutes: getMinutes(
                form.cycles.Light.hours,
                form.cycles.Light.minutes
            ),
            deep_minutes: getMinutes(
                form.cycles.Deep.hours,
                form.cycles.Deep.minutes
            ),
        };

        try {
            await axios.post("/api/sleep", payload);
            onSave();
            onClose();
        } catch (err) {
            console.error("Failed to save sleep entry", err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 rounded shadow"
        >
            <div>
                <label className="block text-sm font-medium">Date</label>
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="mt-1 w-full border px-3 py-2 rounded"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">
                        Bed Time
                    </label>
                    <input
                        type="time"
                        name="bed_time"
                        value={form.bed_time}
                        onChange={(e) =>
                            setForm({ ...form, bed_time: e.target.value })
                        }
                        className="mt-1 w-full border px-3 py-2 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Wake Time
                    </label>
                    <input
                        type="time"
                        name="wake_time"
                        value={form.wake_time}
                        onChange={(e) =>
                            setForm({ ...form, wake_time: e.target.value })
                        }
                        className="mt-1 w-full border px-3 py-2 rounded"
                    />
                </div>
            </div>

            {/* Actual Sleep Duration */}
            <div>
                <label className="block text-sm font-medium">
                    Actual Sleep Duration
                </label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Hours"
                        value={form.actualSleep.hours}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                actualSleep: {
                                    ...form.actualSleep,
                                    hours: e.target.value,
                                },
                            })
                        }
                        className="w-1/2 border px-3 py-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Minutes"
                        value={form.actualSleep.minutes}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                actualSleep: {
                                    ...form.actualSleep,
                                    minutes: e.target.value,
                                },
                            })
                        }
                        className="w-1/2 border px-3 py-2 rounded"
                    />
                </div>
            </div>

            {/* Sleep Score */}
            <div>
                <label className="block text-sm font-medium">Sleep Score</label>
                <input
                    type="number"
                    value={form.sleep_score}
                    onChange={(e) =>
                        setForm({ ...form, sleep_score: e.target.value })
                    }
                    className="mt-1 w-full border px-3 py-2 rounded"
                />
            </div>

            {/* Sleep Cycles */}
            <div>
                <label className="block text-sm font-medium">
                    Sleep Cycles
                </label>
                <div className="grid grid-cols-2 gap-4">
                    {sleepCycleTypes.map((type) => (
                        <div key={type}>
                            <label className="text-xs text-gray-600">
                                {type}
                            </label>
                            <div className="flex gap-2 mt-1">
                                <input
                                    type="number"
                                    placeholder="H"
                                    value={form.cycles[type].hours}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            cycles: {
                                                ...form.cycles,
                                                [type]: {
                                                    ...form.cycles[type],
                                                    hours: e.target.value,
                                                },
                                            },
                                        })
                                    }
                                    className="w-1/2 border px-2 py-1 rounded"
                                />
                                <input
                                    type="number"
                                    placeholder="M"
                                    value={form.cycles[type].minutes}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            cycles: {
                                                ...form.cycles,
                                                [type]: {
                                                    ...form.cycles[type],
                                                    minutes: e.target.value,
                                                },
                                            },
                                        })
                                    }
                                    className="w-1/2 border px-2 py-1 rounded"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Notes */}
            <div>
                <label className="block text-sm font-medium">Notes</label>
                <textarea
                    name="notes"
                    value={form.notes}
                    onChange={(e) =>
                        setForm({ ...form, notes: e.target.value })
                    }
                    className="mt-1 w-full border px-3 py-2 rounded"
                    rows={3}
                />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-lifeTrack-dark text-white rounded hover:bg-lifeTrack-primary"
                >
                    Save
                </button>
            </div>
        </form>
    );
}
