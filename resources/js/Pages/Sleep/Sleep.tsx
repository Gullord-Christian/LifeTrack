import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Sleep() {
    return (
        <AuthenticatedLayout>
            <Head title="Sleep Tracker" />
            <h1 className="text-2xl font-bold">Sleep Tracker</h1>
            <p className="text-gray-600 mt-2">
                This is the sleep tracker page.
            </p>
        </AuthenticatedLayout>
    );
}
