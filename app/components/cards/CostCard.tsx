'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
    Card,
    Button,
    Dropdown, 
    DropdownTrigger, 
    DropdownMenu, 
    DropdownItem,
    useDisclosure,
 } from "@nextui-org/react";

import CostModal from '@/app/components/modals/CostModal';

interface CostCardProps {
    data: {
        id: string;
        created_at: string;
        property_id: string;
        date: string;
        washerdryer: boolean;
        dishwasher: boolean;
        ac: boolean;
        heater: boolean;
        fridge: boolean;
        oven: boolean;
        microwave: boolean;
        hardwood: boolean;
        carpet: boolean;
        tile: boolean;
        kitchen: boolean;
        bathroom: boolean;
        bedroom: boolean;
        paint: boolean;
        windows: boolean;
        cleaning: boolean;
        electricity: boolean;
        water: boolean;
        gas: boolean;
        other: boolean;
        price: number;
        description: string;
        cost_type: string;
        user_id: string;
        street_address: string;
    }
}

const CostCard: React.FC<CostCardProps> = ({
    data
}) => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const handleDropdownClick = useCallback((key: any): void => {
        if (key === "edit") {
            onOpen();
        } else if (key === "delete") {
            const costId = data.id;
            axios.delete(`/api/costs/${costId}/`)
                .then((res) => {
                    toast.success("Cost deleted successfully.",
                        {
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },
                        }
                    );
                })
                .catch((error) => {
                    toast.error("Cost could not be deleted.",
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
                    //refresh table
                    window.location.reload();
                });
        }
    }, [onOpen, data]);
    
    return (
        <div>
            <CostModal
                cost_isOpen={isOpen}
                cost_onClose={onClose}
                cost_onOpenChange={onOpenChange}
                // data minus street_address
                prevData={{
                    id: data.id,
                    created_at: data.created_at,
                    property_id: data.property_id,
                    date: data.date,
                    washerdryer: data.washerdryer,
                    dishwasher: data.dishwasher,
                    ac: data.ac,
                    heater: data.heater,
                    fridge: data.fridge,
                    oven: data.oven,
                    microwave: data.microwave,
                    hardwood: data.hardwood,
                    carpet: data.carpet,
                    tile: data.tile,
                    kitchen: data.kitchen,
                    bathroom: data.bathroom,
                    bedroom: data.bedroom,
                    paint: data.paint,
                    windows: data.windows,
                    cleaning: data.cleaning,
                    electricity: data.electricity,
                    water: data.water,
                    gas: data.gas,
                    other: data.other,
                    price: data.price,
                    description: data.description,
                    cost_type: data.cost_type,
                    user_id: data.user_id,
                }}
            />
            <Card 
                className={`
                    w-[800px] h-[100px] space-x-5 p-4 pl-6 pr-6 
                    ${data.cost_type === 'renovation' ? 'bg-green-400' : 'bg-red-400'}
                `} 
            >
                <div className="flex flex-row space-x-6">
                    <div className="w-1/6 overflow-hidden space-y-3">
                        <h2 className="text-sm text-muted-foreground font-light">
                            Property
                        </h2>
                        <p className="font-medium">
                            {data.street_address}
                        </p>
                    </div>
                    <div className="w-1/6 overflow-hidden space-y-3">
                        {/* muted grey font */}
                        <h2 className="text-sm text-muted-foreground font-light">
                            Date
                        </h2>
                        <p className="font-medium">
                            {data.date}
                        </p>
                    </div>
                    <div className="w-1/6 overflow-hidden space-y-3">
                        <h2 className="text-sm text-muted-foreground font-light">
                            Price
                        </h2>
                        <p className="font-medium">
                            $ {data.price}
                        </p>
                    </div>
                    <div className="w-2/6 overflow-hidden space-y-3">
                        <h2 className="text-sm text-muted-foreground font-light">
                            Description
                        </h2>
                        <p className="font-medium">
                            {data.description}
                        </p>
                    </div>
                    <div className="w-1/6 overflow-hidden space-y-3">
                        <h2 className="text-sm text-muted-foreground font-light">
                            
                        </h2>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button 
                                    color="default"
                                    variant="faded"
                                    className="capitalize"
                                >
                                    Edit
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu 
                                aria-label="Dropdown Variants"
                                color="default"
                                variant="faded"
                                onAction={(key) => handleDropdownClick(key)}
                            >
                                <DropdownItem key="edit">Edit contract</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger">
                                    Delete contract
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </Card>
        </div>
    );
}


const LoadingCostCard = () => {

    return (
        <Card 
            className="w-[800px] h-[100px] space-x-5 p-4 pl-6 pr-6 bg-default-100" 
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