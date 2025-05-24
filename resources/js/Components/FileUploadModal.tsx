import Modal from "@/Components/Modal";
import { useState } from "react";

export default function FileUploadModal({
    show,
    onClose,
    onUpload,
}: {
    show: boolean;
    onClose: () => void;
    onUpload: (file: File) => void;
}) {
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.name.endsWith(".csv")) {
            setError("Please upload a valid .csv file.");
            return;
        }

        setError(null);
        onUpload(file);
        onClose();
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-lg font-bold mb-4">
                    📤 Import Runs from CSV
                </h2>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleChange}
                    className="block w-full border rounded p-2"
                />
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-gray-500 text-sm hover:underline"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
}
