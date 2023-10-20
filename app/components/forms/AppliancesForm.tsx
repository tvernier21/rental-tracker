"use client";

import { useState } from "react";
import {
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Input,
    Divider
} from "@nextui-org/react"
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

    // Hot Water Tank
    const [hotWaterTankCondition, setHotWaterTankCondition] = useState<string>('');
    const [hotWaterTankDate, setHotWaterTankDate] = useState<Dayjs | null>(dayjs());

    // washer and dryer
    const [combined, setCombined] = useState<boolean>(false);
    const [washerCondition, setWasherCondition] = useState<string>('');
    const [dryerCondition, setDryerCondition] = useState<string>('');
    const [washerDate, setWasherDate] = useState<Dayjs | null>(dayjs());
    const [dryerDate, setDryerDate] = useState<Dayjs | null>(dayjs());
    const [washerBrand, setWasherBrand] = useState<string>('');
    const [dryerBrand, setDryerBrand] = useState<string>('');

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

    // Other Kitchen Appliances
    const [counterCondition, setCounterCondition] = useState<string>('');
    const [counterDate, setCounterDate] = useState<Dayjs | null>(dayjs());
    const [cabinetCondition, setCabinetCondition] = useState<string>('');
    const [cabinetDate, setCabinetDate] = useState<Dayjs | null>(dayjs());
    const [sinkCondition, setSinkCondition] = useState<string>('');
    const [sinkDate, setSinkDate] =  useState<Dayjs | null>(dayjs());
    const [garbageCondition, setGarbageCondition] = useState<string>('');
    const [garbageDate, setGarbageDate] = useState<Dayjs | null>(dayjs());



    return (
        <div className="space-y-8">
            <div className="space-y-5">
                <h2 className="text-lg font-medium">Heating & Cooling</h2>
                <div className="flex items-start justify-between">
                    <RadioGroup
                        label="Heater-Type"
                        value={heaterType}
                        onValueChange={setHeaterType}
                        orientation="horizontal"
                    >
                        <Radio value="hvac">HVAC</Radio>
                        <Radio value="boiler">Boiler</Radio>
                        <Radio value="other">Other</Radio>
                    </RadioGroup>
                    {heaterType === 'hvac' && (
                        <RadioGroup
                            label="Filter Size"
                            value={heaterFilterSize}
                            onValueChange={setHeaterFilterSize}
                            orientation="horizontal"
                        >
                            <Radio value="hvac">HVAC</Radio>
                            <Radio value="boiler">Boiler</Radio>
                            <Radio value="other">Other</Radio>
                        </RadioGroup>
                    )}
                </div>
                <RadioGroup
                    label="Heater-Condition"
                    value={heaterCondition}
                    onValueChange={setHeaterCondition}
                    orientation="horizontal"
                >
                    <Radio value="normal">Normal</Radio>
                    <Radio value="old">Old (replace)</Radio>
                    <Radio value="repair">Repair</Radio>
                    <Radio value="other">Other</Radio>
                </RadioGroup>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <ThemeProvider theme={theme}>
                            <DatePicker
                                label="Heater-Date"
                                value={heaterDate}
                                onChange={(newDate) => setHeaterDate(newDate)}
                                // className='w-full'
                                />
                        </ThemeProvider>
                    </LocalizationProvider>
                </div>
                <CheckboxGroup
                    label="Cooling-Types"
                    value={coolingType}
                    onValueChange={setCoolingType}
                    orientation="horizontal"
                >
                    <Checkbox value="hvac">HVAC</Checkbox>
                    <Checkbox value="window">Window</Checkbox>
                </CheckboxGroup>
                {coolingType.includes('hvac') && (
                    <>
                        <RadioGroup
                            label="Cooling-HVAC Condition"
                            value={coolingHVACCondition}
                            onValueChange={setCoolingHVACCondition}
                            orientation="horizontal"
                        >
                            <Radio value="normal">Normal</Radio>
                            <Radio value="old">Old (replace)</Radio>
                            <Radio value="repair">Repair</Radio>
                            <Radio value="other">Other</Radio>
                        </RadioGroup>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <ThemeProvider theme={theme}>
                                <DatePicker
                                    label="Cooling-HVAC Date"
                                    value={coolingHVACDate}
                                    onChange={(newDate) => setCoolingHVACDate(newDate)}
                                    // className='w-full'
                                    />
                            </ThemeProvider>
                        </LocalizationProvider>
                    </>   
                )}
                {coolingType.includes('window') && (
                    <>
                        <RadioGroup
                            label="Cooling-Window Condition"
                            value={coolingWindowCondition}
                            onValueChange={setCoolingWindowCondition}
                            orientation="horizontal"
                        >
                            <Radio value="normal">Normal</Radio>
                            <Radio value="old">Old (replace)</Radio>
                            <Radio value="repair">Repair</Radio>
                            <Radio value="other">Other</Radio>
                        </RadioGroup>
                        <div className="max-w-[350px]">
                            <Input
                                type="number"
                                label="Cooling-Window Amount"
                                placeholder="0"
                                variant="bordered"
                                value={coolingWindowAmount}
                                onValueChange={setCoolingWindowAmount}
                                startContent={
                                    <div className="">
                                        <span className="text-default-400 text-small">#</span>
                                    </div>
                                }
                            />
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <ThemeProvider theme={theme}>
                                <DatePicker
                                    label="Cooling-HVAC Date"
                                    value={coolingWindowDate}
                                    onChange={(newDate) => setCoolingWindowDate(newDate)}
                                    // className='w-full'
                                    />
                            </ThemeProvider>
                        </LocalizationProvider>
                    </>      
                )}
                <Divider />
                <div className="space-y-5">
                    <h2 className="text-lg font-medium">Hot Water tank</h2>
                    <RadioGroup
                        label="Hot Water Tank Condition"
                        value={hotWaterTankCondition}
                        onValueChange={setHotWaterTankCondition}
                        orientation="horizontal"
                    >
                        <Radio value="normal">Normal</Radio>
                        <Radio value="old">Old (replace)</Radio>
                        <Radio value="repair">Repair</Radio>
                        <Radio value="other">Other</Radio>
                    </RadioGroup>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <ThemeProvider theme={theme}>
                            <DatePicker
                                label="Hot Water Tank Date"
                                value={hotWaterTankDate}
                                onChange={(newDate) => setHotWaterTankDate(newDate)}
                                // className='w-full'
                                />
                        </ThemeProvider>
                    </LocalizationProvider>
                </div>
                <Divider />
                <div className="space-y-5">
                    <h2 className="text-lg font-medium">Washer & Dryer</h2>
                    <Checkbox
                        isSelected={combined}
                        onValueChange={setCombined}
                    >
                        Combined
                    </Checkbox>
                    <div className="grid grid-cols-2 gap-5">
                        <RadioGroup
                            label="Washer Condition"
                            value={washerCondition}
                            onValueChange={setWasherCondition}
                            orientation="horizontal"
                        >
                            <Radio value="normal">Normal</Radio>
                            <Radio value="old">Old (replace)</Radio>
                            <Radio value="repair">Repair</Radio>
                            <Radio value="other">Other</Radio>
                        </RadioGroup>
                        <RadioGroup
                            label="Dryer Condition"
                            value={dryerCondition}
                            onValueChange={setDryerCondition}
                            orientation="horizontal"
                            isReadOnly={combined}
                        >
                            <Radio value="normal">Normal</Radio>
                            <Radio value="old">Old (replace)</Radio>
                            <Radio value="repair">Repair</Radio>
                            <Radio value="other">Other</Radio>
                        </RadioGroup>
                        <Input
                            label="Washer Brand"
                            placeholder="Brand"
                            variant="bordered"
                            value={washerBrand}
                            onValueChange={setWasherBrand}
                            disabled={combined}
                        />
                        <Input
                            label="Dryer Brand"
                            placeholder="Brand"
                            variant="bordered"
                            value={dryerBrand}
                            onValueChange={setDryerBrand}
                            disabled={combined}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <ThemeProvider theme={theme}>
                                <DatePicker
                                    label="Washer Date"
                                    value={washerDate}
                                    onChange={(newDate) => setWasherDate(newDate)}
                                    // className='w-full'
                                    />
                            </ThemeProvider>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <ThemeProvider theme={theme}>
                                <DatePicker
                                    label="Dryer Date"
                                    value={dryerDate}
                                    onChange={(newDate) => setDryerDate(newDate)}
                                    readOnly={combined}
                                    // className='w-full'
                                    />
                            </ThemeProvider>
                        </LocalizationProvider>
                    </div>
                </div>
                <Divider />
                <div className="space-y-5">
                    <p className="text-lg font-medium">Kitchen Appliances</p>
                </div>
            </div>
        </div>
    );
};

export default AppliancesForm;