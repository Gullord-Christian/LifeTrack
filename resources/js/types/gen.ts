import { PageProps as InertiaPageProps } from "@inertiajs/core";

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Habit {
    id: number;
    name: string;
    notes?: string;
    frequency: "daily" | "weekly";
    start_date: string;
    streak: number;
    last_completed_at: string | null;
}

export interface PageProps extends InertiaPageProps {
    habits?: Habit[];
    auth?: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
}
