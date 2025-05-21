import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, useState } from "react";
import { PageProps } from "../types/gen";
import Sidebar from "@/Components/Sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
    const { auth } = usePage<PageProps>().props;
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen flex bg-gray-50 text-gray-800">
            {/* Sidebar */}
            <div
                className={`transition-all duration-300 ease-in-out bg-white border-r shadow-md ${
                    collapsed ? "w-24" : "w-64"
                } flex flex-col`}
            >
                <div className="flex items-center justify-between p-4">
                    {collapsed ? (
                        <img
                            src="/images/logo_default.png"
                            alt="Mini Logo"
                            className="h-16 w-16"
                        />
                    ) : (
                        <div className="flex items-center gap-2">
                            <img
                                src="/images/logo_default.png"
                                alt="Logo"
                                className="h-16"
                            />
                            <span className="text-xl font-extrabold text-lifeTrack-dark">
                                <span className="text-lifeTrack-primary">
                                    Life
                                </span>
                                Track
                            </span>
                        </div>
                    )}
                </div>

                <Sidebar collapsed={collapsed} />
                <div className="mt-2 self-end">
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className=" group w-12 h-12 flex items-center justify-center rounded-l-xl bg-gray-100 hover:bg-lifeTrack-dark"
                        title={
                            collapsed ? "Expand Sidebar" : "Collapse Sidebar"
                        }
                    >
                        {collapsed ? (
                            <ChevronRight className="w-5 h-5 items-center text-lifeTrack-dark group-hover:text-lifeTrack-light" />
                        ) : (
                            <ChevronLeft className="w-5 h-5 items-center text-lifeTrack-dark group-hover:text-lifeTrack-light" />
                        )}
                    </button>
                </div>
            </div>

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
