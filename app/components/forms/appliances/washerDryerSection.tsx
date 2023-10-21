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

interface WasherDryerSectionProps {
    combined: boolean;
    setCombined: (combined: boolean) => void;
    washerCondition: string;
    setWasherCondition: (washerCondition: string) => void;
    dryerCondition: string;
    setDryerCondition: (dryerCondition: string) => void;
    washerDate: Dayjs | null;
    setWasherDate: (washerDate: Dayjs | null) => void;
    dryerDate: Dayjs | null;
    setDryerDate: (dryerDate: Dayjs | null) => void;
    washerBrand: string;
    setWasherBrand: (washerBrand: string) => void;
    dryerBrand: string;
    setDryerBrand: (dryerBrand: string) => void;
}

const WasherDryerSection: React.FC<WasherDryerSectionProps> = ({
    combined, setCombined,
    washerCondition, setWasherCondition,
    dryerCondition, setDryerCondition,
    washerDate, setWasherDate,
    dryerDate, setDryerDate,
    washerBrand, setWasherBrand,
    dryerBrand, setDryerBrand
}) => {
    return(
        <div className="space-y-5 pb-5">
            <p className="font-small">Washer & Dryer</p>
            <div className="ml-6 space-y-5">
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
        </div>
    );
};

export default WasherDryerSection;
