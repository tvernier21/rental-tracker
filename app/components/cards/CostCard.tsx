'use client';

import NextLink from "next/link";
import { Card } from "@nextui-org/react";

interface CostCardProps {
    type: boolean;
    price: number;
    date: string;
    description: string;
}

const CostCard: React.FC<CostCardProps> = ({
    type,
    price,
    date,
    description
}) => {    
    return (
        <Card 
            className="w-[1200px] h-[100px] space-x-5 p-4 pl-6 pr-6 bg-default-100" 
            radius="lg"
        >
            <div className="flex flex-row space-x-5">
                <div className="w-1/5 overflow-hidden space-y-3">
                    {/* muted grey font */}
                    <h2 className="text-sm text-muted-foreground font-light">
                        Date
                    </h2>
                    <p className="font-medium">
                        {date}
                    </p>
                </div>
                <div className="w-1/5 overflow-hidden space-y-3">
                    <h2 className="text-sm text-muted-foreground font-light">
                        Price
                    </h2>
                    <p className="font-medium">
                        $ {price}
                    </p>
                </div>
                <div className="w-1/5 overflow-hidden space-y-3">
                    <h2 className="text-sm text-muted-foreground font-light">
                        Description
                    </h2>
                    <p className="font-medium">
                        {description}
                    </p>
                </div>
            </div>
        </Card>
    );
}

const LoadingCostCard = () => {

    return (
        <Card 
            className="w-[1200px] h-[100px] space-x-5 p-4 pl-6 pr-6 bg-default-100" 
            radius="lg"
        >
            <div className="flex flex-row space-x-5">
                <div className="w-1/5 overflow-hidden space-y-3">
                    {/* muted grey font */}
                    <h2 className="text-sm text-muted-foreground font-light">
                        Date
                    </h2>
                    <p className="font-medium">
                        ...
                    </p>
                </div>
                <div className="w-1/5 overflow-hidden space-y-3">
                    <h2 className="text-sm text-muted-foreground font-light">
                        Price
                    </h2>
                    <p className="font-medium">
                        $ ...
                    </p>
                </div>
                <div className="w-1/5 overflow-hidden space-y-3">
                    <h2 className="text-sm text-muted-foreground font-light">
                        Description
                    </h2>
                    <p className="font-medium">
                        ...
                    </p>
                </div>
            </div>
        </Card>
    );
};

export { CostCard, LoadingCostCard };