'use client';

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
    useDisclosure,
    Button
} from '@nextui-org/react';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';
import { BiFridge } from 'react-icons/bi';

import CostModal from '@/app/components/modals/CostModal';
import useAppliances from '@/app/hooks/useAppliances';

interface HookButtonProps {
    type: string;
    propertyId: string;
}

const HookButton: React.FC<HookButtonProps> = ({ 
    type,
    propertyId 
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [text, setText] = useState<string>("");
    const [icon, setIcon] = useState<React.ReactNode>(<FiLoader />);
    const [onPress, setOnPress] = useState<() => void>(() => () => {});
    
    const appliances = useAppliances();
    const appliancesRef = useRef(appliances);
    useEffect(() => {
        appliancesRef.current = appliances;  // Update the ref whenever appliances changes
    }, [appliances]);

    const {
        isOpen: cost_isOpen, 
        onOpen: cost_onOpen, 
        onOpenChange: cost_onOpenChange, 
        onClose: cost_onClose
    } = useDisclosure();

    const handleSubmit = async () => {
        if (appliancesRef.current.isLoading) return;
        const postData = {
            heat_type: appliancesRef.current.heaterType,
            heat_w_filter: appliancesRef.current.heaterFilterWSize,
            heat_l_filter: appliancesRef.current.heaterFilterLSize,
            heat_d_filter: appliancesRef.current.heaterFilterDSize,
            heat_condition: appliancesRef.current.heaterCondition,
            heat_date: appliancesRef.current.heaterDate ? appliancesRef.current.heaterDate.toISOString().split('T')[0] : null,
            cool_hvac_type: appliancesRef.current.coolingType.includes('HVAC') ? 'HVAC' : null,
            cool_hvac_condition: appliancesRef.current.coolingHVACCondition,
            cool_hvac_date: appliancesRef.current.coolingHVACDate ? appliancesRef.current.coolingHVACDate.toISOString().split('T')[0]: null,
            cool_window_type: appliancesRef.current.coolingType.includes('Window') ? 'Window' : null,
            cool_wind_condition: appliancesRef.current.coolingWindowCondition,
            cool_wind_date: appliancesRef.current.coolingWindowDate ? appliancesRef.current.coolingWindowDate.toISOString().split('T')[0] : null,
            cool_wind_num: appliancesRef.current.coolingWindowAmount,
            watertank_condition: appliancesRef.current.hotWaterTankCondition,
            watertank_date: appliancesRef.current.hotWaterTankDate ? appliancesRef.current.hotWaterTankDate.toISOString().split('T')[0] : null,
            wd_combined: appliancesRef.current.combined,
            washer_condition: appliancesRef.current.washerCondition,
            dryer_condition: appliancesRef.current.dryerCondition,
            washer_brand: appliancesRef.current.washerBrand,
            dryer_brand: appliancesRef.current.dryerBrand,
            washer_date: appliancesRef.current.washerDate ? appliancesRef.current.washerDate.toISOString().split('T')[0] : null,
            dryer_date: appliancesRef.current.dryerDate ? appliancesRef.current.dryerDate.toISOString().split('T')[0] : null,
            fridge_condition: appliancesRef.current.fridgeCondition,
            fridge_brand: appliancesRef.current.fridgeBrand,
            fridge_date: appliancesRef.current.fridgeDate ? appliancesRef.current.fridgeDate.toISOString().split('T')[0] : null,
            stove_condition: appliancesRef.current.stoveCondition,
            stove_brand: appliancesRef.current.stoveBrand,
            stove_type: appliancesRef.current.stoveType,
            stove_date: appliancesRef.current.stoveDate ? appliancesRef.current.stoveDate.toISOString().split('T')[0] : null,
            dish_condition: appliancesRef.current.dishwasherCondition,
            dish_brand: appliancesRef.current.dishwasherBrand,
            dish_date: appliancesRef.current.dishwasherDate ? appliancesRef.current.dishwasherDate.toISOString().split('T')[0] : null,
            mw_condition: appliancesRef.current.microwaveCondition,
            mw_brand: appliancesRef.current.microwaveBrand,
            mw_type: appliancesRef.current.microwaveType,
            mw_date: appliancesRef.current.microwaveDate ? appliancesRef.current.microwaveDate.toISOString().split('T')[0] : null,
            counter_condition: appliancesRef.current.counterCondition,
            counter_date: appliancesRef.current.counterDate ? appliancesRef.current.counterDate.toISOString().split('T')[0] : null,
            cabinet_condition: appliancesRef.current.cabinetCondition,
            cabinet_date: appliancesRef.current.cabinetDate ? appliancesRef.current.cabinetDate.toISOString().split('T')[0] : null,
            sink_condition: appliancesRef.current.sinkCondition,
            sink_date: appliancesRef.current.sinkDate ? appliancesRef.current.sinkDate.toISOString().split('T')[0] : null,
            garbage_condition: appliancesRef.current.garbageCondition,
            garbage_date: appliancesRef.current.garbageDate ? appliancesRef.current.garbageDate.toISOString().split('T')[0] : null
        };
        axios.post(`/api/appliances/${propertyId}`, postData)
            .then(() => {
                toast.success("Appliances Updated!",
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            })
            .catch((error) => {
                toast.error(error.message,
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            });
    };
    
    useEffect(() => {
        setIsLoading(true);
        if (type === "costs") {
            setText("Add Costs/Renovations");
            setIcon(<FaFileInvoiceDollar />);
            setOnPress(() => cost_onOpen);
            setIsLoading(false);
        } else if (type === "appliances") {
            setText("Update Appliances");
            setIcon(<BiFridge />);
            setOnPress(() => handleSubmit);
            setIsLoading(false);
        }
    }, [type]);

    return (
        <div>  
            <CostModal
                cost_isOpen={cost_isOpen}
                cost_onOpenChange={cost_onOpenChange}
                cost_onClose={cost_onClose}
                propertyId={propertyId}
            />
            <Button
                color="success"
                disabled={isLoading}
                endContent={icon}
                onPress={onPress}
            >
                {text}
            </Button>
        </div>
    );
};

export default HookButton;