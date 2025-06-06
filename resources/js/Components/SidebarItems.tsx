import {
    Home,
    Activity,
    Volleyball,
    Dumbbell,
    LandPlot,
    DollarSign,
    Moon,
    ClipboardList,
    Calendar,
    StickyNote,
    Briefcase,
    Footprints,
    LayoutDashboard,
} from "lucide-react";
import { ReactNode } from "react";

export interface SidebarItem {
    label: string;
    icon?: ReactNode;
    route?: string;
    children?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
    {
        label: "Home",
        route: "dashboard",
        icon: <Home className="w-5 h-5" />,
    },
    {
        label: "Active",
        icon: <Activity className="w-5 h-5" />,
        children: [
            { label: "Running", route: "active.running", icon: <Footprints /> },
            { label: "Weights", route: "active.lifting", icon: <Dumbbell /> },
            {
                label: "Hoops",
                route: "active.basketball",
                icon: <Volleyball />,
            },
        ],
    },
    { label: "Golf", route: "golf", icon: <LandPlot className="w-5 h-5" /> },
    {
        label: "Budgeting",
        route: "budgeting",
        icon: <DollarSign className="w-5 h-5" />,
    },
    { label: "Sleep", route: "sleep", icon: <Moon className="w-5 h-5" /> },
    {
        label: "Habits",
        route: "habits",
        icon: <ClipboardList className="w-5 h-5" />,
    },
    {
        label: "Calendar",
        route: "calendar",
        icon: <Calendar className="w-5 h-5" />,
    },
    {
        label: "Notes/Ideas",
        route: "notes",
        icon: <StickyNote className="w-5 h-5" />,
    },
    {
        label: "Job Tracking",
        route: "job-tracking",
        icon: <Briefcase className="w-5 h-5" />,
    },
    {
        label: "Project Overview",
        route: "project-overview",
        icon: <LayoutDashboard className="w-5 h-5" />,
    },
];
