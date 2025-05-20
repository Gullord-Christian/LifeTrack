import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { sidebarItems } from "@/Components/SidebarItems";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Sidebar() {
    const { url } = usePage();
    const currentPath = url;

    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const initiallyOpen: Record<string, boolean> = {};
        sidebarItems.forEach((item) => {
            if (
                item.children &&
                item.children.some((child) =>
                    route(child.route!).startsWith(
                        location.origin + currentPath
                    )
                )
            ) {
                initiallyOpen[item.label] = true;
            }
        });
        setOpenGroups(initiallyOpen);
    }, [currentPath]);

    const toggleGroup = (label: string) => {
        setOpenGroups((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    return (
        <nav className="space-y-2 text-sm">
            {sidebarItems.map((item) => {
                const isOpen = openGroups[item.label] ?? false;

                if (item.children) {
                    return (
                        <div key={item.label}>
                            <button
                                onClick={() => toggleGroup(item.label)}
                                className={
                                    "w-full flex items-center justify-between text-left px-4 py-2 rounded transition " +
                                    (isOpen
                                        ? "text-lifeTrack-primary font-bold bg-gray-100"
                                        : "text-lifeTrack-dark hover:bg-gray-200 hover:text-lifeTrack-primary")
                                }
                            >
                                <span>{item.label}</span>
                                {isOpen ? (
                                    <ChevronUp className="w-4 h-4" />
                                ) : (
                                    <ChevronDown className="w-4 h-4" />
                                )}
                            </button>

                            {isOpen && (
                                <div className="ml-6 mt-1 space-y-1">
                                    {item.children.map((child) => (
                                        <SidebarLink
                                            key={child.label}
                                            href={route(child.route!)}
                                            label={child.label}
                                            currentPath={currentPath}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                }

                return (
                    <SidebarLink
                        key={item.label}
                        href={route(item.route!)}
                        label={item.label}
                        currentPath={currentPath}
                    />
                );
            })}
        </nav>
    );
}
function SidebarLink({
    href,
    label,
    currentPath,
}: {
    href: string;
    label: string;
    currentPath: string;
}) {
    const linkPath = new URL(href).pathname;
    const isActive = currentPath.startsWith(linkPath);

    const shouldHighlight = linkPath !== "/dashboard" && isActive;

    return (
        <Link
            href={href}
            className={
                "block py-2 px-4 rounded transition " +
                (shouldHighlight
                    ? "text-lifeTrack-primary font-bold bg-gray-100"
                    : "text-lifeTrack-dark hover:bg-gray-200 hover:text-lifeTrack-primary")
            }
        >
            {label}
        </Link>
    );
}
