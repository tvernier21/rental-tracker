"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { PropertyCard, LoadingPropertyCard } from "./cards/PropertyCard";

const PropertiesList: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [properties, setProperties] = useState<any[]>([]);

    useEffect(() => {
        if (!isLoading) return;
        axios.get('/api/properties/')
            .then((res) => {
                setProperties(res.data);
            })
            .catch((error) => {
                toast.error("Properties could not be loaded.",
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            })
            .finally(() => {
                setIsLoading(false);
        });
    }, [isLoading, setProperties]);

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
                            id={property.id}
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

export default PropertiesList;