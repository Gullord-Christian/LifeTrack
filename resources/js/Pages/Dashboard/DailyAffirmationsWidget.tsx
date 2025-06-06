import { affirmations } from "./affirmations";

export default function DailyAffirmationWidget() {
    const today = new Date().toISOString().slice(0, 10);
    const indexSeed = parseInt(today.replaceAll("-", ""), 10); // 20250604
    const affirmation = affirmations[indexSeed % affirmations.length];

    return (
        <div className="bg-white shadow-md rounded p-4 mb-6 border-l-4 border-lifeTrack-primary">
            <h3 className="text-sm text-gray-500 mb-1">Daily Affirmation</h3>
            {affirmation ? (
                <div>
                    <p className="text-lg font-medium text-gray-700 italic mb-2">
                        “{affirmation}”
                    </p>
                </div>
            ) : (
                <p className="text-gray-400">Loading...</p>
            )}
        </div>
    );
}
