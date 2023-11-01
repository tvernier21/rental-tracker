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

    useEffect(() => {
        if (appliances.isLoading) {
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
                    appliances.setIsLoading(false);
                });
        };
    }, [appliances.isLoading, propertyId, appliances.setIsLoading]);

    return (
        <div className="space-y-8">
            <Accordion selectionMode="multiple">
                <AccordionItem
                    key="1" 
                    aria-label="Heating & Cooling" 
                    title="Heating & Cooling"
                    subtitle="Heater, Cooling, Hot Water Tank"
                    isDisabled={appliances.isLoading}
                >
                    <HeatingCoolingSection />
                </AccordionItem>
                <AccordionItem
                    key="2" 
                    aria-label="Washer & Dryer" 
                    title="Washer & Dryer"
                    subtitle="Washer, Dryer"
                    isDisabled={appliances.isLoading}
                >
                    <WasherDryerSection />
                </AccordionItem>
                <AccordionItem
                    key="3" 
                    aria-label="Kitchen Appliances" 
                    title="Kitchen Appliances"
                    subtitle="Fridge, Dishwasher, Stove, Microwave"
                    isDisabled={appliances.isLoading}
                >
                    <KitchenSection />
                </AccordionItem>
                <AccordionItem
                    key="4" 
                    aria-label="Other Kitchen Appliances" 
                    title="Other Kitchen Appliances"
                    subtitle="Counter, Cabinet, Sink, Garbage"
                    isDisabled={appliances.isLoading}
                >
                    <OtherKitchenSection />
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