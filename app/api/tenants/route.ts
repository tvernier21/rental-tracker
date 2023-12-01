import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuth } from "@clerk/nextjs/server";

import getSupabaseClient from "@/app/lib/supabaseClient"

export async function POST(req: NextRequest) {
    const { getToken, userId } = getAuth(req);
    const { 
        name,
        email,
        phone,
    } = await req.json();

    if (!userId) {
        throw new Error("Unauthorized (401)");
    }

    // generate random integer between 0 and 29 inclusive
    const randomInt = Math.floor(Math.random() * 30);
    const avatar_pathname = `/avatars/AvatarMaker (${randomInt}).png`    
    const supabaseAccessToken = await getToken({
        template: "supabase",
    });
    const supabase = getSupabaseClient(supabaseAccessToken);
    const { error } = await supabase
        .from("tenants")
        .insert({
            name: name,
            email: email,
            phone: phone,
            avatar_pathname: avatar_pathname,
            user_id: userId,
        });

    if (error) {
        throw new Error(error.message);
    }

    return NextResponse.json({ success: true });
};
    