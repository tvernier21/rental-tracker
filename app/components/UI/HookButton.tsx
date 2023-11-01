'use client';

import { useEffect, useState } from 'react';
import { 
    useDisclosure,
    Button
} from '@nextui-org/react';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';

import CostModal from '@/app/components/modals/CostModal';

interface HookButtonProps {
    type: string;
    data?: any;
}

const HookButton: React.FC<HookButtonProps> = ({ 
    type 
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const {
        isOpen: cost_isOpen, 
        onOpen: cost_onOpen, 
        onOpenChange: cost_onOpenChange, 
        onClose: cost_onClose
    } = useDisclosure();
    
    const [text, setText] = useState<string>("");
    const [icon, setIcon] = useState<React.ReactNode>(<FiLoader />);
    const [onPress, setOnPress] = useState<() => void>(() => () => {});

    useEffect(() => {
        setIsLoading(true);
        if (type === "costs") {
            setText("Add Costs/Renovations");
            setIcon(<FaFileInvoiceDollar />);
            setOnPress(() => cost_onOpen);
            setIsLoading(false);
        }
    }, [type]);

    return (
        <div>  
            <CostModal 
                isOpen={cost_isOpen}
                onOpenChange={cost_onOpenChange}
                onClose={cost_onClose}
            />
            <Button
                onPress={onPress}
                color="success"
                disabled={isLoading}
                endContent={icon}
            >
                {text}
            </Button>
        </div>
    );
};

export default HookButton;