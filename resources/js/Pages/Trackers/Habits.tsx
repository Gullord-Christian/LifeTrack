import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Habits() {
    return (
        <AuthenticatedLayout>
            <Head title="Habits Tracker" />
            <h1 className="text-2xl font-bold">Habits Tracker</h1>
            <p className="text-gray-600 mt-2">
                This is the habits tracker page.
            </p>
        </AuthenticatedLayout>
    );
}
