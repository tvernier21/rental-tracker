"use client";

import { useUser } from '@clerk/clerk-react';
import { BsHouseAddFill } from "react-icons/bs";
import {useDisclosure} from "@nextui-org/react";

import AddButton from "../components/buttons/AddButton";
import PropertyModal from "../components/modals/PropertyModal";
import PropertyList from "../components/PropertyList";

const PropertyHeader = () => {
    const { user } = useUser();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <div className="flex-col justify-center items-center space-y-10">
            <div className="flex justify-center items-center">
                {/* <PropertyFilter /> */}
                <AddButton
                    text="New Property"
                    icon={BsHouseAddFill}
                    onPressModal={onOpen}
                />
                <PropertyModal 
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                />
            </div>
            <div className="flex justify-center items-center">
                <PropertyList />
            </div>
        </div>
    );
};

export default PropertyHeader;