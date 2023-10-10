'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
    Card,
    CardBody,
    Tabs,
    Tab,
    Select,
    SelectItem,
    Selection,
    Checkbox,
    Input
} from "@nextui-org/react";
import { FaFileInvoiceDollar } from 'react-icons/fa';

import supabaseClient from '@/app/lib/supabaseClient';
import { isSelectionEmpty } from '../inputs/SelectHelper';
import AddButton from '../inputs/AddButton';


const costTypes = [
    {
        id: "costs",
        value: "Costs",
        desc: "Costs are expenses that are necessary to keep the property in service and in good condition. These include property taxes, insurance, utilities, and routine maintenance."
    },
    {
        id: "renovation",
        value: "Renovation",
        desc: "Renovation costs are expenses that are necessary to improve the property. These include repairs, replacements, and upgrades."
    }
];

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

const CostCard = () => {
    const { getToken, userId } = useAuth();
    const [costType, setCostType] = useState("costs");
    const [properties, setProperties] = useState<{
        label: string;
        value: string;
    }[]>([{label: '', value: ''}]);
    const [property, setProperty] = useState<Selection>(new Set([]));
    const [washerDryer, setWasherDryer] = useState(false);
    const [dishwasher, setDishwasher] = useState(false);
    const [AC, setAC] = useState(false);
    const [heater, setHeater] = useState(false);
    const [fridge, setFridge] = useState(false);
    const [oven, setOven] = useState(false);
    const [microwave, setMicrowave] = useState(false);
    const [hardwoodFloors, setHardwoodFloors] = useState(false);
    const [carpet, setCarpet] = useState(false);
    const [tile, setTile] = useState(false);
    const [kitchen, setKitchen] = useState(false);
    const [bathroom, setBathroom] = useState(false);
    const [bedroom, setBedroom] = useState(false);
    const [paint, setPaint] = useState(false);
    const [windows, setWindows] = useState(false);
    const [cleaning, setCleaning] = useState(false);
    const [electricity, setElectricity] = useState(false);
    const [water, setWater] = useState(false);
    const [gas, setGas] = useState(false);
    const [other, setOther] = useState(false);
    const [eventDate, setEventDate] = useState<Dayjs | null>(dayjs());
    const [price, setPrice] = useState("");

    useEffect(() => {
        const loadProperties = async () => {
            try {
                const supabaseAccessToken = await getToken({
                    template: "supabase",
                });
                const supabase = await supabaseClient(supabaseAccessToken);
                const { data: properties } = await supabase
                    .from("properties")
                    .select("*")
                    .eq("user_id", userId as string);
                
                setProperties(Array.from(properties || []).map((property) => {
                    return {
                        label: `${property.street_address}, ${property.city_address}, ${property.state_address} ${property.zipcode_address}, ${property.country_address}`, 
                        value: property.id as string
                    }
                }));
            } catch (e) {
                alert(e);
            }
        };
        loadProperties();
    }, [userId]);


    const handleSubmit = async () => {
        if (isSelectionEmpty(property) ||
            !price ||
            !eventDate) {
            toast.error("Please select a property, price, and date.");
            return;
        }
        
        const supabaseAccessToken = await getToken({
            template: "supabase",
        });
        const supabase = await supabaseClient(supabaseAccessToken);
        const { data } = await supabase
            .from("costs")
            .insert({
                property_id: Array.from(property)[0] as string,
                washerdryer: washerDryer,
                dishwasher: dishwasher,
                ac: AC,
                heater: heater,
                fridge: fridge,
                oven: oven,
                microwave: microwave,
                hardwood: hardwoodFloors,
                carpet: carpet,
                tile: tile,
                kitchen: kitchen,
                bathroom: bathroom,
                bedroom: bedroom,
                paint: paint,
                windows: windows,
                cleaning: cleaning,
                electricity: electricity,
                water: water,
                gas: gas,
                other: other,
                date: eventDate?.toDate(),
                price: price,
                user_id: userId
            })
            .select();

        // Reset the form
        setProperty(new Set([]));
        setWasherDryer(false);
        setDishwasher(false);
        setAC(false);
        setHeater(false);
        setFridge(false);
        setOven(false);
        setMicrowave(false);
        setHardwoodFloors(false);
        setCarpet(false);
        setTile(false);
        setKitchen(false);
        setBathroom(false);
        setBedroom(false);
        setPaint(false);
        setWindows(false);
        setCleaning(false);
        setElectricity(false);
        setWater(false);
        setGas(false);
        setOther(false);
        setEventDate(dayjs());
        setPrice("");
        toast.success("Property added successfully!");
    };


    return (
        <div className="w-[1000px]">
            <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50"
                shadow="sm"
                fullWidth
            >
                <CardBody>
                    <div className="flex flex-col justify-center space-y-5">
                        <Tabs 
                            aria-label="tabs" 
                            items={costTypes}
                            size="md"
                            color={costType === "costs" ? "danger" : "success"}
                            fullWidth={true}    
                            selectedKey={costType}
                            onSelectionChange={(item) => setCostType(item as string)}
                        >
                            {(item) => (
                                <Tab key={item.id} title={item.value}/>
                            )}
                        </Tabs>
                        <Select
                            isRequired
                            label="Property"
                            placeholder={`Select property to add ${costType} to`}
                            variant="bordered"
                            fullWidth
                            selectedKeys={property}
                            onSelectionChange={setProperty}
                        >
                            {properties.map((property) => (
                                <SelectItem key={property.value} value={property.value}>
                                    {property.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <div className='flex justify-between space-x-2'>
                            <div className='basis-1/2'>
                                <Input
                                    type="number"
                                    label="Price"
                                    placeholder="0.00"
                                    variant="bordered"
                                    value={price}
                                    onValueChange={setPrice}
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">$</span>
                                        </div>
                                    }
                                />
                            </div>
                            <div className='basis-1/2'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <ThemeProvider theme={theme}>
                                        <DatePicker
                                            label="Date"
                                            value={eventDate}
                                            onChange={(newValue) => setEventDate(newValue)}
                                            className='w-full'
                                        />
                                    </ThemeProvider>
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={washerDryer} onValueChange={setWasherDryer}>
                                    Washer & Dryer
                                </Checkbox>
                            </Card>
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={dishwasher} onValueChange={setDishwasher}>
                                    Dishwasher
                                </Checkbox>
                            </Card>
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={AC} onValueChange={setAC}>
                                    AC
                                </Checkbox>
                            </Card>
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={heater} onValueChange={setHeater}>
                                    Heater
                                </Checkbox>
                            </Card>
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={fridge} onValueChange={setFridge}>
                                    Fridge
                                </Checkbox>
                            </Card>
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={oven} onValueChange={setOven}>
                                    Oven
                                </Checkbox>
                            </Card>
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={microwave} onValueChange={setMicrowave}>
                                    Microwave
                                </Checkbox>
                            </Card>
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={hardwoodFloors} onValueChange={setHardwoodFloors}>
                                    Hardwood
                                </Checkbox>
                            </Card>
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={carpet} onValueChange={setCarpet}>
                                    Carpet
                                </Checkbox>
                            </Card>
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={tile} onValueChange={setTile}>
                                    Tile
                                </Checkbox>
                            </Card>
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={kitchen} onValueChange={setKitchen}>
                                    Kitchen
                                </Checkbox>
                            </Card>
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={bathroom} onValueChange={setBathroom}>
                                    Bathroom
                                </Checkbox>
                            </Card>
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={bedroom} onValueChange={setBedroom}>
                                    Bedroom
                                </Checkbox>
                            </Card>
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={paint} onValueChange={setPaint}>
                                    Paint
                                </Checkbox>
                            </Card>
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={windows} onValueChange={setWindows}>
                                    Windows
                                </Checkbox>
                            </Card>
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={cleaning} onValueChange={setCleaning}>
                                    Cleaning
                                </Checkbox>
                            </Card>
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={electricity} onValueChange={setElectricity}>
                                    Electricity
                                </Checkbox>
                            </Card>
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={water} onValueChange={setWater}>
                                    Water
                                </Checkbox>
                            </Card>
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={gas} onValueChange={setGas}>
                                    Gas
                                </Checkbox>
                            </Card>
                            <Card className="w-full space-y-2 p-4" radius="sm">
                                <Checkbox isSelected={other} onValueChange={setOther}>
                                    Other
                                </Checkbox>
                            </Card>
                        </div>
                        <AddButton 
                            text='Add Cost'
                            icon={FaFileInvoiceDollar}
                            onPressModal={() => {}}
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default CostCard