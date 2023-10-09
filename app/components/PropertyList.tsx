"use client";

import { useState, useEffect } from "react";
import { useSession, useUser } from '@clerk/clerk-react';

import supabaseClient from "@/app/lib/supabaseClient"
import { PropertyCard, LoadingPropertyCard } from "../components/PropertyCard";

interface PropertyListProps {
    properties: any[];
    setProperties: (props: any[]) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({
    properties,
    setProperties
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const { session } = useSession();
    const { user } = useUser();

    useEffect(() => {
        const loadProperties = async () => {
            try {
                setIsLoading(true);
                const supabaseAccessToken = session ? await session.getToken({
                    template: "supabase",
                }) : null;

                if (supabaseAccessToken && user) {
                    const supabase = await supabaseClient(supabaseAccessToken);
                    const { data: properties } = await supabase
                        .from("properties")
                        .select("*")
                        .eq("user_id", user?.id);
                    setProperties(properties || []);
                }
            } catch (e) {
                alert(e);
            } finally {
                setIsLoading(false);
            }
        };
        loadProperties();
    }, []);

    console.log(properties);

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
                    {properties.map((property, i) => (
                        <PropertyCard
                            key={i}
                            street={property.street_address}
                            city={property.city_address}
                            state={property.state_address}
                            zip={property.zipcode_address}
                            country={property.country_address}
                            image={property.image}
                        />
                    ))}
                </div>
            )}

        </div>
    );
};

export default PropertyList;