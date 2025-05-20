import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Calendar() {
    return (
        <AuthenticatedLayout>
            <Head title="Budgeting Tracker" />
            <h1 className="text-2xl font-bold">Calendar</h1>
            <p className="text-gray-600 mt-2">This is the calendar page.</p>
        </AuthenticatedLayout>
    );
}
