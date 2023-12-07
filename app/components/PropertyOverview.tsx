'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface PropertyOverviewProps {
    propertyId: string;
}

interface PropertyData {
    id: string;
    street_address: string;
    zipcode_address: string;
    state_address: string;
    country_address: string;
    prop_type: string;
    bedrooms: number;
    bathrooms: number;
    backyard: boolean;
    sqr_feet: number;
    img: string | null;
    user_id: string;
    city_address: string;
    basement: boolean;
}

const PropertyOverview: React.FC<PropertyOverviewProps> = ({
    propertyId
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [property, setProperty] = useState<PropertyData | null>(null);

    useEffect(() => {
        axios.get(`/api/properties/${propertyId}`)
            .then((res) => {
                setProperty(res.data[0]);
            })
            .catch((error) => {
                toast.error("Property could not be loaded.",
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
    }, [propertyId]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Property Overview</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : property ? (
                <div>
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-2">Address:</h2>
                        <p className="mb-1">Street: {property.street_address}</p>
                        <p className="mb-1">City: {property.city_address}</p>
                        <p className="mb-1">Zipcode: {property.zipcode_address}</p>
                        <p className="mb-1">State: {property.state_address}</p>
                        <p className="mb-1">Country: {property.country_address}</p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-2">Property Details:</h2>
                        <p className="mb-1">Type: {property.prop_type}</p>
                        <p className="mb-1">Bedrooms: {property.bedrooms}</p>
                        <p className="mb-1">Bathrooms: {property.bathrooms}</p>
                        <p className="mb-1">Backyard: {property.backyard ? 'Yes' : 'No'}</p>
                        <p className="mb-1">Square Feet: {property.sqr_feet}</p>
                        <p className="mb-1">Basement: {property.basement ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            ) : (
                <p>Property not found.</p>
            )}
        </div>
    );
}

export default PropertyOverview;