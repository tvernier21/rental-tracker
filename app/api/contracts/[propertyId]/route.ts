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
            ...properties (
                street_address
            ),
            rent,
            pet_deposit,
            pet_refundable,
            start_date,
            end_date
        `)
        .eq("user_id", userId)
        .eq("property_id", propertyId);

    if (!contracts) {
        // return empty array
        return NextResponse.json([]);
    }

    const formattedContracts: {
        key: string;
        address: string;
        rent: number;
        pet_deposit: number;
        pet_refundable: number;
        start_date: string;
        end_date: string;
        edit: boolean;
    }[] = contracts.map((contract: any) => {
        return {
            key: contract.id,
            address: contract.street_address,
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