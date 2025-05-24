import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function JobTracking() {
    return (
        <AuthenticatedLayout>
            <Head title="Job Tracker" />
            <h1 className="text-2xl font-bold">Job tracking</h1>
            <p className="text-gray-600 mt-2">This is the Job tracker page.</p>
        </AuthenticatedLayout>
    );
}
