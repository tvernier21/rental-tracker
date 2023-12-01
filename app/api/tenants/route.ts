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
    const { data: tenants, error } = await supabase
        .from("tenants")
        .select("*")
        .eq("user_id", userId);

    if (error) {
        throw new Error(error.message);
    }

    // format data
    const formattedTenants = tenants.map((tenant) => {
        return {
            key: tenant.id,
            name: tenant.name,
            email: tenant.email,
            phone: tenant.phone,
            avatar_pathname: tenant.avatar_pathname,
            edit: false,
        };
    });

    return NextResponse.json(formattedTenants);
};

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
    