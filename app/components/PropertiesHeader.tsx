"use client";

import { BsHouseAddFill } from "react-icons/bs";
import { useDisclosure } from "@nextui-org/react";

import AddButton from "./UI/AddButton";
import PropertyModal from "./modals/PropertyModal";

interface PropertiesHeaderProps {
    props: any[];
    setProps: (props: any[]) => void;
}

const PropertiesHeader: React.FC<PropertiesHeaderProps> = ({
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
                properties={props}
                setProperties={setProps}
            />
        </div>
    );
};

export default PropertiesHeader;