'use client';

import { useState } from "react";

import PropertyHeader from "../components/PropertyHeader";
import PropertyList from "../components/PropertyList";

const PropertyHome = () => {
    const [props, setProps] = useState<any[]>([]);

    return (
        <div className="flex-col justify-center items-center space-y-10">
            <PropertyHeader 
                props={props}
                setProps={setProps}
            />
            <PropertyList 
                properties={props}
                setProperties={setProps}
            />
        </div>
    );
};

export default PropertyHome