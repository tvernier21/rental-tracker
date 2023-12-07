import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import axios from "axios";
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
    Input, 
    Divider,
    Selection,
    Select,
    SelectItem,
    Checkbox
} from "@nextui-org/react";

import { isSelectionEmpty } from "@/app/components/UI/SelectHelper";
import { stringify } from "querystring";

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

interface ContractsModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    onClose: () => void;
    propertyId?: string;
    prevData?: any;
}
  
const ContractsModal: React.FC<ContractsModalProps> = ({
    isOpen,
    onOpenChange,
    onClose,
    propertyId,
    prevData,
}) => {
    const [isLoadingProperties, setIsLoadingProperties] = useState(true);
    const [isLoadingTenants, setIsLoadingTenants] = useState(true);
    const [properties, setProperties] = useState<{
        label: string;
        value: string;
    }[]>([{label: '', value: ''}]);
    const [tenants, setTenants] = useState<{
        label: string;
        value: string;
    }[]>([{label: '', value: ''}]);
    const [startDatePickerOpened, setStartDatePickerOpened] = useState(false);
    // const [startDateView, setStartDateView] = useState<string>('day');
    const [endDatePickerOpened, setEndDatePickerOpened] = useState(false);

    const [property, setProperty] = useState<Selection>(new Set([]));
    const [tenant, setTenant] = useState<Selection>(new Set([]));
    const [rent, setRent] = useState<string>("");
    const [petDeposit, setPetDeposit] = useState<string>("");
    const [petRefundable, setPetRefundable] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
    const isUpdate = prevData ? true : false;

    useEffect(() => {
        if (isUpdate) {
            setProperty(new Set([prevData.property_id]));
            setTenant(new Set(prevData.tenants));
            // if prevData.rent is undefined, set it to an empty string
            setRent(prevData.rent ? prevData.rent.toString() : "");
            setPetDeposit(prevData.pet_deposit ? prevData.pet_deposit.toString() : "");
            setPetRefundable(prevData.pet_refundable);
            setStartDate(dayjs(prevData.start_date));
            setEndDate(dayjs(prevData.end_date));
        }
    }, [isUpdate, prevData]);

    // GET PROPERTIES
    useEffect(() => {
        if (!isLoadingProperties) return;
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
                setIsLoadingProperties(false);
        });
    }, [propertyId, isLoadingProperties]);

    useEffect(() => {
        if (propertyId) setProperty(new Set([properties[0].value]));
    }, [properties, propertyId]);

    // GET TENANTS
    useEffect(() => {
        if (!isLoadingTenants) return;
        axios.get('/api/tenants/')
            .then((res) => {
                setTenants(Array.from(res.data || []).map((tenant: any) => {
                    return {
                        label: `${tenant.name}`, 
                        value: tenant.id as string
                    }
                }));
            })
            .catch((error) => {
                toast.error("Tenants could not be loaded.",
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
                setIsLoadingTenants(false);
        });
    }, [isLoadingTenants]);

    const handleSubmit = async () => {
        if (isSelectionEmpty(property)) {
            toast.error("Please fill out all required fields.",
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
            property_id: Array.from(property)[0],
            tenants: Array.from(tenant),
            start_date: startDate,
            end_date: endDate,
            // if rent is an empty string, set it to undefined
            rent: rent === "" ? undefined : parseFloat(rent),
            pet_deposit: petDeposit === "" ? undefined : parseFloat(petDeposit),
            pet_refundable: petRefundable,
            type: "lease"
        };
        if (isUpdate) {
            postData = {
                ...postData,
                id: prevData.id,
            } as typeof postData;
        }

        axios.post('/api/contracts', postData)
            .then((res) => {
                // Check for the status code in the response
                let message = "Tenant added successfully."
                if (isUpdate) {
                    message = "Tenant updated successfully."
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
            .catch((error) => {
                // Check for the status code in the error response
                toast.error("Error adding tenant.",
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
                onClose();
                // Reset the form
                setProperty(new Set([]));
                setTenant(new Set([]));
                setRent("");
                setPetDeposit("");
                setPetRefundable(false);
                setStartDate(dayjs());
                setEndDate(dayjs());
                // Refresh the page
                window.location.reload();
            });
    };

    return (
        <>
        <Modal 
            isOpen={isOpen} 
            onOpenChange={(isOpen) => {
                if (!startDatePickerOpened && !endDatePickerOpened) {
                    onOpenChange();
                }
            }}
            placement="center"
            backdrop='blur'
            size="2xl"
        >
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">
                    New Contract
                </ModalHeader>
                <ModalBody>
                    <Select
                        isRequired
                        label="Property"
                        placeholder={`Select property to add contract to`}
                        variant="bordered"
                        fullWidth
                        isDisabled={isLoadingProperties || propertyId ? true : false}
                        selectedKeys={property}
                        onSelectionChange={setProperty}
                        style={{
                            color: '#FFF',  // Default text color (choose a color that contrasts well with the button background)
                            transition: 'color 0.3s ease'  // Smooth transition for hover effect
                        }}
                    >
                        {properties.map((property) => (
                            <SelectItem 
                                key={property.value} 
                                value={property.value}
                                style={{
                                    color: '#FFF',  // Default text color (choose a color that contrasts well with the button background)
                                    transition: 'color 0.3s ease'  // Smooth transition for hover effect
                                }}
                            >
                                {property.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        label="Tenants"
                        placeholder={`Select Tenants on the Contract`}
                        selectionMode="multiple"
                        variant="bordered"
                        fullWidth
                        isDisabled={isLoadingTenants || propertyId ? true : false}
                        selectedKeys={tenant}
                        onSelectionChange={setTenant}
                        style={{
                            color: '#FFF',  // Default text color (choose a color that contrasts well with the button background)
                            transition: 'color 0.3s ease'  // Smooth transition for hover effect
                        }}
                    >
                        {tenants.map((tenant) => (
                            <SelectItem 
                                key={tenant.value} 
                                value={tenant.value}
                                style={{
                                    color: '#FFF',  // Default text color (choose a color that contrasts well with the button background)
                                    transition: 'color 0.3s ease'  // Smooth transition for hover effect
                                }}
                            >
                                {tenant.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Divider />
                    <Input
                        type="number"
                        label="Rent"
                        placeholder="0.00"
                        variant="bordered"
                        value={rent}
                        onValueChange={setRent}
                        startContent={
                            <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">$</span>
                            </div>
                        }
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            type="number"
                            label="Pet Deposit"
                            placeholder="0.00"
                            variant="bordered"
                            value={petDeposit}
                            onValueChange={setPetDeposit}
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">$</span>
                                </div>
                            }
                        />
                        <Checkbox 
                            isSelected={petRefundable}
                            onValueChange={setPetRefundable}
                            size="md"
                        >
                            Pet Deposit Refundable
                        </Checkbox>
                    </div>
                    <Divider />
                    <div className="grid grid-cols-2 gap-4">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <ThemeProvider theme={theme}>
                                <DatePicker
                                    label="Date"
                                    value={startDate}
                                    onChange={(newDate) => setStartDate(newDate)}
                                    onOpen={() => setStartDatePickerOpened(true)}
                                    onClose={() => setStartDatePickerOpened(false)}
                                    className='w-full'
                                />
                            </ThemeProvider>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <ThemeProvider theme={theme}>
                                <DatePicker
                                    label="Date"
                                    value={endDate}
                                    onChange={(newDate) => setEndDate(newDate)}
                                    onOpen={() => setEndDatePickerOpened(true)}
                                    onClose={() => setEndDatePickerOpened(false)}
                                    className='w-full'
                                />
                            </ThemeProvider>
                        </LocalizationProvider>
                    </div>
                </ModalBody>
                <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
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

export default ContractsModal;