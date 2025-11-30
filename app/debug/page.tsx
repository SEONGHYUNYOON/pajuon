"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function DebugPage() {
    const [session, setSession] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const supabase = createClient();

                // 1. Check Session
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();
                setSession(session);

                if (sessionError) {
                    throw new Error(`Session Error: ${sessionError.message}`);
                }

                if (session?.user) {
                    // 2. Check Profile
                    const { data: profile, error: profileError } = await supabase
                        .from("profiles")
                        .select("*")
                        .eq("id", session.user.id)
                        .maybeSingle();

                    setProfile(profile);

                    if (profileError) {
                        setError(`Profile Error: ${profileError.message}`);
                    }
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Auth Debugger</h1>

            <div className="space-y-4">
                <div className="p-4 border rounded bg-gray-50">
                    <h2 className="font-bold mb-2">Status</h2>
                    <p>Loading: {loading ? "Yes" : "No"}</p>
                    <p className="text-red-500">{error}</p>
                </div>

                <div className="p-4 border rounded bg-gray-50">
                    <h2 className="font-bold mb-2">Session</h2>
                    <pre className="text-xs overflow-auto bg-white p-2 rounded border">
                        {JSON.stringify(session, null, 2)}
                    </pre>
                </div>

                <div className="p-4 border rounded bg-gray-50">
                    <h2 className="font-bold mb-2">Profile</h2>
                    <pre className="text-xs overflow-auto bg-white p-2 rounded border">
                        {JSON.stringify(profile, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
}
