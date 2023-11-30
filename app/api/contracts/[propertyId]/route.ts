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
        .eq("property_id", propertyId);

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
