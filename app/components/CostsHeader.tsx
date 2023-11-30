'use client';

import { useDisclosure } from '@nextui-org/react';
import { FaFileInvoiceDollar } from 'react-icons/fa';

import AddButton from './UI/AddButton';
import CostModal from './modals/CostModal';

const CostsHeader = () => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    return (
        <div className="flex justify-center items-center">
            {/* <PropertyFilter /> */}
            <AddButton
                text="Add Cost/Renovation"
                icon={FaFileInvoiceDollar}
                onPress={onOpen}
            />
            <CostModal 
                cost_isOpen={isOpen}
                cost_onOpenChange={onOpenChange}
                cost_onClose={onClose}
            />
        </div>
    );
};

export default CostsHeader;