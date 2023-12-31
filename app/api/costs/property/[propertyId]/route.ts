import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuth } from "@clerk/nextjs/server";

import getSupabaseClient from "@/app/lib/supabaseClient"

interface IParams{
    propertyId?: string;
}

export async function GET(
    req: NextRequest,
    { params }: { params: IParams }
) {
    const { getToken, userId } = getAuth(req);
    if (!userId) {
        throw new Error("Unauthorized (401)");
    };

    const { propertyId } = params;
    if (!propertyId) {
        throw new Error("Property ID is required");
    }

    const supabaseAccessToken = await getToken({
        template: "supabase",
    });
    const supabase = getSupabaseClient(supabaseAccessToken);
    const { error, data: costs } = await supabase
        .from("costs")
        .select(`
            *,
            ...properties ( street_address )
        `)
        .eq("user_id", userId)
        .eq("property_id", propertyId)
        .order('date', { ascending: false });

    if (error) {
        throw new Error("Database Query Failed");
    }

    if (!costs) {
        // return empty array
        return NextResponse.json([]);
    }
            
    return NextResponse.json(costs);
}