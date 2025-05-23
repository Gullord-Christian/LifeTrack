export default function DashboardCard({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`bg-white shadow-md rounded p-6 border border-gray-200 ${className}`}
        >
            {children}
        </div>
    );
}
