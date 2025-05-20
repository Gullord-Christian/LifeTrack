import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Lifting() {
    return (
        <AuthenticatedLayout>
            <Head title="Lifting Tracker" />
            <h1 className="text-2xl font-bold">Lifting Tracker</h1>
            <p className="text-gray-600 mt-2">
                This is the lifting tracker page.
            </p>
        </AuthenticatedLayout>
    );
}
