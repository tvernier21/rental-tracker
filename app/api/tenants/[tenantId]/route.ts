import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuth } from "@clerk/nextjs/server";

import getSupabaseClient from "@/app/lib/supabaseClient"

interface IParams{
    tenantId?: string;
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: IParams }    
) {
    const { getToken, userId } = getAuth(req);
    if (!userId) {
        throw new Error("Unauthorized (401)");
    }

    const { tenantId } = params;
    if (!tenantId) {
        throw new Error("Contract ID is required");
    }

    const supabaseAccessToken = await getToken({
        template: "supabase",
    });
    const supabase = getSupabaseClient(supabaseAccessToken);

    // Check if tenantId exists in tenants
    const { data: tenants } = await supabase
        .from("tenants")
        .select("id")
        .eq("user_id", userId)
        .eq("id", tenantId);

    if (!tenants) {
        throw new Error("Tenant not found");
    }

    // Start by getting all instances of tenantId in the contracts.tenant[] array and deleting them
    // update the contracts table
    const { error: contracts_error, data: contracts } = await supabase
        .from("contracts")
        .select(`
            id,
            tenants
        `)
        .eq("user_id", userId)
    if (contracts_error) {
        throw new Error(contracts_error.message);
    }
    // filter each tenants array from contract.tenants and update contracts
    await Promise.all(contracts.map(async (contract: any) => {
        const updatedTenants = contract.tenants.filter((tenant: string) => tenant !== tenantId);
        const { error } = await supabase
            .from("contracts")
            .update({ tenants: updatedTenants })
            .eq("user_id", userId)
            .eq("id", contract.id);
        
        if (error) {
            throw new Error(error.message);
        }
    }));

    // delete tenant
    const { error: tenant_error } = await supabase
        .from("tenants")
        .delete()
        .eq("user_id", userId)
        .eq("id", tenantId);

    if (tenant_error) {
        throw new Error(tenant_error.message);
    }

    return NextResponse.json({ success: true });
}