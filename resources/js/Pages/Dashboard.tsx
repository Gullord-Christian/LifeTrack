import TodoList from "@/Components/ToDoList";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-4">
                <div>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Dashboard
                    </h2>
                </div>
                <div className="py-10">
                    <TodoList />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
