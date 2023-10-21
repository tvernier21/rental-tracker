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
    fridgeCondition: string;
    setFridgeCondition: (fridgeCondition: string) => void;
    fridgeBrand: string;
    setFridgeBrand: (fridgeBrand: string) => void;
    fridgeDate: Dayjs | null;
    setFridgeDate: (fridgeDate: Dayjs | null) => void;
    stoveCondition: string;
    setStoveCondition: (stoveCondition: string) => void;
    stoveBrand: string;
    setStoveBrand: (stoveBrand: string) => void;
    stoveDate: Dayjs | null;
    setStoveDate: (stoveDate: Dayjs | null) => void;
    stoveType: string;
    setStoveType: (stoveType: string) => void;
    dishwasherCondition: string;
    setDishwasherCondition: (dishwasherCondition: string) => void;
    dishwasherBrand: string;
    setDishwasherBrand: (dishwasherBrand: string) => void;
    dishwasherDate: Dayjs | null;
    setDishwasherDate: (dishwasherDate: Dayjs | null) => void;
    microwaveCondition: string;
    setMicrowaveCondition: (microwaveCondition: string) => void;
    microwaveBrand: string;
    setMicrowaveBrand: (microwaveBrand: string) => void;
    microwaveDate: Dayjs | null;
    setMicrowaveDate: (microwaveDate: Dayjs | null) => void;
    microwaveType: string;
    setMicrowaveType: (microwaveType: string) => void;
};

const KitchenSection: React.FC<KitchenSectionProps> = ({
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
                            value={fridgeBrand}
                            onValueChange={setFridgeBrand}
                        />
                    </div>
                </div>
                <RadioGroup
                    label="Condition"
                    value={fridgeCondition}
                    onValueChange={setFridgeCondition}
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
                            value={fridgeDate}
                            onChange={(newDate) => setFridgeDate(newDate)}
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
                            value={dishwasherBrand}
                            onValueChange={setDishwasherBrand}
                        />
                    </div>
                </div>
                <RadioGroup
                    label="Condition"
                    value={dishwasherCondition}
                    onValueChange={setDishwasherCondition}
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
                            value={dishwasherDate}
                            onChange={(newDate) => setDishwasherDate(newDate)}
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
                            value={stoveBrand}
                            onValueChange={setStoveBrand}
                        />
                    </div>
                    <div className="col-span-1">
                    </div>
                    <RadioGroup
                        label="Stove Condition"
                        value={stoveCondition}
                        onValueChange={setStoveCondition}
                        orientation="horizontal"
                    >
                        <Radio value="normal">Normal</Radio>
                        <Radio value="old">Old (replace)</Radio>
                        <Radio value="repair">Repair</Radio>
                        <Radio value="other">Other</Radio>
                    </RadioGroup>
                    <RadioGroup
                        label="Stove Type"
                        value={stoveType}
                        onValueChange={setStoveType}
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
                            value={stoveDate}
                            onChange={(newDate) => setStoveDate(newDate)}
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
                            value={microwaveBrand}
                            onValueChange={setMicrowaveBrand}
                        />
                    </div>
                    <div className="col-span-1">
                    </div>
                    <RadioGroup
                        label="Microwave Condition"
                        value={microwaveCondition}
                        onValueChange={setMicrowaveCondition}
                        orientation="horizontal"
                    >
                        <Radio value="normal">Normal</Radio>
                        <Radio value="old">Old (replace)</Radio>
                        <Radio value="repair">Repair</Radio>
                        <Radio value="other">Other</Radio>
                    </RadioGroup>
                    <RadioGroup
                        label="Microwave Type"
                        value={microwaveType}
                        onValueChange={setMicrowaveType}
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
                            value={microwaveDate}
                            onChange={(newDate) => setMicrowaveDate(newDate)}
                            // className='w-full'
                            />
                    </ThemeProvider>
                </LocalizationProvider>
            </div>
        </div>
    );
};

export default KitchenSection;