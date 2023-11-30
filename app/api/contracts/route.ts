import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuth } from "@clerk/nextjs/server";

import getSupabaseClient from "@/app/lib/supabaseClient"

export async function GET(req: NextRequest) {
    console.log('general contracts api');
    const { getToken, userId } = getAuth(req);
    if (!userId) {
        throw new Error("Unauthorized (401)");
    };

    const supabaseAccessToken = await getToken({
        template: "supabase",
    });
    const supabase = getSupabaseClient(supabaseAccessToken);
    const { data: contracts } = await supabase
        .from("contracts")
        .select(`
            id,
            properties:property_id (street_address),
            type,
            rent,
            active,
            start_date,
            end_date
        `)
        .eq("user_id", userId)

    const formattedContracts = contracts.map((contract) => {
        return {
            key: contract.id,
            address: contract.properties.street_address,
            type: contract.type,
            rent: contract.rent,
            active: contract.active,
            start_date: contract.start_date,
            end_date: contract.end_date,
        };
    });
    
    return NextResponse.json(formattedContracts);
}
