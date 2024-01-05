'use client';

import { useState } from "react";

import PropertiesHeader from "./PropertiesHeader";
import PropertiesList from "./PropertiesList";

const PropertiesHome = () => {
    return (
        <div className="flex-col justify-center items-center space-y-10">
            <PropertiesHeader/>
            <PropertiesList />
        </div>
    );
};

export default PropertiesHome