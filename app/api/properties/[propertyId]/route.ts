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

    const { data: property } = await supabase
        .from("properties")
        .select("*")
        .eq("user_id", userId)
        .eq("id", propertyId);
    
    return NextResponse.json(property);
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: IParams }    
) {
    const { getToken, userId } = getAuth(req);
    if (!userId) {
        throw new Error("Unauthorized (401)");
    }

    const { propertyId } = params;
    if (!propertyId) {
        throw new Error("Contract ID is required");
    }

    const supabaseAccessToken = await getToken({
        template: "supabase",
    });
    const supabase = getSupabaseClient(supabaseAccessToken);
    const { error } = await supabase
        .from("properties")
        .delete()
        .eq("user_id", userId)
        .eq("id", propertyId);

    if (error) {
        throw new Error(error.message);
    }

    return NextResponse.json({ success: true });
}