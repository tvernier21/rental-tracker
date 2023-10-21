"use client";

import { useState } from "react";
import {
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Accordion, 
    AccordionItem,
    Input,
    Divider
} from "@nextui-org/react"
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Components
import HeatingCoolingSection from "./appliances/HeatingCoolingSection";
import WasherDryerSection from "./appliances/washerDryerSection";
import KitchenSection from "./appliances/KitchenSection";
import OtherKitchenSection from "./appliances/OtherKitchenSection";

// Calendar Date Picker Theme
const color = "#D3D3D3";
const theme = createTheme({
    components: {
      MuiIconButton: {
        styleOverrides: {
          sizeMedium: {
            color
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color
          },
          notchedOutline: {
            borderColor: color,
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color,
            "&.Mui-focused": {
              color
            }
          }
        }
      }
    }
});

interface AppliancesFormProps {
    propertyId: string
}

const AppliancesForm: React.FC<AppliancesFormProps> = ({
    propertyId 
}) => {
    // Heater and Cooling
    const [heaterType, setHeaterType] = useState<string>('');
    const [heaterFilterSize, setHeaterFilterSize] = useState<string>('');
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
        heaterFilterSize, setHeaterFilterSize,
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



    return (
        <div className="space-y-8">
            <div className="space-y-5">
                <Accordion selectionMode="multiple">
                    <AccordionItem
                        key="1" 
                        aria-label="Heating & Cooling" 
                        title="Heating & Cooling"
                        subtitle="Heater, Cooling, Hot Water Tank"
                    >
                        <HeatingCoolingSection {...heatingCooling} />
                    </AccordionItem>
                    <AccordionItem
                        key="2" 
                        aria-label="Washer & Dryer" 
                        title="Washer & Dryer"
                        subtitle="Washer, Dryer"
                    >
                        <WasherDryerSection {...washerDyer} />
                    </AccordionItem>
                    <AccordionItem
                        key="3" 
                        aria-label="Kitchen Appliances" 
                        title="Kitchen Appliances"
                        subtitle="Fridge, Dishwasher, Stove, Microwave"
                    >
                        <KitchenSection {...kitchenAppliances} />
                    </AccordionItem>
                    <AccordionItem
                        key="4" 
                        aria-label="Other Kitchen Appliances" 
                        title="Other Kitchen Appliances"
                        subtitle="Counter, Cabinet, Sink, Garbage"
                    >
                        <OtherKitchenSection {...otherKitchenAppliances} />
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};

export default AppliancesForm;