'use client';

import { useDisclosure } from '@nextui-org/react';
import { IoMdPersonAdd } from "react-icons/io";

import AddButton from './UI/AddButton';
import TenantModal from "@/app/components/modals/TenantModal"

const TenantsHeader = () => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    return (
        <div className="flex justify-center items-center">
            {/* <PropertyFilter /> */}
            <AddButton
                text="Add New Tenant"
                icon={IoMdPersonAdd}
                onPress={onOpen}
            />
            <TenantModal 
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
            />
        </div>
    );
};

export default TenantsHeader;