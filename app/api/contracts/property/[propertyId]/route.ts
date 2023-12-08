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

    const { error: contracts_error, data: contracts } = await supabase
        .from("contracts")
        .select(`
            id,
            properties ( id, street_address ),
            rent,
            pet_deposit,
            pet_refundable,
            start_date,
            end_date,
            tenants
        `)
        .eq("user_id", userId)
        .eq("property_id", propertyId)
        .order('end_date', { ascending: false });

    if (contracts_error) {
        throw new Error(contracts_error.message);
    }

    if (!contracts) {
        // return empty array
        return NextResponse.json([]);
    }

    const { error: tenants_error, data: tenants } = await supabase
        .from("tenants")
        .select("id, name, email, phone, avatar_pathname")
        .eq("user_id", userId);

    if (tenants_error) {
        throw new Error(tenants_error.message);
    }

    if (!tenants) {
        // return empty array
        return NextResponse.json([]);
    }

    const formattedContracts: {
        key: string;
        id: string;
        property_id: string;
        address: string;
        rent: string;
        pet_deposit: string;
        pet_refundable: boolean;
        start_date: string;
        end_date: string;
        tenants: string[];
        tenants_info: any[];
        edit: boolean;
    }[] = contracts.map((contract: any) => {
        return {
            key: contract.id,
            id: contract.id,
            property_id: contract.properties.id,
            address: contract.properties.street_address,
            rent: contract.rent as string,
            pet_deposit: contract.pet_deposit as string,
            pet_refundable: contract.pet_refundable as boolean,
            start_date: contract.start_date,
            end_date: contract.end_date,
            tenants: contract.tenants || [],
            tenants_info: contract.tenants.map((tenant_id: string) => {
                const tenant = tenants.find((t: any) => t.id === tenant_id);
                if (!tenant) {
                    return null;
                }
                return {
                    name: tenant.name,
                    email: tenant.email,
                    phone: tenant.phone,
                    avatar_pathname: tenant.avatar_pathname,
                };
            }) || [],
            edit: false,
        };
    });
    
    return NextResponse.json(formattedContracts);
}
