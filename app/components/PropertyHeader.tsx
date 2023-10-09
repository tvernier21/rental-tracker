"use client";

import { useState } from "react";
import { BsHouseAddFill } from "react-icons/bs";
import {useDisclosure} from "@nextui-org/react";

import AddButton from "../components/buttons/AddButton";
import PropertyModal from "../components/modals/PropertyModal";

interface PropertyHeaderProps {
    props: any[];
    setProps: (props: any[]) => void;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({
    props,
    setProps
}) => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

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
                onOpenChange={onOpenChange}
                onClose={onClose}
                props={props}
                setProps={setProps}
            />
        </div>
    );
};

export default PropertyHeader;