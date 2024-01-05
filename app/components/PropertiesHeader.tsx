"use client";

import { BsHouseAddFill } from "react-icons/bs";
import { useDisclosure } from "@nextui-org/react";

import AddButton from "./UI/AddButton";
import PropertyModal from "./modals/PropertyModal";

const PropertiesHeader: React.FC = () => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    return (
        <div className="flex justify-center items-center">
            {/* <PropertyFilter /> */}
            <AddButton
                text="Add Property"
                icon={BsHouseAddFill}
                onPress={onOpen}
            />
            <PropertyModal 
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
            />
        </div>
    );
};

export default PropertiesHeader;