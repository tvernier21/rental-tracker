'use client';

import { useState, useEffect } from 'react';
import { useSession, useUser } from '@clerk/clerk-react';
import {
    Card, 
    CardBody,
    Tabs,
    Tab,
    Select,
    SelectItem,
    Selection
} from "@nextui-org/react";

import supabaseClient from '@/app/lib/supabaseClient';
import { isSelectionEmpty } from '../inputs/SelectHelper';

const costTypes = [
    {
        id: "costs",
        value: "Costs",
        desc: "Costs are expenses that are necessary to keep the property in service and in good condition. These include property taxes, insurance, utilities, and routine maintenance."
    },
    {
        id: "renovation",
        value: "Renovation",
        desc: "Renovation costs are expenses that are necessary to improve the property. These include repairs, replacements, and upgrades."
    }
]

const CostCard = () => {
    const [costType, setCostType] = useState("costs");
    const [properties, setProperties] = useState<{
        label: string;
        value: string;
    }[]>([{label: '', value: ''}]);
    const [property, setProperty] = useState<Selection>(new Set([]));

    const { session } = useSession();
    const { user } = useUser();

    useEffect(() => {
        const loadProperties = async () => {
            try {
                const supabaseAccessToken = session ? await session.getToken({
                    template: "supabase",
                }) : null;

                if (supabaseAccessToken && user) {
                    const supabase = await supabaseClient(supabaseAccessToken);
                    const { data: properties } = await supabase
                        .from("properties")
                        .select("*")
                        .eq("user_id", user.id);
                    
                    setProperties(Array.from(properties || []).map((property) => {
                        return {
                            label: `${property.street_address}, ${property.city_address}, ${property.state_address} ${property.zipcode_address}, ${property.country_address}`, 
                            value: property.id as string
                        }
                    }));
                }
            } catch (e) {
                alert(e);
            }
        };
        loadProperties();
    }, [session, user]);

    return (
        <div className="w-[900px]">
            <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50"
                shadow="sm"
                fullWidth
            >
                <CardBody>
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                        <div className="relative col-span-6 md:col-span-6">
                            <Tabs 
                                aria-label="tabs" 
                                items={costTypes}
                                size="md"
                                color={costType === "costs" ? "danger" : "success"}
                                fullWidth={true}
                                selectedKey={costType}
                                onSelectionChange={(item) => setCostType(item as string)}
                            >
                                {(item) => (
                                    <Tab key={item.id} title={item.value}>

                                    </Tab>
                                )}
                            </Tabs>
                        </div>
                        <div className="relative col-span-0 md:col-span-6">
                            
                        </div>
                        <div className="relative col-span-6 md:col-span-8">
                            <Select
                                isRequired
                                label="Property"
                                placeholder={`Select property to add ${costType} to`}
                                variant="bordered"
                                fullWidth
                                selectedKeys={property}
                                onSelectionChange={setProperty}
                            >
                                {properties.map((property) => (
                                    <SelectItem key={property.value} value={property.value}>
                                        {property.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <div className="relative col-span-6 md:col-span-6">
                            rats
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default CostCard