"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { PropertyCard, LoadingPropertyCard } from "./cards/PropertyCard";

interface PropertyListProps {
    properties: any[];
    setProperties: (props: any[]) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({
    properties,
    setProperties
}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isLoading) return;
        axios.get('/api/properties/')
            .then((res) => {
                setProperties(res.data);
            })
            .catch((error) => {
                toast.error("Properties could not be loaded.");
            })
            .finally(() => {
                setIsLoading(false);
        });
    }, [isLoading]);

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