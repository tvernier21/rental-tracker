'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import toast from 'react-hot-toast';
import {
    Dropdown, 
    DropdownTrigger, 
    DropdownMenu, 
    DropdownItem, 
    Button,
    Divider,
    useDisclosure
} from "@nextui-org/react";
import next from 'next';
import PropertyModal from './modals/PropertyModal';

interface PropertyHeaderProps {
    propertyId: string;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({
    propertyId
}) => {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [streetAddress, setStreetAddress] = useState("");
    const [cityAddress, setCityAddress] = useState("");
    const [stateAndZip, setStateAndZip] = useState("");
    const [property, setProperty] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isLoading) return;
        axios.get(`/api/properties/${propertyId}/`)
            .then((res) => {
                setStreetAddress(res.data[0].street_address);
                setCityAddress(res.data[0].city_address);
                setStateAndZip(`${res.data[0].state_address} ${res.data[0].zipcode_address}`);
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
    }, [isLoading, propertyId]);

    const handleDropdownClick = useCallback((key: any): void => {
        if (key === "edit") {
            onOpen();
        } else if (key === "delete") {
            axios.delete(`/api/properties/${propertyId}/`)
                .then((res) => {
                    toast.success("Property deleted successfully.",
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
                    toast.error("Property could not be deleted.",
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
                    router.push('/properties');
                });
        }
    }, [propertyId, router, onOpen]);

    return (
        <div className='space-y-6'>
            <PropertyModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
                prevData={property}
            />
            <div className="flex items-center justify-between space-y-2">
                <div className='space-y-0.5'>
                    <h2 className="text-2xl font-bold tracking-tight">
                        {streetAddress}, {cityAddress}, {stateAndZip}
                    </h2>
                    <p className="text-muted-foreground">
                        Manage property settings, contracts, and tenants.
                    </p>
                </div>
                <Dropdown>
                    <DropdownTrigger>
                        <Button 
                            color="default"
                            variant="faded"
                            className="capitalize"
                        >
                            Options
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu 
                        aria-label="Dropdown Variants"
                        color="default"
                        variant="faded"
                        onAction={(key) => handleDropdownClick(key)}
                    >
                        <DropdownItem key="edit">Edit</DropdownItem>
                        <DropdownItem key="delete" className="text-danger" color="danger">
                            Delete property
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <Divider />
        </div>
    );
};

export default PropertyHeader;
