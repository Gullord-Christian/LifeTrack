import TodoList from "@/Components/ToDoList";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import QuoteOfTheDay from "./QuoteOfTheDay";
import TodayRunWidget from "./TodayRunWidget";
import DashboardCard from "./DashboardCard";
import LastGolfRoundWidget from "../Golf/LastGolfRoundWidget";
import SobrietyTracker from "./SobrietyTracker";

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="">
                <div>{<QuoteOfTheDay />}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DashboardCard className="col-span-2">
                        <SobrietyTracker />
                    </DashboardCard>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                    <DashboardCard>
                        <TodayRunWidget />
                    </DashboardCard>
                    <DashboardCard>
                        <LastGolfRoundWidget />
                    </DashboardCard>
                </div>

                <div className="mt-10">
                    <TodoList />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
