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

// // Other Kitchen Appliances
// const [counterCondition, setCounterCondition] = useState<string>('');
// const [counterDate, setCounterDate] = useState<Dayjs | null>(dayjs());
// const [cabinetCondition, setCabinetCondition] = useState<string>('');
// const [cabinetDate, setCabinetDate] = useState<Dayjs | null>(dayjs());
// const [sinkCondition, setSinkCondition] = useState<string>('');
// const [sinkDate, setSinkDate] =  useState<Dayjs | null>(dayjs());
// const [garbageCondition, setGarbageCondition] = useState<string>('');
// const [garbageDate, setGarbageDate] = useState<Dayjs | null>(dayjs());
// const otherKitchenAppliances = {
//     counterCondition, setCounterCondition,
//     counterDate, setCounterDate,
//     cabinetCondition, setCabinetCondition,
//     cabinetDate, setCabinetDate,
//     sinkCondition, setSinkCondition,
//     sinkDate, setSinkDate,
//     garbageCondition, setGarbageCondition,
//     garbageDate, setGarbageDate
// };

interface OtherKitchenSectionProps {
    counterCondition: string;
    setCounterCondition: (counterCondition: string) => void;
    counterDate: Dayjs | null;
    setCounterDate: (counterDate: Dayjs | null) => void;
    cabinetCondition: string;
    setCabinetCondition: (cabinetCondition: string) => void;
    cabinetDate: Dayjs | null;
    setCabinetDate: (cabinetDate: Dayjs | null) => void;
    sinkCondition: string;
    setSinkCondition: (sinkCondition: string) => void;
    sinkDate: Dayjs | null;
    setSinkDate: (sinkDate: Dayjs | null) => void;
    garbageCondition: string;
    setGarbageCondition: (garbageCondition: string) => void;
    garbageDate: Dayjs | null;
    setGarbageDate: (garbageDate: Dayjs | null) => void;
};

const OtherKitchenSection: React.FC<OtherKitchenSectionProps> = ({
    counterCondition, setCounterCondition,
    counterDate, setCounterDate,
    cabinetCondition, setCabinetCondition,
    cabinetDate, setCabinetDate,
    sinkCondition, setSinkCondition,
    sinkDate, setSinkDate,
    garbageCondition, setGarbageCondition,
    garbageDate, setGarbageDate
}) => {
    return(
        <div className="space-y-5 pb-5">
            <p className="font-small">Counter</p>
            <div className="ml-6 space-y-5">
                <RadioGroup
                    label="Condition"
                    value={counterCondition}
                    onValueChange={setCounterCondition}
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
                            value={counterDate}
                            onChange={(newDate) => setCounterDate(newDate)}
                            // className='w-full'
                            />
                    </ThemeProvider>
                </LocalizationProvider>
            </div>
            <p className="font-small">Cabinet</p>
            <div className="ml-6 space-y-5">
                <RadioGroup
                    label="Condition"
                    value={cabinetCondition}
                    onValueChange={setCabinetCondition}
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
                            value={cabinetDate}
                            onChange={(newDate) => setCabinetDate(newDate)}
                            // className='w-full'
                            />
                    </ThemeProvider>
                </LocalizationProvider>
            </div>
            <p className="font-small">Sink</p>
            <div className="ml-6 space-y-5">
                <RadioGroup
                    label="Condition"
                    value={sinkCondition}
                    onValueChange={setSinkCondition}
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
                            value={sinkDate}
                            onChange={(newDate) => setSinkDate(newDate)}
                            // className='w-full'
                            />
                    </ThemeProvider>
                </LocalizationProvider>
            </div>
            <p className="font-small">Garbage</p>
            <div className="ml-6 space-y-5">
                <RadioGroup
                    label="Condition"
                    value={garbageCondition}
                    onValueChange={setGarbageCondition}
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
                            value={garbageDate}
                            onChange={(newDate) => setGarbageDate(newDate)}
                            // className='w-full'
                            />
                    </ThemeProvider>
                </LocalizationProvider>
            </div>
        </div>
    );
};

export default OtherKitchenSection;