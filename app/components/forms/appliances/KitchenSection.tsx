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

interface KitchenSectionProps {
    appliances: any;
};

const KitchenSection: React.FC<KitchenSectionProps> = ({
    appliances
}) => {
    return(
        <div className="space-y-5 pb-5">
            <p className="font-small">Fridge</p>
            <div className="ml-6 space-y-5">
                <div className="grid grid-cols-2">
                    <div className="col-span-1">
                        <Input
                            label="Brand"
                            placeholder="Brand"
                            variant="bordered"
                            value={appliances.fridgeBrand}
                            onValueChange={appliances.setFridgeBrand}
                        />
                    </div>
                </div>
                <RadioGroup
                    label="Condition"
                    value={appliances.fridgeCondition}
                    onValueChange={appliances.setFridgeCondition}
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
                            value={appliances.fridgeDate}
                            onChange={(newDate) => appliances.setFridgeDate(newDate)}
                            // className='w-full'
                            />
                    </ThemeProvider>
                </LocalizationProvider>
            </div>
            <p className="font-small">Dishwasher</p>
            <div className="ml-6 space-y-5">
                <div className="grid grid-cols-2">
                    <div className="col-span-1">
                        <Input
                            label="Brand"
                            placeholder="Brand"
                            variant="bordered"
                            value={appliances.dishwasherBrand}
                            onValueChange={appliances.setDishwasherBrand}
                        />
                    </div>
                </div>
                <RadioGroup
                    label="Condition"
                    value={appliances.dishwasherCondition}
                    onValueChange={appliances.setDishwasherCondition}
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
                            value={appliances.dishwasherDate}
                            onChange={(newDate) => appliances.setDishwasherDate(newDate)}
                            // className='w-full'
                            />
                    </ThemeProvider>
                </LocalizationProvider>
            </div>
            <p className="font-small">Stove</p>
            <div className="ml-6 space-y-5">
                <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-1">
                        <Input
                            label="Stove Brand"
                            placeholder="Brand"
                            variant="bordered"
                            value={appliances.stoveBrand}
                            onValueChange={appliances.setStoveBrand}
                        />
                    </div>
                    <div className="col-span-1">
                    </div>
                    <RadioGroup
                        label="Stove Condition"
                        value={appliances.stoveCondition}
                        onValueChange={appliances.setStoveCondition}
                        orientation="horizontal"
                    >
                        <Radio value="normal">Normal</Radio>
                        <Radio value="old">Old (replace)</Radio>
                        <Radio value="repair">Repair</Radio>
                        <Radio value="other">Other</Radio>
                    </RadioGroup>
                    <RadioGroup
                        label="Stove Type"
                        value={appliances.stoveType}
                        onValueChange={appliances.setStoveType}
                        orientation="horizontal"
                    >
                        <Radio value="gas">Gas</Radio>
                        <Radio value="electric">Electric</Radio>
                    </RadioGroup>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <ThemeProvider theme={theme}>
                        <DatePicker
                            label="Stove Date"
                            value={appliances.stoveDate}
                            onChange={(newDate) => appliances.setStoveDate(newDate)}
                            // className='w-full'
                            />
                    </ThemeProvider>
                </LocalizationProvider>
            </div>
            <p className="font-small">Fridge</p>
            <div className="ml-6 space-y-5">
                <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-1">
                        <Input
                            label="Microwave Brand"
                            placeholder="Brand"
                            variant="bordered"
                            value={appliances.microwaveBrand}
                            onValueChange={appliances.setMicrowaveBrand}
                        />
                    </div>
                    <div className="col-span-1">
                    </div>
                    <RadioGroup
                        label="Microwave Condition"
                        value={appliances.microwaveCondition}
                        onValueChange={appliances.setMicrowaveCondition}
                        orientation="horizontal"
                    >
                        <Radio value="normal">Normal</Radio>
                        <Radio value="old">Old (replace)</Radio>
                        <Radio value="repair">Repair</Radio>
                        <Radio value="other">Other</Radio>
                    </RadioGroup>
                    <RadioGroup
                        label="Microwave Type"
                        value={appliances.microwaveType}
                        onValueChange={appliances.setMicrowaveType}
                        orientation="horizontal"
                    >
                        <Radio value="over">Over</Radio>
                        <Radio value="under">Under</Radio>
                    </RadioGroup>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <ThemeProvider theme={theme}>
                        <DatePicker
                            label="Microwave Date"
                            value={appliances.microwaveDate}
                            onChange={(newDate) => appliances.setMicrowaveDate(newDate)}
                            // className='w-full'
                            />
                    </ThemeProvider>
                </LocalizationProvider>
            </div>
        </div>
    );
};

export default KitchenSection;