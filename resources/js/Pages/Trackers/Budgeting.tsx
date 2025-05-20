import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Budgeting() {
    return (
        <AuthenticatedLayout>
            <Head title="Budgeting Tracker" />
            <h1 className="text-2xl font-bold">Budgeting Tracker</h1>
            <p className="text-gray-600 mt-2">
                This is the budgeting tracker page.
            </p>
        </AuthenticatedLayout>
    );
}
