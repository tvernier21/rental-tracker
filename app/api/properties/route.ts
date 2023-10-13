import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuth } from "@clerk/nextjs/server";

import getSupabaseClient from "@/app/lib/supabaseClient"

export async function GET(req: NextRequest) {
    const { getToken, userId } = getAuth(req);
    if (!userId) {
        throw new Error("Unauthorized (401)");
    } 
    
    const supabaseAccessToken = await getToken({
        template: "supabase",
    });
    const supabase = getSupabaseClient(supabaseAccessToken);
    const { data: properties } = await supabase
        .from("properties")
        .select("*")
        .eq("user_id", userId);
    
    return NextResponse.json(properties);
};

export async function POST(req: NextRequest) {
    const { getToken, userId } = getAuth(req);
    const { 
        street, 
        city, 
        state, 
        zipcode, 
        country, 
        propertyType, 
        bedrooms, 
        bathrooms, 
        squarefootage, 
        backyard, 
        basement, 
        img
    } = await req.json();

    if (!userId) {
        throw new Error("Unauthorized (401)");
    }
    
    const supabaseAccessToken = await getToken({
        template: "supabase",
    });
    const supabase = getSupabaseClient(supabaseAccessToken);
    const { error, data } = await supabase
            .from("properties")
            .insert({
                street_address: street,
                city_address: city,
                state_address: state,
                zipcode_address: zipcode,
                country_address: country,
                prop_type: propertyType,
                bedrooms: bedrooms,
                bathrooms: bathrooms, 
                sqr_feet: squarefootage,
                backyard: backyard,
                basement: basement,
                img: img,  // If you have an image to insert, replace null with the image data or URL.\
                user_id: userId
            })
            .select();

    if (error) {
        console.error(error);
        throw new Error("Database Insertion Failed");
    }
    
    return NextResponse.json(data || []);
};
