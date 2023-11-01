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
    const { data: costs } = await supabase
        .from("costs")
        .select("*")
        .eq("user_id", userId);
    
    return NextResponse.json(costs);
}

export async function POST(req: NextRequest) { 
    const { getToken, userId } = getAuth(req);
    const { 
        cost_type, 
        property_id, 
        date, 
        price,
        description, 
        washerdryer, 
        dishwasher, 
        ac, 
        heater, 
        fridge, 
        oven, 
        microwave, 
        hardwood, 
        carpet, 
        tile, 
        kitchen, 
        bathroom, 
        bedroom, 
        paint, 
        windows, 
        cleaning, 
        electricity, 
        water, 
        gas, 
        other
    } = await req.json();

    if (!userId) {
        throw new Error("Unauthorized (401)");
    }
    
    const supabaseAccessToken = await getToken({
        template: "supabase",
    });
    const supabase = getSupabaseClient(supabaseAccessToken);

    // Check if property_id exists in properties table for the given userId
    const { data: properties } = await supabase
        .from("properties")
        .select("id") // We just need the id field to check for existence
        .eq("id", property_id)
        .eq("user_id", userId);

    // throw error if no properties found
    if (!properties) {
        throw new Error("Property not found");
    }

    const { error } = await supabase
        .from("costs")
        .insert({
            cost_type: cost_type,
            property_id: property_id,
            date: date,
            price: price,
            description: description,
            washerdryer: washerdryer,
            dishwasher: dishwasher,
            ac: ac,
            heater: heater,
            fridge: fridge,
            oven: oven,
            microwave: microwave,
            hardwood: hardwood,
            carpet: carpet,
            tile: tile,
            kitchen: kitchen,
            bathroom: bathroom,
            bedroom: bedroom,
            paint: paint,
            windows: windows,
            cleaning: cleaning,
            electricity: electricity,
            water: water,
            gas: gas,
            other: other,
            user_id: userId
        })

    if (error) {
        throw new Error("Database Insertion Failed");
    }
    
    return NextResponse.json({});
};
