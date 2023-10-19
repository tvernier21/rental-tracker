'use client';

import NextLink from "next/link";
import { Card } from "@nextui-org/react";

interface PropertyCardProps {
    id: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    image: string | null;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
    id, 
    street,
    city,
    state,
    zip,
    country,
    image
}) => {    
    return (
        <Card 
            className="w-[300px] h-[300px] space-y-5 p-4" 
            radius="lg"
            isPressable
            href={`/properties/${id}`}
            as={NextLink}
        >
            <div className="h-36 rounded-lg bg-default-300"></div>
            <div className="space-y-3">
                <div className="h-7 w-5/5 rounded-lg bg-default-200 pl-2 pr-2 pt-1 pb-1 overflow-hidden">
                    {street}
                </div>
                <div className="h-7 w-4/5 rounded-lg bg-default-200 pl-2 pr-2 pt-1 pb-1 overflow-hidden">
                    {city}, {state}
                </div>
                <div className="h-7 w-3/5 rounded-lg bg-default-200 pl-2 pr-2 pt-1 pb-1 overflow-hidden">
                    {zip}, {country}
                </div>
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