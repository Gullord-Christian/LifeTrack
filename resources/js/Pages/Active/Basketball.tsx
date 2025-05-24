import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Basketball() {
    return (
        <AuthenticatedLayout>
            <Head title="Basketball Tracker" />
            <h1 className="text-2xl font-bold">Basketball Tracker</h1>
            <p className="text-gray-600 mt-2">
                This is the basketball tracker page.
            </p>
        </AuthenticatedLayout>
    );
}
