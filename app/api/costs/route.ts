import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuth } from "@clerk/nextjs/server";

import getSupabaseClient from "@/app/lib/supabaseClient"

export async function POST(req: NextRequest) { 
    const { getToken, userId } = getAuth(req);
    const { 
        costType, 
        property, 
        eventDate, 
        price,
        description, 
        washerDryer, 
        dishwasher, 
        AC, 
        heater, 
        fridge, 
        oven, 
        microwave, 
        hardwoodFloors, 
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
    console.log("costType: ", costType);

    if (!userId) {
        throw new Error("Unauthorized (401)");
    }
    
    const supabaseAccessToken = await getToken({
        template: "supabase",
    });
    const supabase = getSupabaseClient(supabaseAccessToken);
    const { error } = await supabase
            .from("properties")
            .insert({
                cost_type: costType,
                property_id: Array.from(property)[0],
                event_date: eventDate.format('YYYY-MM-DD'),
                price: price,
                description: description,
                washer_dryer: washerDryer,
                dishwasher: dishwasher,
                ac: AC,
                heater: heater,
                fridge: fridge,
                oven: oven,
                microwave: microwave,
                hardwood_floors: hardwoodFloors,
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
                other: other
            });

    if (error) {
        console.error(error);
        throw new Error("Database Insertion Failed");
    }
    
    return NextResponse.json({});
};
