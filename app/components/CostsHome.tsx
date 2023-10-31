'use client';

import { useDisclosure } from '@nextui-org/react';
import { FaFileInvoiceDollar } from 'react-icons/fa';

import AddButton from './UI/AddButton';
import CostModal from './modals/CostModal';

const CostsHome = () => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    return (
        <div className="flex justify-center items-center">
            {/* <PropertyFilter /> */}
            <AddButton
                text="Add Cost/Renovation"
                icon={FaFileInvoiceDollar}
                onPressModal={onOpen}
            />
            <CostModal 
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
            />
        </div>
    );
};

export default CostsHome;