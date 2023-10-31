"use client";

import {
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Input
} from "@nextui-org/react";
import { Dayjs } from 'dayjs';
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

interface HeatingCoolingSectionProps {
    heaterType: string;
    setHeaterType: (heaterType: string) => void;
    heaterFilterWSize: string;
    setHeaterFilterWSize: (heaterFilterWSize: string) => void;
    heaterFilterLSize: string;
    setHeaterFilterLSize: (heaterFilterLSize: string) => void;
    heaterFilterDSize: string;
    setHeaterFilterDSize: (heaterFilterDSize: string) => void;
    heaterDate: Dayjs | null;
    setHeaterDate: (heaterDate: Dayjs | null) => void;
    heaterCondition: string;
    setHeaterCondition: (heaterCondition: string) => void;
    coolingType: string[];
    setCoolingType: (coolingType: string[]) => void;
    coolingHVACCondition: string;
    setCoolingHVACCondition: (coolingHVACCondition: string) => void;
    coolingWindowCondition: string;
    setCoolingWindowCondition: (coolingWindowCondition: string) => void;
    coolingHVACDate: Dayjs | null;
    setCoolingHVACDate: (coolingHVACDate: Dayjs | null) => void;
    coolingWindowDate: Dayjs | null;
    setCoolingWindowDate: (coolingWindowDate: Dayjs | null) => void;
    coolingWindowAmount: string;
    setCoolingWindowAmount: (coolingWindowAmount: string) => void;
    hotWaterTankCondition: string;
    setHotWaterTankCondition: (hotWaterTankCondition: string) => void;
    hotWaterTankDate: Dayjs | null;
    setHotWaterTankDate: (hotWaterTankDate: Dayjs | null) => void;
};

const HeatingCoolingSection: React.FC<HeatingCoolingSectionProps> = ({
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
}) => {

    return (
        <div className="space-y-5 pb-5">
            <p className="font-small">Heating</p>
            <div className="ml-6 space-y-5">
                <div className="grid grid-cols-2">
                    <RadioGroup
                        label="Type"
                        value={heaterType}
                        onValueChange={setHeaterType}
                        orientation="horizontal"
                    >
                        <Radio value="boiler">Boiler</Radio>
                        <Radio value="hvac">HVAC</Radio>
                        <Radio value="other">Other</Radio>
                    </RadioGroup>
                    {heaterType === 'hvac' && (
                        <div>
                            <p className="font-small text-md text-gray-400">Filter Size</p>
                            <div className="flex flex-row gap-2 pt-2">
                                <Input
                                    type="number"
                                    label="W"
                                    labelPlacement="outside-left"
                                    placeholder="16"
                                    variant="bordered"
                                    radius="sm"
                                    value={heaterFilterWSize}
                                    onValueChange={setHeaterFilterWSize}
                                    />
                                <Input
                                    type="number"
                                    label="L"
                                    labelPlacement="outside-left"
                                    placeholder="16"
                                    variant="bordered"
                                    radius="sm"
                                    value={heaterFilterLSize}
                                    onValueChange={setHeaterFilterLSize}
                                />
                                <Input
                                    type="number"
                                    label="D"
                                    labelPlacement="outside-left"
                                    placeholder="1"
                                    variant="bordered"
                                    radius="sm"
                                    value={heaterFilterDSize}
                                    onValueChange={setHeaterFilterDSize}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <RadioGroup
                    label="Condition"
                    value={heaterCondition}
                    onValueChange={setHeaterCondition}
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
                            label="Date"
                            value={heaterDate}
                            onChange={(newDate) => setHeaterDate(newDate)}
                            // className='w-full'
                        />
                    </ThemeProvider>
                </LocalizationProvider>
            </div>
            <p className="font-small">Cooling</p>
            <div className="ml-6 space-y-5">
                <CheckboxGroup
                    label="Types"
                    value={coolingType}
                    onValueChange={setCoolingType}
                    orientation="horizontal"
                >
                    <Checkbox value="window">Window</Checkbox>
                    <Checkbox value="hvac">HVAC</Checkbox>
                </CheckboxGroup>
                { coolingType.length !== 0 && (   
                    <div className="grid grid-rows-3 grid-flow-col gap-5">
                        {coolingType.includes('window') && (
                            <>
                                <RadioGroup
                                    label="Window Condition"
                                    value={coolingWindowCondition}
                                    onValueChange={setCoolingWindowCondition}
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
                                            label="Window Date"
                                            value={coolingWindowDate}
                                            onChange={(newDate) => setCoolingWindowDate(newDate)}
                                            // className='w-full'
                                            />
                                    </ThemeProvider>
                                </LocalizationProvider>
                                <div className="max-w-[450px]">
                                    <Input
                                        type="number"
                                        label="Window Amount"
                                        placeholder="0"
                                        variant="bordered"
                                        radius="sm"
                                        value={coolingWindowAmount}
                                        onValueChange={setCoolingWindowAmount}
                                        startContent={
                                            <div className="">
                                                <span className="text-default-400 text-small">#</span>
                                            </div>
                                        }
                                        />
                                </div>
                            </>      
                        )}
                        {coolingType.includes('hvac') && (
                            <>
                                <RadioGroup
                                    label="HVAC Condition"
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
                                            label="HVAC Date"
                                            value={coolingHVACDate}
                                            onChange={(newDate) => setCoolingHVACDate(newDate)}
                                            // className='w-full'
                                            />
                                    </ThemeProvider>
                                </LocalizationProvider>
                            </>   
                        )}
                    </div>
                )}
            </div>
            <p className="font-small">Hot Water Tank</p>
            <div className="ml-6 space-y-5">
                <RadioGroup
                    label="Condition"
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
                            label="Date"
                            value={hotWaterTankDate}
                            onChange={(newDate) => setHotWaterTankDate(newDate)}
                            // className='w-full'
                            />
                    </ThemeProvider>
                </LocalizationProvider>
            </div>
        </div>
    );
};

export default HeatingCoolingSection;
