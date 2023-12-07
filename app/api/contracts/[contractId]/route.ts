import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuth } from "@clerk/nextjs/server";

import getSupabaseClient from "@/app/lib/supabaseClient"

interface IParams{
    contractId?: string;
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: IParams }    
) {
    const { getToken, userId } = getAuth(req);
    if (!userId) {
        throw new Error("Unauthorized (401)");
    }

    const { contractId } = params;
    if (!contractId) {
        throw new Error("Contract ID is required");
    }

    const supabaseAccessToken = await getToken({
        template: "supabase",
    });
    const supabase = getSupabaseClient(supabaseAccessToken);
    const { error } = await supabase
        .from("contracts")
        .delete()
        .eq("user_id", userId)
        .eq("id", contractId);

    if (error) {
        throw new Error(error.message);
    }

    return NextResponse.json({ success: true });
}