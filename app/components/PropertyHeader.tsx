'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
    Dropdown, 
    DropdownTrigger, 
    DropdownMenu, 
    DropdownItem, 
    Button
} from "@nextui-org/react"

interface PropertyHeaderProps {
    propertyId: string;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({
    propertyId
}) => {
    const [propertyInfo, setPropertyInfo] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isLoading) return;
        axios.get(`/api/properties/${propertyId}`)
            .then((res) => {
                console.log(res.data);
                setPropertyInfo(`${res.data[0].street_address}, ${res.data[0].city_address}, ${res.data[0].state_address} ${res.data[0].zipcode_address}`);
            })
            .catch((error) => {
                toast.error("Property could not be loaded.");
            })
            .finally(() => {
                setIsLoading(false);
        });
    }, [isLoading]);


    return (
        <div className="flex items-center justify-between space-y-2">
            <h1 className="">Dashboard</h1>
            <h2 className="text-3xl font-bold tracking-tight">{propertyInfo}</h2>
            <Dropdown>
                <DropdownTrigger>
                    <Button 
                    variant="bordered" 
                    >
                    Options
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="edit">Edit file</DropdownItem>
                    <DropdownItem key="delete" className="text-danger" color="danger">
                    Delete file
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>  
        </div>
    );
};

export default PropertyHeader;