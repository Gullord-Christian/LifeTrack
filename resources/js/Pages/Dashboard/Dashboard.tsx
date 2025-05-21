import TodoList from "@/Components/ToDoList";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import QuoteOfTheDay from "./QuoteOfTheDay";

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="">
                <div>{<QuoteOfTheDay />}</div>
                <div>{/* <TodoList /> */}</div>
            </div>
        </AuthenticatedLayout>
    );
}
