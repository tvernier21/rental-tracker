'use client'

import { useState } from 'react';
import { Tabs, Tab} from '@nextui-org/react';

const contentTypes = [
    {
        id: "overview",
        value: "Overview",
        desc: "Overview of the property."
    },
    {
        id: "contracts",
        value: "Contracts",
        desc: "Contracts of the property."
    },
    {
        id: "tenants",
        value: "Tenants",
        desc: "Tenants of the property."
    }
];

interface PropertyContentProps {
    propertyId: string;
}

const PropertyContent: React.FC<PropertyContentProps> = ({ propertyId }) => {
    const [contentType, setContentType] = useState<string>("overview");

    return (
        <div className="">
            <Tabs 
                aria-label="tabs" 
                items={contentTypes}
                size="md"
                variant="light"
                selectedKey={contentType}
                onSelectionChange={(item) => setContentType(item as string)}
                disabledKeys={["contracts", "tenants"]}
            >
                {(item) => (
                    <Tab 
                        key={item.id} 
                        title={item.value}
                    >
                        {item.desc}
                    </Tab>
                )}
            </Tabs>
        </div>
    );
};

export default PropertyContent;