import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuth } from "@clerk/nextjs/server";

import getSupabaseClient from "@/app/lib/supabaseClient"

export async function GET(req: NextRequest) {
    const { getToken, userId } = getAuth(req);
    if (!userId) {
        throw new Error("Unauthorized (401)");
    } 
    
    const supabaseAccessToken = await getToken({
        template: "supabase",
    });
    const supabase = getSupabaseClient(supabaseAccessToken);
    const { data: properties } = await supabase
        .from("properties")
        .select("*")
        .eq("user_id", userId);
    
    return NextResponse.json(properties);
};
