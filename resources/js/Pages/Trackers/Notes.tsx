import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Notes() {
    return (
        <AuthenticatedLayout>
            <Head title="Notes Tracker" />
            <h1 className="text-2xl font-bold">Notes Tracker</h1>
            <p className="text-gray-600 mt-2">
                This is the Notes tracker page.
            </p>
        </AuthenticatedLayout>
    );
}
