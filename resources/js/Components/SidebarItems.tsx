export interface SidebarItem {
    label: string;
    route?: string; // Named Laravel route
    children?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
    { label: "Home", route: "dashboard" },
    {
        label: "Active",
        children: [
            { label: "Running", route: "active.running" },
            { label: "Weights", route: "active.lifting" },
            { label: "Hoops", route: "active.basketball" },
        ],
    },
    { label: "Golf", route: "golf" },
    { label: "Budgeting", route: "budgeting" },
    { label: "Sleep", route: "sleep" },
    { label: "Habits", route: "habits" },
    { label: "Calendar", route: "calendar" },
    { label: "Notes/Ideas", route: "notes" },
    { label: "Job Tracking", route: "job-tracking" },
    { label: "Project Overview", route: "project-overview" },
];
