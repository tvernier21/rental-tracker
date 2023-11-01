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

import useAppliances from "@/app/hooks/useAppliances";

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
    appliances: any;
};

const HeatingCoolingSection: React.FC<HeatingCoolingSectionProps> = ({
    appliances
}) => {
    return (
        <div className="space-y-5 pb-5">
            <p className="font-small">Heating</p>
            <div className="ml-6 space-y-5">
                <div className="grid grid-cols-2">
                    <RadioGroup
                        label="Type"
                        value={appliances.heaterType}
                        onValueChange={appliances.setHeaterType}
                        orientation="horizontal"
                    >
                        <Radio value="boiler">Boiler</Radio>
                        <Radio value="hvac">HVAC</Radio>
                        <Radio value="other">Other</Radio>
                    </RadioGroup>
                    {appliances.heaterType === 'hvac' && (
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
                                    value={appliances.heaterFilterWSize}
                                    onValueChange={appliances.setHeaterFilterWSize}
                                    />
                                <Input
                                    type="number"
                                    label="L"
                                    labelPlacement="outside-left"
                                    placeholder="16"
                                    variant="bordered"
                                    radius="sm"
                                    value={appliances.heaterFilterLSize}
                                    onValueChange={appliances.setHeaterFilterLSize}
                                />
                                <Input
                                    type="number"
                                    label="D"
                                    labelPlacement="outside-left"
                                    placeholder="1"
                                    variant="bordered"
                                    radius="sm"
                                    value={appliances.heaterFilterDSize}
                                    onValueChange={appliances.setHeaterFilterDSize}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <RadioGroup
                    label="Condition"
                    value={appliances.heaterCondition}
                    onValueChange={appliances.setHeaterCondition}
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
                            value={appliances.heaterDate}
                            onChange={(newDate) => appliances.setHeaterDate(newDate)}
                            // className='w-full'
                        />
                    </ThemeProvider>
                </LocalizationProvider>
            </div>
            <p className="font-small">Cooling</p>
            <div className="ml-6 space-y-5">
                <CheckboxGroup
                    label="Types"
                    value={appliances.coolingType}
                    onValueChange={appliances.setCoolingType}
                    orientation="horizontal"
                >
                    <Checkbox value="window">Window</Checkbox>
                    <Checkbox value="hvac">HVAC</Checkbox>
                </CheckboxGroup>
                {appliances. coolingType.length !== 0 && (   
                    <div className="grid grid-rows-3 grid-flow-col gap-5">
                        {appliances.coolingType.includes('window') && (
                            <>
                                <RadioGroup
                                    label="Window Condition"
                                    value={appliances.coolingWindowCondition}
                                    onValueChange={appliances.setCoolingWindowCondition}
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
                                            value={appliances.coolingWindowDate}
                                            onChange={(newDate) => appliances.setCoolingWindowDate(newDate)}
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
                                        value={appliances.coolingWindowAmount}
                                        onValueChange={appliances.setCoolingWindowAmount}
                                        startContent={
                                            <div className="">
                                                <span className="text-default-400 text-small">#</span>
                                            </div>
                                        }
                                        />
                                </div>
                            </>      
                        )}
                        {appliances.coolingType.includes('hvac') && (
                            <>
                                <RadioGroup
                                    label="HVAC Condition"
                                    value={appliances.coolingHVACCondition}
                                    onValueChange={appliances.setCoolingHVACCondition}
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
                                            value={appliances.coolingHVACDate}
                                            onChange={(newDate) => appliances.setCoolingHVACDate(newDate)}
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
                    value={appliances.hotWaterTankCondition}
                    onValueChange={appliances.setHotWaterTankCondition}
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
                            value={appliances.hotWaterTankDate}
                            onChange={(newDate) => appliances.setHotWaterTankDate(newDate)}
                            // className='w-full'
                            />
                    </ThemeProvider>
                </LocalizationProvider>
            </div>
        </div>
    );
};

export default HeatingCoolingSection;
