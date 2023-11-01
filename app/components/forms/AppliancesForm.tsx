"use client";

import { useEffect, useState } from "react";
import {
    Accordion, 
    AccordionItem,
} from "@nextui-org/react"
import dayjs, { Dayjs } from 'dayjs';
import { GrDocumentUpdate } from "react-icons/gr";
import axios from "axios";
import toast from "react-hot-toast";

// Components
import HeatingCoolingSection from "./appliances/HeatingCoolingSection";
import WasherDryerSection from "./appliances/washerDryerSection";
import KitchenSection from "./appliances/KitchenSection";
import OtherKitchenSection from "./appliances/OtherKitchenSection";
import AddButton from "../UI/AddButton";

interface AppliancesFormProps {
    propertyId: string
}

const AppliancesForm: React.FC<AppliancesFormProps> = ({
    propertyId
}) => {
    // Heater and Cooling
    const [heaterType, setHeaterType] = useState<string>('');
    const [heaterFilterWSize, setHeaterFilterWSize] = useState<string>('');
    const [heaterFilterLSize, setHeaterFilterLSize] = useState<string>('');
    const [heaterFilterDSize, setHeaterFilterDSize] = useState<string>('');
    const [heaterDate, setHeaterDate] = useState<Dayjs | null>(dayjs());
    const [heaterCondition, setHeaterCondition] = useState<string>('');
    const [coolingType, setCoolingType] = useState([] as string[]);
    const [coolingHVACCondition, setCoolingHVACCondition] = useState<string>('');
    const [coolingWindowCondition, setCoolingWindowCondition] = useState<string>('');
    const [coolingHVACDate, setCoolingHVACDate] = useState<Dayjs | null>(dayjs());
    const [coolingWindowDate, setCoolingWindowDate] = useState<Dayjs | null>(dayjs());
    const [coolingWindowAmount, setCoolingWindowAmount] = useState<string>('');
    const [hotWaterTankCondition, setHotWaterTankCondition] = useState<string>('');
    const [hotWaterTankDate, setHotWaterTankDate] = useState<Dayjs | null>(dayjs());
    const heatingCooling = {
        heaterType, setHeaterType,
        heaterFilterWSize, setHeaterFilterWSize,
        heaterFilterLSize, setHeaterFilterLSize,
        heaterFilterDSize, setHeaterFilterDSize,
        heaterDate, setHeaterDate,
        heaterCondition, setHeaterCondition,
        coolingType, setCoolingType,
        coolingHVACCondition, setCoolingHVACCondition,
        coolingWindowCondition, setCoolingWindowCondition,
        coolingHVACDate, setCoolingHVACDate,
        coolingWindowDate, setCoolingWindowDate,
        coolingWindowAmount, setCoolingWindowAmount,
        hotWaterTankCondition, setHotWaterTankCondition,
        hotWaterTankDate, setHotWaterTankDate
    };

    // washer and dryer
    const [combined, setCombined] = useState<boolean>(false);
    const [washerCondition, setWasherCondition] = useState<string>('');
    const [dryerCondition, setDryerCondition] = useState<string>('');
    const [washerDate, setWasherDate] = useState<Dayjs | null>(dayjs());
    const [dryerDate, setDryerDate] = useState<Dayjs | null>(dayjs());
    const [washerBrand, setWasherBrand] = useState<string>('');
    const [dryerBrand, setDryerBrand] = useState<string>('');
    const washerDyer = {
        combined, setCombined,
        washerCondition, setWasherCondition,
        dryerCondition, setDryerCondition,
        washerDate, setWasherDate,
        dryerDate, setDryerDate,
        washerBrand, setWasherBrand,
        dryerBrand, setDryerBrand
    };

    // Kitchen Appliances
    const [fridgeCondition, setFridgeCondition] = useState<string>('');
    const [fridgeBrand, setFridgeBrand] = useState<string>('');
    const [fridgeDate, setFridgeDate] = useState<Dayjs | null>(dayjs());
    const [stoveCondition, setStoveCondition] = useState<string>('');
    const [stoveBrand, setStoveBrand] = useState<string>('');
    const [stoveDate, setStoveDate] = useState<Dayjs | null>(dayjs());
    const [stoveType, setStoveType] = useState<string>('');
    const [dishwasherCondition, setDishwasherCondition] = useState<string>('');
    const [dishwasherBrand, setDishwasherBrand] = useState<string>('');
    const [dishwasherDate, setDishwasherDate] = useState<Dayjs | null>(dayjs());
    const [microwaveCondition, setMicrowaveCondition] = useState<string>('');
    const [microwaveBrand, setMicrowaveBrand] = useState<string>('');
    const [microwaveDate, setMicrowaveDate] = useState<Dayjs | null>(dayjs());
    const [microwaveType, setMicrowaveType] = useState<string>('');
    const kitchenAppliances = {
        fridgeCondition, setFridgeCondition,
        fridgeBrand, setFridgeBrand,
        fridgeDate, setFridgeDate,
        stoveCondition, setStoveCondition,
        stoveBrand, setStoveBrand,
        stoveDate, setStoveDate,
        stoveType, setStoveType,
        dishwasherCondition, setDishwasherCondition,
        dishwasherBrand, setDishwasherBrand,
        dishwasherDate, setDishwasherDate,
        microwaveCondition, setMicrowaveCondition,
        microwaveBrand, setMicrowaveBrand,
        microwaveDate, setMicrowaveDate,
        microwaveType, setMicrowaveType
    };

    // Other Kitchen Appliances
    const [counterCondition, setCounterCondition] = useState<string>('');
    const [counterDate, setCounterDate] = useState<Dayjs | null>(dayjs());
    const [cabinetCondition, setCabinetCondition] = useState<string>('');
    const [cabinetDate, setCabinetDate] = useState<Dayjs | null>(dayjs());
    const [sinkCondition, setSinkCondition] = useState<string>('');
    const [sinkDate, setSinkDate] =  useState<Dayjs | null>(dayjs());
    const [garbageCondition, setGarbageCondition] = useState<string>('');
    const [garbageDate, setGarbageDate] = useState<Dayjs | null>(dayjs());
    const otherKitchenAppliances = {
        counterCondition, setCounterCondition,
        counterDate, setCounterDate,
        cabinetCondition, setCabinetCondition,
        cabinetDate, setCabinetDate,
        sinkCondition, setSinkCondition,
        sinkDate, setSinkDate,
        garbageCondition, setGarbageCondition,
        garbageDate, setGarbageDate
    };

    const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
    useEffect(() => {
        if (isDataLoading) {
            axios.get(`/api/appliances/${propertyId}`)
                .then((response) => {
                    const data = response.data[0];
                    setHeaterType(data.heat_type);
                    setHeaterFilterWSize(data.heat_w_filter);
                    setHeaterFilterLSize(data.heat_l_filter);
                    setHeaterFilterDSize(data.heat_d_filter);
                    setHeaterCondition(data.heat_condition);
                    setHeaterDate(data.heat_date ? dayjs(data.heat_date) : null);
                    const tmpCoolingType = [];
                    if (data.cool_hvac_type) tmpCoolingType.push('HVAC');
                    if (data.cool_window_type) tmpCoolingType.push('Window');
                    setCoolingType(tmpCoolingType);
                    setCoolingHVACCondition(data.cool_hvac_condition);
                    setCoolingWindowCondition(data.cool_wind_condition);
                    setCoolingWindowAmount(data.cool_wind_num);
                    setCoolingHVACDate(data.cool_hvac_date ? dayjs(data.cool_hvac_date) : null);
                    setCoolingWindowDate(data.cool_wind_date ? dayjs(data.cool_wind_date) : null);
                    setHotWaterTankCondition(data.watertank_condition);
                    setHotWaterTankDate(data.watertank_date ? dayjs(data.watertank_date) : null);
                    setCombined(data.wd_combined);
                    setWasherCondition(data.washer_condition);
                    setDryerCondition(data.dryer_condition);
                    setWasherBrand(data.washer_brand);
                    setDryerBrand(data.dryer_brand);
                    setWasherDate(data.washer_date ? dayjs(data.washer_date) : null);
                    setDryerDate(data.dryer_date ? dayjs(data.dryer_date) : null);
                    setFridgeCondition(data.fridge_condition);
                    setFridgeBrand(data.fridge_brand);
                    setFridgeDate(data.fridge_date ? dayjs(data.fridge_date) : null);
                    setStoveCondition(data.stove_condition);
                    setStoveBrand(data.stove_brand);
                    setStoveType(data.stove_type);
                    setStoveDate(data.stove_date ? dayjs(data.stove_date) : null);
                    setDishwasherCondition(data.dish_condition);
                    setDishwasherBrand(data.dish_brand);
                    setDishwasherDate(data.dish_date ? dayjs(data.dish_date) : null);
                    setMicrowaveCondition(data.mw_condition);
                    setMicrowaveBrand(data.mw_brand);
                    setMicrowaveType(data.mw_type);
                    setMicrowaveDate(data.mw_date ? dayjs(data.mw_date) : null);
                    setCounterCondition(data.counter_condition);
                    setCounterDate(data.counter_date ? dayjs(data.counter_date) : null);
                    setCabinetCondition(data.cabinet_condition);
                    setCabinetDate(data.cabinet_date ? dayjs(data.cabinet_date) : null);
                    setSinkCondition(data.sink_condition);
                    setSinkDate(data.sink_date ? dayjs(data.sink_date) : null);
                    setGarbageCondition(data.garbage_condition);
                    setGarbageDate(data.garbage_date ? dayjs(data.garbage_date) : null);
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
                })
                .finally(() => {
                    setIsDataLoading(false);
                });
        };
    }, [setIsDataLoading]);

    //TODO: Submit Handler
    const handleSubmit = async () => {
        const data = {
            heat_type: heaterType,
            heat_w_filter: heaterFilterWSize,
            heat_l_filter: heaterFilterLSize,
            heat_d_filter: heaterFilterDSize,
            heat_condition: heaterCondition,
            heat_date: heaterDate ? heaterDate.toISOString().split('T')[0] : null,
            cool_hvac_type: coolingType.includes('HVAC') ? 'HVAC' : null,
            cool_hvac_condition: coolingHVACCondition,
            cool_hvac_date: coolingHVACDate ? coolingHVACDate.toISOString().split('T')[0]: null,
            cool_window_type: coolingType.includes('Window') ? 'Window' : null,
            cool_wind_condition: coolingWindowCondition,
            cool_wind_date: coolingWindowDate ? coolingWindowDate.toISOString().split('T')[0] : null,
            cool_wind_num: coolingWindowAmount,
            watertank_condition: hotWaterTankCondition,
            watertank_date: hotWaterTankDate ? hotWaterTankDate.toISOString().split('T')[0] : null,
            wd_combined: combined,
            washer_condition: washerCondition,
            dryer_condition: dryerCondition,
            washer_brand: washerBrand,
            dryer_brand: dryerBrand,
            washer_date: washerDate ? washerDate.toISOString().split('T')[0] : null,
            dryer_date: dryerDate ? dryerDate.toISOString().split('T')[0] : null,
            fridge_condition: fridgeCondition,
            fridge_brand: fridgeBrand,
            fridge_date: fridgeDate ? fridgeDate.toISOString().split('T')[0] : null,
            stove_condition: stoveCondition,
            stove_brand: stoveBrand,
            stove_type: stoveType,
            stove_date: stoveDate ? stoveDate.toISOString().split('T')[0] : null,
            dish_condition: dishwasherCondition,
            dish_brand: dishwasherBrand,
            dish_date: dishwasherDate ? dishwasherDate.toISOString().split('T')[0] : null,
            mw_condition: microwaveCondition,
            mw_brand: microwaveBrand,
            mw_type: microwaveType,
            mw_date: microwaveDate ? microwaveDate.toISOString().split('T')[0] : null,
            counter_condition: counterCondition,
            counter_date: counterDate ? counterDate.toISOString().split('T')[0] : null,
            cabinet_condition: cabinetCondition,
            cabinet_date: cabinetDate ? cabinetDate.toISOString().split('T')[0] : null,
            sink_condition: sinkCondition,
            sink_date: sinkDate ? sinkDate.toISOString().split('T')[0] : null,
            garbage_condition: garbageCondition,
            garbage_date: garbageDate ? garbageDate.toISOString().split('T')[0] : null
        };
        axios.post(`/api/appliances/${propertyId}`, data)
            .then((response) => {
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

    return (
        <div className="space-y-8">
            <Accordion selectionMode="multiple">
                <AccordionItem
                    key="1" 
                    aria-label="Heating & Cooling" 
                    title="Heating & Cooling"
                    subtitle="Heater, Cooling, Hot Water Tank"
                    isDisabled={isDataLoading}
                >
                    <HeatingCoolingSection {...heatingCooling} />
                </AccordionItem>
                <AccordionItem
                    key="2" 
                    aria-label="Washer & Dryer" 
                    title="Washer & Dryer"
                    subtitle="Washer, Dryer"
                    isDisabled={isDataLoading}
                >
                    <WasherDryerSection {...washerDyer} />
                </AccordionItem>
                <AccordionItem
                    key="3" 
                    aria-label="Kitchen Appliances" 
                    title="Kitchen Appliances"
                    subtitle="Fridge, Dishwasher, Stove, Microwave"
                    isDisabled={isDataLoading}
                >
                    <KitchenSection {...kitchenAppliances} />
                </AccordionItem>
                <AccordionItem
                    key="4" 
                    aria-label="Other Kitchen Appliances" 
                    title="Other Kitchen Appliances"
                    subtitle="Counter, Cabinet, Sink, Garbage"
                    isDisabled={isDataLoading}
                >
                    <OtherKitchenSection {...otherKitchenAppliances} />
                </AccordionItem>
            </Accordion>
            <AddButton
                text="Update Appliances"
                icon={GrDocumentUpdate}
                onPressModal={handleSubmit}
            />
        </div>
    );
};

export default AppliancesForm;