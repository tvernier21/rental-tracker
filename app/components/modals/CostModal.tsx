'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button, 
    Card,
    Tabs,
    Tab,
    Select,
    SelectItem,
    Selection,
    Checkbox,
    Input
} from "@nextui-org/react";

import { isSelectionEmpty } from "@/app/components/UI/SelectHelper";

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

interface CostModalProps {
    cost_isOpen: boolean;
    cost_onOpenChange: () => void;
    cost_onClose: () => void;
    propertyId?: string;
    prevData?: any;
}

const CostModal: React.FC<CostModalProps> = ({
    cost_isOpen,
    cost_onOpenChange,
    cost_onClose,
    propertyId,
    prevData
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [properties, setProperties] = useState<{
        label: string;
        value: string;
    }[]>([{label: '', value: ''}]);
    const [datePickerOpened, setDatePickerOpened] = useState(false);

    // Data sent to supabase
    const [costType, setCostType] = useState("costs");
    const [property, setProperty] = useState<Selection>(new Set([]));
    const [eventDate, setEventDate] = useState<Dayjs | null>(dayjs());
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
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
    const isUpdate = prevData ? true : false;

    useEffect(() => {
        if (!isUpdate) return;
        setCostType(prevData.cost_type);
        setProperty(new Set([prevData.property_id]));
        setEventDate(dayjs(prevData.date));
        setDescription(prevData.description);
        setPrice(prevData.price);
        setWasherDryer(prevData.washerdryer);
        setDishwasher(prevData.dishwasher);
        setAC(prevData.ac);
        setHeater(prevData.heater);
        setFridge(prevData.fridge);
        setOven(prevData.oven);
        setMicrowave(prevData.microwave);
        setHardwoodFloors(prevData.hardwood);
        setCarpet(prevData.carpet);
        setTile(prevData.tile);
        setKitchen(prevData.kitchen);
        setBathroom(prevData.bathroom);
        setBedroom(prevData.bedroom);
        setPaint(prevData.paint);
        setWindows(prevData.windows);
        setCleaning(prevData.cleaning);
        setElectricity(prevData.electricity);
        setWater(prevData.water);
        setGas(prevData.gas);
        setOther(prevData.other);
    }, [isUpdate, prevData]);

    useEffect(() => {
        if (!isLoading) return;
        const endpoint = propertyId ? `/api/properties/${propertyId}` : '/api/properties';
        axios.get(endpoint)
            .then((res) => {
                setProperties(Array.from(res.data || []).map((property: any) => {
                    return {
                        label: `${property.street_address}, ${property.city_address}, ${property.state_address} ${property.zipcode_address}, ${property.country_address}`, 
                        value: property.id as string
                    }
                }));
            })
            .catch((error) => {
                toast.error("Properties could not be loaded.",
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            })
            .finally(() => {
                setIsLoading(false);
        });
    }, [propertyId, isLoading]);

    useEffect(() => {
        if (propertyId) setProperty(new Set([properties[0].value]));
    }, [properties, propertyId]);


    const handleSubmit = async () => {
        if (isSelectionEmpty(property) ||
            !price ||
            !eventDate) {
            toast.error("Please select a property, price, and date.",
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
            return;
        }
        
        let postData = {
            cost_type: costType,
            property_id: Array.from(property)[0],
            date: eventDate.toISOString().split('T')[0],
            price: parseFloat(price),
            description: description,
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
            other: other
        };
        if (isUpdate) {
            postData = {
                ...postData,
                id: prevData.id
            } as typeof postData;
        }
        axios.post('/api/costs/', postData)
            .then(() => {
                let message = `${costType} added to property successfully!`;
                if (isUpdate) {
                    message = `${costType} updated successfully!`;
                }
                toast.success(message,
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            })
            .catch(() => {
                // Check for the status code in the error response
                toast.error("Error adding property.",
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            })
            .finally(() => {
                cost_onClose();
                setProperty(new Set([]));
                setEventDate(dayjs());
                setPrice("");
                setDescription("");
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
                // Refresh the page
                window.location.reload();
            });
    };

    return (
        <>
        <Modal 
            isOpen={cost_isOpen} 
            onOpenChange={(isOpen) => {
                if (!datePickerOpened) {
                    cost_onOpenChange();
                }
            }}
            placement="center"
            backdrop='blur'
            size='5xl'
        >
            <ModalContent>
            {(cost_onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">
                    New Cost/Renovation
                </ModalHeader>
                <ModalBody>
                    <div className="flex flex-col justify-center space-y-5">
                        <Tabs 
                            aria-label="tabs" 
                            items={costTypes}
                            size="md"
                            color={costType === "costs" ? "danger" : "success"}
                            fullWidth={true}    
                            selectedKey={costType}
                            onSelectionChange={(item) => setCostType(item as string)}
                            disableAnimation={true}
                        >
                            {(item) => (
                                <Tab key={item.id} title={item.value}/>
                            )}
                        </Tabs>
                        <Select
                            className="text-white"
                            isRequired
                            label="Property"
                            placeholder={`Select property to add ${costType} to`}
                            variant="bordered"
                            fullWidth
                            isDisabled={isLoading || propertyId ? true : false}
                            selectedKeys={property}
                            onSelectionChange={setProperty}
                            style={{
                                transition: 'color 0.3s ease'  // Smooth transition for hover effect
                            }}
                        >
                            {properties.map((property) => (
                                <SelectItem
                                    className="text-white"
                                    key={property.value} 
                                    value={property.value}
                                    style={{
                                        transition: 'color 0.3s ease'  // Smooth transition for hover effect
                                    }}
                                >
                                    {property.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <div className='flex justify-between space-x-2'>
                            <div className='basis-1/2'>
                                <Input
                                    className="text-white"
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
                                            onChange={(newDate) => setEventDate(newDate)}
                                            onOpen={() => setDatePickerOpened(true)}
                                            onClose={() => setDatePickerOpened(false)}
                                            className='w-full'
                                        />
                                    </ThemeProvider>
                                </LocalizationProvider>
                            </div>
                        </div>
                        <Input
                            className="text-white"
                            type="text"
                            label="Description"
                            placeholder="Description"
                            variant="bordered"
                            fullWidth
                            value={description}
                            onValueChange={setDescription}
                        />
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
                    </div>
                </ModalBody>
                <ModalFooter>
                        <Button color="danger" variant="flat" onPress={cost_onClose}>
                            Cancel
                        </Button>
                        <Button color={isUpdate ? "success" : "primary"} onPress={handleSubmit}>
                            {isUpdate ? "Update" : "Add"}
                        </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
        </>
    );
};

export default CostModal;