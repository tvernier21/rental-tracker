"use client";

import {
    Radio,
    RadioGroup,
    Checkbox,
    Input
} from "@nextui-org/react";
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

const WasherDryerSection = () => {
    const appliances = useAppliances();
    return(
        <div className="space-y-5 pb-5">
            <p className="font-small">Washer & Dryer</p>
            <div className="ml-6 space-y-5">
                <Checkbox
                    isSelected={appliances.combined}
                    onValueChange={appliances.setCombined}
                >
                    Combined
                </Checkbox>
                <div className="grid grid-cols-2 gap-5">
                    <RadioGroup
                        label="Washer Condition"
                        value={appliances.washerCondition}
                        onValueChange={appliances.setWasherCondition}
                        orientation="horizontal"
                    >
                        <Radio value="normal">Normal</Radio>
                        <Radio value="old">Old (replace)</Radio>
                        <Radio value="repair">Repair</Radio>
                        <Radio value="other">Other</Radio>
                    </RadioGroup>
                    {appliances.combined ? (
                        <RadioGroup
                            label="Dryer Condition"
                            value={appliances.washerCondition}
                            orientation="horizontal"
                            isReadOnly
                        >
                            <Radio value="normal">Normal</Radio>
                            <Radio value="old">Old (replace)</Radio>
                            <Radio value="repair">Repair</Radio>
                            <Radio value="other">Other</Radio>
                        </RadioGroup>
                     ) : (
                        <RadioGroup
                            label="Dryer Condition"
                            value={appliances.dryerCondition}
                            onValueChange={appliances.setDryerCondition}
                            orientation="horizontal"
                        >
                            <Radio value="normal">Normal</Radio>
                            <Radio value="old">Old (replace)</Radio>
                            <Radio value="repair">Repair</Radio>
                            <Radio value="other">Other</Radio>
                        </RadioGroup>
                    )}
                    <Input
                        label="Washer Brand"
                        placeholder="Brand"
                        variant="bordered"
                        value={appliances.washerBrand}
                        onValueChange={appliances.setWasherBrand}
                    />
                    {appliances.combined ? (
                        <Input
                            label="Dryer Brand"
                            placeholder="Brand"
                            variant="bordered"
                            value={appliances.washerBrand}
                            isReadOnly
                        />
                    ) : (
                        <Input
                            label="Dryer Brand"
                            placeholder="Brand"
                            variant="bordered"
                            value={appliances.dryerBrand}
                            onValueChange={appliances.setDryerBrand}
                        />
                    )}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <ThemeProvider theme={theme}>
                            <DatePicker
                                label="Washer Date"
                                value={appliances.washerDate}
                                onChange={(newDate) => appliances.setWasherDate(newDate)}
                                // className='w-full'
                                />
                        </ThemeProvider>
                    </LocalizationProvider>
                    {appliances.combined ? (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <ThemeProvider theme={theme}>
                                <DatePicker
                                    label="Dryer Date"
                                    value={appliances.washerDate}
                                    readOnly
                                />
                            </ThemeProvider>
                        </LocalizationProvider>
                    ) : (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <ThemeProvider theme={theme}>
                                <DatePicker
                                    label="Dryer Date"
                                    value={appliances.dryerDate}
                                    onChange={(newDate) => appliances.setDryerDate(newDate)}
                                    // className='w-full'
                                />
                            </ThemeProvider>
                        </LocalizationProvider>
                    )}  
                </div>
            </div>
        </div>
    );
};

export default WasherDryerSection;
