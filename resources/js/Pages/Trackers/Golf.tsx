import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Golf() {
    return (
        <AuthenticatedLayout>
            <Head title="Golf" />
            <h1 className="text-2xl font-bold">Golf Tracker</h1>
            <p className="text-gray-600 mt-2">This is the golf tracker page.</p>
        </AuthenticatedLayout>
    );
}
