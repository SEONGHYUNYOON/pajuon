export default function CommunityLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto bg-white min-h-screen shadow-sm">
                {children}
            </div>
        </div>
    );
}
