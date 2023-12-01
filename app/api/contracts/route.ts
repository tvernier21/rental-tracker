import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuth } from "@clerk/nextjs/server";

import getSupabaseClient from "@/app/lib/supabaseClient"

export async function GET(req: NextRequest) {
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
            rent,
            pet_deposit,
            pet_refundable,
            start_date,
            end_date
        `)
        .eq("user_id", userId)

    if (!contracts) {
        // return empty array
        return NextResponse.json([]);
    }

    const formattedContracts = contracts.map((contract) => {
        return {
            key: contract.id,
            address: contract.properties[0].street_address,
            rent: contract.rent,
            pet_deposit: contract.pet_deposit,
            pet_refundable: contract.pet_refundable,
            start_date: contract.start_date,
            end_date: contract.end_date,
            edit: false,
        };
    });

    return NextResponse.json(formattedContracts);
}
