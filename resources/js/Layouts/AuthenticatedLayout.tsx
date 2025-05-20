import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import { PageProps } from "../types/gen";
import Sidebar from "@/Components/Sidebar";

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
    const { auth } = usePage<PageProps>().props;

    return (
        <div className="min-h-screen flex bg-gray-50 text-gray-800">
            {/* Sidebar */}
            <aside className="w-80 bg-whitesmoke shadow-md px-6 py-8 flex flex-col">
                <div className="flex items-center space-x-2 mb-8">
                    <img
                        src="/images/logo_default.png"
                        alt="TrackLife logo"
                        className="h-20 auto"
                    />
                    <span className="text-2xl font-extrabold tracking-tight text-lifeTrack-dark">
                        <span className="text-lifeTrack-primary">Life</span>
                        Track
                    </span>
                </div>

                {/* Main navigation */}
                <Sidebar />
            </aside>

            {/* Main content area */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow px-8 py-4 flex justify-end items-center gap-2">
                    <span className="text-sm font-medium">
                        Logged in as: {auth.user.name}
                    </span>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="bg-lifeTrack-dark hover:bg-lifeTrack-primary hover:text-lifeTrack-lightest text-lifeTrack-light px-4 py-2 rounded-xl transition"
                    >
                        Logout
                    </Link>
                </header>

                <main className="flex-1 p-10 bg-gray-100">{children}</main>
            </div>
        </div>
    );
}
