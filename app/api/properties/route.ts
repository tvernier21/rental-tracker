import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuth } from "@clerk/nextjs/server";

import getSupabaseClient from "@/app/lib/supabaseClient"
import { error } from 'console';

export async function GET(req: NextRequest) {
    const { getToken, userId } = getAuth(req);
    if (!userId) {
        throw new Error("Unauthorized (401)");
    } 
    
    const supabaseAccessToken = await getToken({
        template: "supabase",
    });
    const supabase = getSupabaseClient(supabaseAccessToken);
    const { error, data: properties } = await supabase
        .from("properties")
        .select("*")
        .eq("user_id", userId);

    if (error) {
        throw new Error(error.message);
    }
    
    if (!properties) {
        // return empty array
        return NextResponse.json([]);
    }
    
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
        img,
        id
    } = await req.json();

    if (!userId) {
        throw new Error("Unauthorized (401)");
    }
    
    const supabaseAccessToken = await getToken({
        template: "supabase",
    });
    const supabase = getSupabaseClient(supabaseAccessToken);
    if (id) {
        const { error: updateError } = await supabase
            .from("properties")
            .update({
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
            .eq("id", id);
        
        if (updateError) {
            throw new Error("Property Update Failed");
        }
        return NextResponse.json({ message: "Property Updated" });
    }

    const { error: propertyError, data } = await supabase
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

    if (propertyError) {
        throw new Error("Property Insertion Failed");
    }

    const { error: appliancesError } = await supabase
        .from("appliances")
        .insert({
            user_id: userId,
            property_id: data[0].id
        });

    if (appliancesError) {
        throw new Error("Appliance Insertion Failed");
    }
    
    return NextResponse.json({ success: true});
};
