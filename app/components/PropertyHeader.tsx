"use client";

import { useUser } from '@clerk/clerk-react';
import { BsHouseAddFill } from "react-icons/bs";
import {useDisclosure} from "@nextui-org/react";

import AddButton from "../components/buttons/AddButton";
import PropertyModal from "../components/modals/PropertyModal";

const PropertyHeader = () => {
    const { user } = useUser();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <div className="flex justify-center items-center">
            {/* <PropertyFilter /> */}
            <AddButton
                text="New Property"
                icon={BsHouseAddFill}
                onPressModal={onOpen}
            />
            <PropertyModal 
                isOpen={isOpen}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
            />
        </div>
    );
};

export default PropertyHeader;