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
    const { error: tenants_error, data: tenants } = await supabase
        .from("tenants")
        .select("*")
        .eq("user_id", userId);

    if (tenants_error) {
        throw new Error(tenants_error.message);
    }

    if (!tenants) {
        // return empty array
        return NextResponse.json([]);
    }

    const { error: contracts_error, data: contracts } = await supabase
        .from("contracts")
        .select("*")
        .eq("user_id", userId)
        .eq("property_id", propertyId);

    if (contracts_error) {
        throw new Error(contracts_error.message);
    }

    if (!contracts) {
        // return empty array
        return NextResponse.json([]);
    }

    // Add null check for contracts
    const tenantIds = contracts?.map((contract) => {
        return contract.tenants;
    }).flat() || [];

    const tenantsInProperty = tenants?.filter((tenant) => {
        return tenantIds.includes(tenant.id);
    }) || [];
    const formattedTenants = tenantsInProperty.map((tenant) => {
        return {
            key: tenant.id,
            id: tenant.id,
            name: tenant.name,
            email: tenant.email,
            phone: tenant.phone,
            avatar_pathname: tenant.avatar_pathname,
            edit: false,
        };
    });

    return NextResponse.json(formattedTenants || []);
}