import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold">
                        <h1 className="text-lifeTrack-primary">
                            Life
                            <span className="text-lifeTrack-dark">Track</span>
                        </h1>
                    </Link>
                    <nav className="space-x-4">
                        <Link
                            href="/login"
                            className="text-sm text-gray-700 hover:underline"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="text-sm text-gray-700 hover:underline"
                        >
                            Register
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="flex-1 flex mt-40 justify-center px-4">
                {children}
            </main>
        </div>
    );
}
