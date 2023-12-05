'use client';

import { useDisclosure } from '@nextui-org/react';
import { IoMdPersonAdd } from "react-icons/io";

import AddButton from './UI/AddButton';
import ContractsModal from '@/app/components/modals/ContractsModal';

const ContractsHeader = () => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    return (
        <div className="flex justify-center items-center">
            {/* <PropertyFilter /> */}
            <AddButton
                text="Add New Contract"
                icon={IoMdPersonAdd}
                onPress={onOpen}
            />
            <ContractsModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
            />
        </div>
    );
};

export default ContractsHeader;