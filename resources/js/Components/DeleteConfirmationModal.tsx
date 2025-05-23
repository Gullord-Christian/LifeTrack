import Modal from "./Modal";

export default function DeleteConfirmModal({
    show,
    onClose,
    onConfirm,
    itemLabel = "this item",
}: {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemLabel?: string;
}) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="sm">
            <div className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Delete Confirmation
                </h2>
                <p className="text-sm text-gray-600">
                    Are you sure you want to delete{" "}
                    <span className="font-medium">{itemLabel}</span>? This
                    action cannot be undone.
                </p>
                <div className="flex justify-end gap-2 pt-4">
                    <button
                        onClick={onClose}
                        className="text-sm px-4 py-2 rounded border hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
}
