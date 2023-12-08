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
    // return id as property_id and street_address from properties table
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
        .order('end_date', { ascending: false });

    if (contracts_error) {
        throw new Error(contracts_error.message);
    }

    if (!contracts) {
        // return empty array
        return NextResponse.json([]);
    }

    const { error: tenant_error, data: tenants } = await supabase
        .from("tenants")
        .select("id, name, email, phone, avatar_pathname")
        .eq("user_id", userId);

    if (tenant_error) {
        throw new Error(tenant_error.message);
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
    return NextResponse.json(formattedContracts || []);
}

export async function POST(req: NextRequest) { 
    const { getToken, userId } = getAuth(req);
    const { 
        property_id,
        tenants,
        start_date,
        end_date,
        rent,
        pet_deposit,
        pet_refundable,
        type,
        id,
    } = await req.json();

    if (!userId) {
        throw new Error("Unauthorized (401)");
    }

    const supabaseAccessToken = await getToken({
        template: "supabase",
    });
    const supabase = getSupabaseClient(supabaseAccessToken);
    // update
    if (id) {
        const { error } = await supabase
            .from("contracts")
            .update({
                property_id: property_id,
                tenants: tenants || [],
                start_date: start_date || null,
                end_date: end_date || null,
                rent: rent || null,
                pet_deposit: pet_deposit || null,
                pet_refundable: pet_refundable || null,
                type: type || null, 
            })
            .eq("id", id);

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json({ success: true });
    }

    const { error } = await supabase
        .from("contracts")
        .insert({
            property_id: property_id,
            tenants: tenants,
            start_date: start_date,
            end_date: end_date,
            rent: rent,
            pet_deposit: pet_deposit,
            pet_refundable: pet_refundable,
            type: type,
            user_id: userId,
        });

    if (error) {
        throw new Error(error.message);
    }

    return NextResponse.json({ success: true });
};