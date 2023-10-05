"use client";

import { useUser } from '@clerk/clerk-react';
import { BsHouseAddFill } from "react-icons/bs";

import AddButton from "../components/buttons/AddButton";

const PropertyHeader = () => {
    const { user } = useUser();

    return (
        <div className="flex justify-center items-center">
            {/* <PropertyFilter /> */}
            <AddButton
                text="New Property"
                icon={BsHouseAddFill}
                onPressModal={() => {}}
            />
        </div>
    );
};

export default PropertyHeader;