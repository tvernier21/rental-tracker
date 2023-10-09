'use client';

import { Card } from "@nextui-org/react";

interface PropertyCardProps {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    image: string | null;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
    street,
    city,
    state,
    zip,
    country,
    image
}) => {
    
    return (
        <Card className="w-[300px] h-[300px] space-y-5 p-4" radius="lg">
            <div className="h-36 rounded-lg bg-default-300"></div>
            <div className="space-y-3">
                <div className="h-3 w-4/5 rounded-lg bg-default-200">{street}</div>
                <div className="h-3 w-4/5 rounded-lg bg-default-200">{city}, {state}</div>
                <div className="h-3 w-2/5 rounded-lg bg-default-300">{zip}, {country}</div>
            </div>
        </Card>
    );
}

const LoadingPropertyCard = () => {

    return (
        <Card className="w-[300px] h-[300px] space-y-5 p-4" radius="lg">
            <div className="h-36 rounded-lg bg-default-300"></div>
            <div className="space-y-3">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </div>
        </Card>
    );
};

export { PropertyCard, LoadingPropertyCard };