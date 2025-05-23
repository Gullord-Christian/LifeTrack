import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { sidebarItems } from "@/Components/SidebarItems";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
    const { url } = usePage();
    const currentPath = url;

    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
    const [openPopupGroup, setOpenPopupGroup] = useState<string | null>(null);

    useEffect(() => {
        if (collapsed) return; // prevent group auto-expansion when collapsed

        const initiallyOpen: Record<string, boolean> = {};
        sidebarItems.forEach((item) => {
            if (
                item.children &&
                item.children.some(
                    (child) =>
                        route(child.route!) === location.origin + currentPath
                )
            ) {
                initiallyOpen[item.label] = true;
            }
        });
        setOpenGroups(initiallyOpen);
    }, [currentPath, collapsed]);

    const toggleGroup = (label: string) => {
        setOpenGroups((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    return (
        <nav className="space-y-2 text-sm overflow-hidden">
            {sidebarItems.map((item) => {
                const isOpen =
                    openGroups[item.label] ??
                    (!collapsed &&
                        item.children?.some(
                            (child) =>
                                route(child.route!) ===
                                location.origin + currentPath
                        ));

                if (item.children) {
                    return (
                        <div key={item.label}>
                            <button
                                onClick={() => {
                                    if (collapsed) {
                                        setOpenPopupGroup(
                                            openPopupGroup === item.label
                                                ? null
                                                : item.label
                                        );
                                    } else {
                                        toggleGroup(item.label);
                                    }
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-2 rounded transition ${
                                    isOpen
                                        ? "text-lifeTrack-primary font-bold bg-gray-100"
                                        : "text-lifeTrack-dark hover:bg-gray-200 hover:text-lifeTrack-primary"
                                } ${
                                    collapsed
                                        ? "justify-center px-0"
                                        : "justify-between"
                                }`}
                                title={collapsed ? item.label : undefined}
                            >
                                {collapsed ? (
                                    <span className="w-8 h-8 flex items-center justify-center mx-1">
                                        {item.icon}
                                    </span>
                                ) : (
                                    <>
                                        <span>{item.label}</span>
                                        {isOpen ? (
                                            <ChevronUp className="w-4 h-4" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4" />
                                        )}
                                    </>
                                )}
                            </button>

                            {collapsed && openPopupGroup === item.label && (
                                <div className="ml-8 mt-1 space-y-1">
                                    {item.children.map((child) => (
                                        <SidebarLink
                                            key={child.label}
                                            href={route(child.route!)}
                                            label={child.label}
                                            currentPath={currentPath}
                                            collapsed={true}
                                            icon={child.icon}
                                        />
                                    ))}
                                </div>
                            )}

                            {/*Render for expanded sidebar */}
                            {!collapsed && isOpen && (
                                <div className="ml-6 mt-1 space-y-1">
                                    {item.children.map((child) => (
                                        <SidebarLink
                                            key={child.label}
                                            href={route(child.route!)}
                                            label={child.label}
                                            currentPath={currentPath}
                                            collapsed={false}
                                            icon={child.icon}
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
                        collapsed={collapsed}
                        icon={collapsed ? item.icon : undefined}
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
    collapsed,
    icon,
}: {
    href: string;
    label: string;
    currentPath: string;
    collapsed: boolean;
    icon?: React.ReactNode;
}) {
    const linkPath = new URL(href).pathname;
    const isActive = currentPath.startsWith(linkPath);
    const shouldHighlight = isActive;

    return (
        <Link
            href={href}
            className={`flex items-center ${
                collapsed ? "justify-center" : "gap-3"
            } py-2 px-4 rounded transition ${
                shouldHighlight
                    ? "text-lifeTrack-primary font-bold bg-gray-100"
                    : "text-lifeTrack-dark hover:bg-gray-200 hover:text-lifeTrack-primary"
            }`}
            title={collapsed ? label : undefined}
        >
            {collapsed ? (
                <span className="w-5 h-5 flex items-center justify-center">
                    {icon}
                </span>
            ) : (
                <span>{label}</span>
            )}
        </Link>
    );
}
