"use client";

import { useEffect, useState } from "react";
import {
    Accordion, 
    AccordionItem,
} from "@nextui-org/react"
import dayjs, { Dayjs } from 'dayjs';
import axios from "axios";
import toast from "react-hot-toast";

// Components
import HeatingCoolingSection from "./appliances/HeatingCoolingSection";
import WasherDryerSection from "./appliances/washerDryerSection";
import KitchenSection from "./appliances/KitchenSection";
import OtherKitchenSection from "./appliances/OtherKitchenSection";
// import AddButton from "../UI/AddButton";
import useAppliances from "@/app/hooks/useAppliances";

interface AppliancesFormProps {
    propertyId: string
}

const AppliancesForm: React.FC<AppliancesFormProps> = ({
    propertyId
}) => {
    const appliances = useAppliances();
    //  // Heater and Cooling
    // const [heaterType, setHeaterType] = useState<string>('');
    // const [heaterFilterWSize, setHeaterFilterWSize] = useState<string>('');
    // const [heaterFilterLSize, setHeaterFilterLSize] = useState<string>('');
    // const [heaterFilterDSize, setHeaterFilterDSize] = useState<string>('');
    // const [heaterDate, setHeaterDate] = useState<Dayjs | null>(dayjs());
    // const [heaterCondition, setHeaterCondition] = useState<string>('');
    // const [coolingType, setCoolingType] = useState([] as string[]);
    // const [coolingHVACCondition, setCoolingHVACCondition] = useState<string>('');
    // const [coolingWindowCondition, setCoolingWindowCondition] = useState<string>('');
    // const [coolingHVACDate, setCoolingHVACDate] = useState<Dayjs | null>(dayjs());
    // const [coolingWindowDate, setCoolingWindowDate] = useState<Dayjs | null>(dayjs());
    // const [coolingWindowAmount, setCoolingWindowAmount] = useState<string>('');
    // const [hotWaterTankCondition, setHotWaterTankCondition] = useState<string>('');
    // const [hotWaterTankDate, setHotWaterTankDate] = useState<Dayjs | null>(dayjs());
    // const heatingCooling = {
    //     heaterType, setHeaterType,
    //     heaterFilterWSize, setHeaterFilterWSize,
    //     heaterFilterLSize, setHeaterFilterLSize,
    //     heaterFilterDSize, setHeaterFilterDSize,
    //     heaterDate, setHeaterDate,
    //     heaterCondition, setHeaterCondition,
    //     coolingType, setCoolingType,
    //     coolingHVACCondition,setCoolingHVACCondition,
    //     coolingWindowCondition, setCoolingWindowCondition,
    //     coolingHVACDate, setCoolingHVACDate,
    //     coolingWindowDate, setCoolingWindowDate,
    //     coolingWindowAmount, setCoolingWindowAmount,
    //     hotWaterTankCondition, setHotWaterTankCondition,
    //     hotWaterTankDate, setHotWaterTankDate
    // };

    // // washer and dryer
    // const [combined, setCombined] = useState<boolean>(false);
    // const [washerCondition, setWasherCondition] = useState<string>('');
    // const [dryerCondition, setDryerCondition] = useState<string>('');
    // const [washerDate, setWasherDate] = useState<Dayjs | null>(dayjs());
    // const [dryerDate, setDryerDate] = useState<Dayjs | null>(dayjs());
    // const [washerBrand, setWasherBrand] = useState<string>('');
    // const [dryerBrand, setDryerBrand] = useState<string>('');
    // const washerDyer = {
    //     combined, setCombined,
    //     washerCondition, setWasherCondition,
    //     dryerCondition, setDryerCondition,
    //     washerDate, setWasherDate,
    //     dryerDate, setDryerDate,
    //     washerBrand, setWasherBrand,
    //     dryerBrand, setDryerBrand
    // };

    // // Kitchen Appliances
    // const [fridgeCondition, setFridgeCondition] = useState<string>('');
    // const [fridgeBrand, setFridgeBrand] = useState<string>('');
    // const [fridgeDate, setFridgeDate] = useState<Dayjs | null>(dayjs());
    // const [stoveCondition, setStoveCondition] = useState<string>('');
    // const [stoveBrand, setStoveBrand] = useState<string>('');
    // const [stoveDate, setStoveDate] = useState<Dayjs | null>(dayjs());
    // const [stoveType, setStoveType] = useState<string>('');
    // const [dishwasherCondition, setDishwasherCondition] = useState<string>('');
    // const [dishwasherBrand, setDishwasherBrand] = useState<string>('');
    // const [dishwasherDate, setDishwasherDate] = useState<Dayjs | null>(dayjs());
    // const [microwaveCondition, setMicrowaveCondition] = useState<string>('');
    // const [microwaveBrand, setMicrowaveBrand] = useState<string>('');
    // const [microwaveDate, setMicrowaveDate] = useState<Dayjs | null>(dayjs());
    // const [microwaveType, setMicrowaveType] = useState<string>('');
    // const kitchenAppliances = {
    //     fridgeCondition, setFridgeCondition,
    //     fridgeBrand, setFridgeBrand,
    //     fridgeDate, setFridgeDate,
    //     stoveCondition, setStoveCondition,
    //     stoveBrand, setStoveBrand,
    //     stoveDate, setStoveDate,
    //     stoveType, setStoveType,
    //     dishwasherCondition, setDishwasherCondition,
    //     dishwasherBrand, setDishwasherBrand,
    //     dishwasherDate, setDishwasherDate,
    //     microwaveCondition, setMicrowaveCondition,
    //     microwaveBrand, setMicrowaveBrand,
    //     microwaveDate, setMicrowaveDate,
    //     microwaveType, setMicrowaveType
    // };

    // // Other Kitchen Appliances
    // const [counterCondition, setCounterCondition] = useState<string>('');
    // const [counterDate, setCounterDate] = useState<Dayjs | null>(dayjs());
    // const [cabinetCondition, setCabinetCondition] = useState<string>('');
    // const [cabinetDate, setCabinetDate] = useState<Dayjs | null>(dayjs());
    // const [sinkCondition, setSinkCondition] = useState<string>('');
    // const [sinkDate, setSinkDate] =  useState<Dayjs | null>(dayjs());
    // const [garbageCondition, setGarbageCondition] = useState<string>('');
    // const [garbageDate, setGarbageDate] = useState<Dayjs | null>(dayjs());
    // const otherKitchenAppliances = {
    //     counterCondition, setCounterCondition,
    //     counterDate, setCounterDate,
    //     cabinetCondition, setCabinetCondition,
    //     cabinetDate, setCabinetDate,
    //     sinkCondition, setSinkCondition,
    //     sinkDate, setSinkDate,
    //     garbageCondition, setGarbageCondition,
    //     garbageDate, setGarbageDate
    // };

    const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
    useEffect(() => {
        if (isDataLoading) {
            axios.get(`/api/appliances/${propertyId}`)
                .then((response) => {
                    const data = response.data[0];
                    appliances.setHeaterType(data.heat_type);
                    appliances.setHeaterFilterWSize(data.heat_w_filter);
                    appliances.setHeaterFilterLSize(data.heat_l_filter);
                    appliances.setHeaterFilterDSize(data.heat_d_filter);
                    appliances.setHeaterCondition(data.heat_condition);
                    appliances.setHeaterDate(data.heat_date ? dayjs(data.heat_date) : null);
                    const tmpCoolingType = [];
                    if (data.cool_hvac_type) tmpCoolingType.push('HVAC');
                    if (data.cool_window_type) tmpCoolingType.push('Window');
                    appliances.setCoolingType(tmpCoolingType);
                    appliances.setCoolingHVACCondition(data.cool_hvac_condition);
                    appliances.setCoolingWindowCondition(data.cool_wind_condition);
                    appliances.setCoolingWindowAmount(data.cool_wind_num);
                    appliances.setCoolingHVACDate(data.cool_hvac_date ? dayjs(data.cool_hvac_date) : null);
                    appliances.setCoolingWindowDate(data.cool_wind_date ? dayjs(data.cool_wind_date) : null);
                    appliances.setHotWaterTankCondition(data.watertank_condition);
                    appliances.setHotWaterTankDate(data.watertank_date ? dayjs(data.watertank_date) : null);
                    appliances.setCombined(data.wd_combined);
                    appliances.setWasherCondition(data.washer_condition);
                    appliances.setDryerCondition(data.dryer_condition);
                    appliances.setWasherBrand(data.washer_brand);
                    appliances.setDryerBrand(data.dryer_brand);
                    appliances.setWasherDate(data.washer_date ? dayjs(data.washer_date) : null);
                    appliances.setDryerDate(data.dryer_date ? dayjs(data.dryer_date) : null);
                    appliances.setFridgeCondition(data.fridge_condition);
                    appliances.setFridgeBrand(data.fridge_brand);
                    appliances.setFridgeDate(data.fridge_date ? dayjs(data.fridge_date) : null);
                    appliances.setStoveCondition(data.stove_condition);
                    appliances.setStoveBrand(data.stove_brand);
                    appliances.setStoveType(data.stove_type);
                    appliances.setStoveDate(data.stove_date ? dayjs(data.stove_date) : null);
                    appliances.setDishwasherCondition(data.dish_condition);
                    appliances.setDishwasherBrand(data.dish_brand);
                    appliances.setDishwasherDate(data.dish_date ? dayjs(data.dish_date) : null);
                    appliances.setMicrowaveCondition(data.mw_condition);
                    appliances.setMicrowaveBrand(data.mw_brand);
                    appliances.setMicrowaveType(data.mw_type);
                    appliances.setMicrowaveDate(data.mw_date ? dayjs(data.mw_date) : null);
                    appliances.setCounterCondition(data.counter_condition);
                    appliances.setCounterDate(data.counter_date ? dayjs(data.counter_date) : null);
                    appliances.setCabinetCondition(data.cabinet_condition);
                    appliances.setCabinetDate(data.cabinet_date ? dayjs(data.cabinet_date) : null);
                    appliances.setSinkCondition(data.sink_condition);
                    appliances.setSinkDate(data.sink_date ? dayjs(data.sink_date) : null);
                    appliances.setGarbageCondition(data.garbage_condition);
                    appliances.setGarbageDate(data.garbage_date ? dayjs(data.garbage_date) : null);
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
            heat_type: appliances.heaterType,
            heat_w_filter: appliances.heaterFilterWSize,
            heat_l_filter: appliances.heaterFilterLSize,
            heat_d_filter: appliances.heaterFilterDSize,
            heat_condition: appliances.heaterCondition,
            heat_date: appliances.heaterDate ? appliances.heaterDate.toISOString().split('T')[0] : null,
            cool_hvac_type: appliances.coolingType.includes('HVAC') ? 'HVAC' : null,
            cool_hvac_condition: appliances.coolingHVACCondition,
            cool_hvac_date: appliances.coolingHVACDate ? appliances.coolingHVACDate.toISOString().split('T')[0]: null,
            cool_window_type: appliances.coolingType.includes('Window') ? 'Window' : null,
            cool_wind_condition: appliances.coolingWindowCondition,
            cool_wind_date: appliances.coolingWindowDate ? appliances.coolingWindowDate.toISOString().split('T')[0] : null,
            cool_wind_num: appliances.coolingWindowAmount,
            watertank_condition: appliances.hotWaterTankCondition,
            watertank_date: appliances.hotWaterTankDate ? appliances.hotWaterTankDate.toISOString().split('T')[0] : null,
            wd_combined: appliances.combined,
            washer_condition: appliances.washerCondition,
            dryer_condition: appliances.dryerCondition,
            washer_brand: appliances.washerBrand,
            dryer_brand: appliances.dryerBrand,
            washer_date: appliances.washerDate ? appliances.washerDate.toISOString().split('T')[0] : null,
            dryer_date: appliances.dryerDate ? appliances.dryerDate.toISOString().split('T')[0] : null,
            fridge_condition: appliances.fridgeCondition,
            fridge_brand: appliances.fridgeBrand,
            fridge_date: appliances.fridgeDate ? appliances.fridgeDate.toISOString().split('T')[0] : null,
            stove_condition: appliances.stoveCondition,
            stove_brand: appliances.stoveBrand,
            stove_type: appliances.stoveType,
            stove_date: appliances.stoveDate ? appliances.stoveDate.toISOString().split('T')[0] : null,
            dish_condition: appliances.dishwasherCondition,
            dish_brand: appliances.dishwasherBrand,
            dish_date: appliances.dishwasherDate ? appliances.dishwasherDate.toISOString().split('T')[0] : null,
            mw_condition: appliances.microwaveCondition,
            mw_brand: appliances.microwaveBrand,
            mw_type: appliances.microwaveType,
            mw_date: appliances.microwaveDate ? appliances.microwaveDate.toISOString().split('T')[0] : null,
            counter_condition: appliances.counterCondition,
            counter_date: appliances.counterDate ? appliances.counterDate.toISOString().split('T')[0] : null,
            cabinet_condition: appliances.cabinetCondition,
            cabinet_date: appliances.cabinetDate ? appliances.cabinetDate.toISOString().split('T')[0] : null,
            sink_condition: appliances.sinkCondition,
            sink_date: appliances.sinkDate ? appliances.sinkDate.toISOString().split('T')[0] : null,
            garbage_condition: appliances.garbageCondition,
            garbage_date: appliances.garbageDate ? appliances.garbageDate.toISOString().split('T')[0] : null
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
                    <HeatingCoolingSection appliances={appliances} />
                </AccordionItem>
                <AccordionItem
                    key="2" 
                    aria-label="Washer & Dryer" 
                    title="Washer & Dryer"
                    subtitle="Washer, Dryer"
                    isDisabled={isDataLoading}
                >
                    <WasherDryerSection appliances={appliances} />
                </AccordionItem>
                <AccordionItem
                    key="3" 
                    aria-label="Kitchen Appliances" 
                    title="Kitchen Appliances"
                    subtitle="Fridge, Dishwasher, Stove, Microwave"
                    isDisabled={isDataLoading}
                >
                    <KitchenSection appliances={appliances} />
                </AccordionItem>
                <AccordionItem
                    key="4" 
                    aria-label="Other Kitchen Appliances" 
                    title="Other Kitchen Appliances"
                    subtitle="Counter, Cabinet, Sink, Garbage"
                    isDisabled={isDataLoading}
                >
                    <OtherKitchenSection appliances={appliances} />
                </AccordionItem>
            </Accordion>
            {/* <AddButton
                text="Update Appliances"
                icon={GrDocumentUpdate}
                onPressModal={handleSubmit}
            /> */}
        </div>
    );
};

export default AppliancesForm;