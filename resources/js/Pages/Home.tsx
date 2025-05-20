import React from "react";

import { Head, Link } from "@inertiajs/react";
import GuestLayout from "../Layouts/GuestLayout";
const Home = () => {
    return (
        <>
            <GuestLayout>
                <Head title="Home" />

                <div className="text-center">
                    <div className="flex justify-center">
                        <img
                            src="/images/life_track_large_logo.png"
                            alt="TrackLife logo"
                            className="h-60 w-60"
                        />
                    </div>
                    <p className="text-lg text-gray-600">
                        Log your runs, track golf stats, and manage your budget
                        all in one place.
                    </p>
                    <div className="mt-6 space-x-4">
                        <Link
                            href="/login"
                            className="px-6 py-2 bg-lifeTrack-dark text-white rounded hover:bg-lifeTrack-primary transition"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="px-6 py-2 bg-lifeTrack-light text-gray-800 rounded hover:bg-lifeTrack-primary transition"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
};

export default Home;
