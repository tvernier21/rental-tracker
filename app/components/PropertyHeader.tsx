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
    const [streetAddress, setStreetAddress] = useState("");
    const [cityAddress, setCityAddress] = useState("");
    const [stateAndZip, setStateAndZip] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isLoading) return;
        axios.get(`/api/properties/${propertyId}`)
            .then((res) => {
                setStreetAddress(res.data[0].street_address);
                setCityAddress(res.data[0].city_address);
                setStateAndZip(`${res.data[0].state_address} ${res.data[0].zipcode_address}`);
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
            <h1 className="text-2xl">Dashboard</h1>
            <div className="text-3xl font-bold tracking-tight text-center">
                <div>{streetAddress}</div>
                <div>{cityAddress}</div>
                <div>{stateAndZip}</div>
            </div>
            <Dropdown>
                <DropdownTrigger>
                    <Button 
                        variant="bordered" 
                    >
                        Options
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem 
                        key="edit"
                        style={{
                            color: '#FFF',  // Default text color (choose a color that contrasts well with the button background)
                            transition: 'color 0.3s ease'  // Smooth transition for hover effect
                        }}
                    >
                        Edit file
                    </DropdownItem>
                    <DropdownItem key="delete" className="text-danger" color="danger">
                        Delete file
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>  
        </div>
    );
};

export default PropertyHeader;
