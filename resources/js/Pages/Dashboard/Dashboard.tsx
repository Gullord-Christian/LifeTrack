import TodoList from "@/Components/ToDoList";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import QuoteOfTheDay from "./QuoteOfTheDay";
import TodayRunWidget from "./TodayRunWidget";
import DashboardCard from "./DashboardCard";

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="">
                <div>{<QuoteOfTheDay />}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <DashboardCard>
                        <TodayRunWidget />
                    </DashboardCard>
                    <DashboardCard>
                        <TodayRunWidget />
                    </DashboardCard>
                    <DashboardCard>
                        <TodayRunWidget />
                    </DashboardCard>
                    <DashboardCard>
                        <TodayRunWidget />
                    </DashboardCard>
                </div>

                <div>{/* <TodoList /> */}</div>
            </div>
        </AuthenticatedLayout>
    );
}
