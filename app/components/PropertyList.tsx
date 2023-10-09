"use client";

import { useState, useEffect } from "react";
import { useSession, useUser } from '@clerk/clerk-react';

import supabaseClient from "@/app/lib/supabaseClient"
import { PropertyCard, LoadingPropertyCard } from "../components/PropertyCard";

const PropertyList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [props, setProps] = useState<any[]>([]);
    const { session } = useSession();
    console.log(isLoading)

    useEffect(() => {
        const loadProperties = async () => {
            try {
                setIsLoading(true);
                const supabaseAccessToken = session ? await session.getToken({
                    template: "supabase",
                }) : null;

                if (supabaseAccessToken) {
                    const supabase = await supabaseClient(supabaseAccessToken);
                    const { data: properties } = await supabase.from("properties").select("*");
                    setProps(properties || []);
                }
            } catch (e) {
                alert(e);
            } finally {
                setIsLoading(false);
            }
        };
        loadProperties();
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className="grid grid-cols-4 gap-10 content-center">
                    <LoadingPropertyCard />
                    <LoadingPropertyCard />
                    <LoadingPropertyCard />
                    <LoadingPropertyCard />
                    <LoadingPropertyCard />
                    <LoadingPropertyCard />
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-10 content-center">
                    {props.map((property, i) => (
                        <PropertyCard
                            key={i}
                            street={property.name}
                            city={property.address}
                            state={property.state}
                            zip={property.zip}
                            country={property.city}
                            image={property.image}
                        />
                    ))}
                </div>
            )}

        </div>
    );
};

export default PropertyList;