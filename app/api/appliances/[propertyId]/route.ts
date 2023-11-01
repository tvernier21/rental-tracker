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
    const { data: appliances } = await supabase
        .from("appliances")
        .select("*")
        .eq("user_id", userId)
        .eq("property_id", propertyId);
    
    return NextResponse.json(appliances);
};


export async function POST(
    req: NextRequest,
    { params }: { params: IParams }
 ) {
    const { getToken, userId } = getAuth(req);
    if (!userId) {
        throw new Error("Unauthorized (401)");
    };
    
    const { 
        heat_type, heat_w_filter, heat_l_filter, heat_d_filter, heat_condition, heat_date,
        cool_hvac_type, cool_hvac_condition, cool_hvac_date,
        cool_window_type, cool_wind_condition, cool_wind_date, cool_wind_num,
        watertank_condition, watertank_date,
        wd_combined,
        washer_condition, washer_brand, washer_date,
        dryer_condition, dryer_brand, dryer_date,
        fridge_condition, fridge_brand, fridge_date,
        stove_condition, stove_brand, stove_type, stove_date,
        dish_condition, dish_brand, dish_date,
        mw_condition, mw_brand, mw_type, mw_date,
        counter_condition, counter_date,
        cabinet_condition, cabinet_date,
        sink_condition, sink_date,
        garbage_condition, garbage_date
    } = await req.json();

    const { propertyId } = params;
    if (!propertyId) {
        throw new Error("Property ID is required");
    };
    
    const supabaseAccessToken = await getToken({
        template: "supabase",
    });
    const supabase = getSupabaseClient(supabaseAccessToken);
    const { error } = await supabase
        .from("appliances")
        .update({
            heat_type: heat_type,
            heat_w_filter: heat_w_filter,
            heat_l_filter: heat_l_filter,
            heat_d_filter: heat_d_filter,
            heat_condition: heat_condition,
            heat_date: heat_date,
            cool_hvac_type: cool_hvac_type,
            cool_hvac_condition: cool_hvac_condition,
            cool_hvac_date: cool_hvac_date,
            cool_window_type: cool_window_type,
            cool_wind_condition: cool_wind_condition,
            cool_wind_date: cool_wind_date,
            cool_wind_num: cool_wind_num,
            watertank_condition: watertank_condition,
            watertank_date: watertank_date,
            wd_combined: wd_combined,
            washer_condition: washer_condition,
            dryer_condition: dryer_condition,
            washer_brand: washer_brand,
            dryer_brand: dryer_brand,
            washer_date: washer_date,
            dryer_date: dryer_date,
            fridge_condition: fridge_condition,
            fridge_brand: fridge_brand,
            fridge_date: fridge_date,
            stove_condition: stove_condition,
            stove_brand: stove_brand,
            stove_type: stove_type,
            stove_date: stove_date,
            dish_condition: dish_condition,
            dish_brand: dish_brand,
            dish_date: dish_date,
            mw_condition: mw_condition,
            mw_brand: mw_brand,
            mw_type: mw_type,
            mw_date: mw_date,
            counter_condition: counter_condition,
            counter_date: counter_date,
            cabinet_condition: cabinet_condition,
            cabinet_date: cabinet_date,
            sink_condition: sink_condition,
            sink_date: sink_date,
            garbage_condition: garbage_condition,
            garbage_date: garbage_date
        })
        .eq("user_id", userId)
        .eq("property_id", propertyId);

         
    if (error) {
        throw new Error(error.message);
    };

    return NextResponse.json({ success: true });
};