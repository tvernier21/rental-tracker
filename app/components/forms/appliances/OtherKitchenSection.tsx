"use client";

import {
    Radio,
    RadioGroup,
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

const OtherKitchenSection = () => {
    const appliances = useAppliances();
    return(
        <div className="space-y-5 pb-5">
            <p className="font-small">Counter</p>
            <div className="ml-6 space-y-5">
                <RadioGroup
                    label="Condition"
                    value={appliances.counterCondition}
                    onValueChange={appliances.setCounterCondition}
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
                            value={appliances.counterDate}
                            onChange={(newDate) => appliances.setCounterDate(newDate)}
                            // className='w-full'
                            />
                    </ThemeProvider>
                </LocalizationProvider>
            </div>
            <p className="font-small">Cabinet</p>
            <div className="ml-6 space-y-5">
                <RadioGroup
                    label="Condition"
                    value={appliances.cabinetCondition}
                    onValueChange={appliances.setCabinetCondition}
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
                            value={appliances.cabinetDate}
                            onChange={(newDate) => appliances.setCabinetDate(newDate)}
                            // className='w-full'
                            />
                    </ThemeProvider>
                </LocalizationProvider>
            </div>
            <p className="font-small">Sink</p>
            <div className="ml-6 space-y-5">
                <RadioGroup
                    label="Condition"
                    value={appliances.sinkCondition}
                    onValueChange={appliances.setSinkCondition}
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
                            value={appliances.sinkDate}
                            onChange={(newDate) => appliances.setSinkDate(newDate)}
                            // className='w-full'
                            />
                    </ThemeProvider>
                </LocalizationProvider>
            </div>
            <p className="font-small">Garbage</p>
            <div className="ml-6 space-y-5">
                <RadioGroup
                    label="Condition"
                    value={appliances.garbageCondition}
                    onValueChange={appliances.setGarbageCondition}
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
                            value={appliances.garbageDate}
                            onChange={(newDate) => appliances.setGarbageDate(newDate)}
                            // className='w-full'
                            />
                    </ThemeProvider>
                </LocalizationProvider>
            </div>
        </div>
    );
};

export default OtherKitchenSection;