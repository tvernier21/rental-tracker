'use client';

import { useState } from "react";

import PropertiesHeader from "./PropertiesHeader";
import PropertiesList from "./PropertiesList";

const PropertiesHome = () => {
    const [props, setProps] = useState<any[]>([]);

    return (
        <div className="flex-col justify-center items-center space-y-10">
            <PropertiesHeader 
                props={props}
                setProps={setProps}
            />
            <PropertiesList 
                properties={props}
                setProperties={setProps}
            />
        </div>
    );
};

export default PropertiesHome