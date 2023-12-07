import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import axios from "axios";
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button, 
    Input, 
    Divider,
    Select,
    SelectItem,
    Switch,
    Selection
} from "@nextui-org/react";

import { isSelectionEmpty, extractFloatFromSelection } from "@/app/components/UI/SelectHelper";

const bedroomsTypes = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" }
];

const bathroomsTypes = [
    { label: "1", value: "1" },
    { label: "1.5", value: "1.5" },
    { label: "2", value: "2" },
    { label: "2.5", value: "2.5" },
    { label: "3", value: "3" },
    { label: "3.5", value: "3.5" },
    { label: "4", value: "4" },
    { label: "4.5", value: "4.5" },
    { label: "5", value: "5" }
];

const propertyTypes = [
    { label: "Single Family", value: "Single Family" },
    { label: "Multi Family", value: "Multi Family" },
    { label: "Condo", value: "Condo" },
    { label: "Townhouse", value: "Townhouse" },
    { label: "Mobile Home", value: "Mobile Home" },
    { label: "Land", value: "Land" },
    { label: "Other", value: "Other" }
];

interface PropertyModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    onClose: () => void;
    properties?: any[];
    setProperties?: (props: any[]) => void;
    prevData?: any;
}
  
const PropertyModal: React.FC<PropertyModalProps> = ({
    isOpen,
    onOpenChange,
    onClose,
    properties,
    setProperties,
    prevData
}) => {
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [country, setCountry] = useState("");
    const [propertyType, setPropertyType] = useState<Selection>(new Set([]));
    const [bedrooms, setBedrooms] = useState<Selection>(new Set([]));
    const [bathrooms, setBathrooms] = useState<Selection>(new Set([]));
    const [squarefootage, setSquarefootage] = useState("");
    const [backyard, setBackyard] = useState(false);
    const [basement, setBasement] = useState(false);

    const isUpdate = prevData ? true : false;
    useEffect(() => {
        if (!isUpdate) return;
        setStreet(prevData.street_address);
        setCity(prevData.city_address);
        setState(prevData.state_address);
        setZipcode(prevData.zipcode_address);
        setCountry(prevData.country_address);
        setPropertyType(new Set([prevData.prop_type]));
        // convert to string
        setBedrooms(new Set([(prevData.bedrooms).toString()]));
        setBathrooms(new Set([(prevData.bathrooms).toString()]));
        setSquarefootage((prevData.sqr_feet).toString());
        setBackyard(prevData.backyard);
        setBasement(prevData.basement);
    }, [isUpdate, prevData]);
    console.log(prevData);
    console.log(isUpdate);


    const handleSubmit = async () => {
        if (street === "" ||
            city === "" ||
            state === "" ||
            zipcode === "" ||
            country === "" ||
            isSelectionEmpty(propertyType) ||
            isSelectionEmpty(bedrooms) ||
            isSelectionEmpty(bathrooms) ||
            squarefootage === "") {
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
            street: street,
            city: city,
            state: state,
            zipcode: zipcode,
            country: country,
            propertyType: Array.from(propertyType)[0],
            bedrooms: extractFloatFromSelection(bedrooms),
            bathrooms: extractFloatFromSelection(bathrooms),
            squarefootage: parseFloat(squarefootage),
            backyard: backyard,
            basement: basement,
            img: null,
        };
        if (isUpdate) {
            postData = {
                ...postData,
                id: prevData.id,
            } as typeof postData;
        }
        axios.post('/api/properties/', postData)
            .then((res) => {
                if (!isUpdate && properties && setProperties) {
                    setProperties([...properties, res.data[0]]);
                }
            })
            .catch((error) => {
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
                onClose();
                // Reset the form
                setStreet("");
                setCity("");
                setState("");
                setZipcode("");
                setCountry("");
                setPropertyType(new Set([]));
                setBedrooms(new Set([]));
                setBathrooms(new Set([]));
                setSquarefootage("");
                setBackyard(false);
                setBasement(false);
                // refresh the page
                window.location.reload();
            });
    };

    return (
        <>
        <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="center"
            backdrop='blur'
        >
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">
                    New Property
                </ModalHeader>
                <ModalBody>
                    <Input
                        label="Street Address"
                        placeholder="Street"
                        variant="bordered"
                        isRequired
                        value={street}
                        onValueChange={setStreet}
                    />
                    <div className="flex flex-row justify-between space-x-2">
                        <div className="basis-3/5">
                            <Input
                                label="City"
                                placeholder="City"
                                variant="bordered"
                                isRequired
                                value={city}
                                onValueChange={setCity}
                            />
                        </div>
                        <div className="basis-2/5">
                            <Input
                                label="State"
                                placeholder="State"
                                variant="bordered"
                                isRequired
                                value={state}
                                onValueChange={setState}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between space-x-2">
                        <Input
                            label="Zip Code"
                            placeholder="Zip Code"
                            variant="bordered"
                            isRequired
                            value={zipcode}
                            onValueChange={setZipcode}
                        />
                        <Input
                            label="Country"
                            placeholder="Country"
                            variant="bordered"
                            isRequired
                            value={country}
                            onValueChange={setCountry}
                        />
                    </div>
                    <Divider className="my-4" />
                    <Select
                        isRequired
                        label="Property Type"
                        placeholder="Select a property type"
                        variant="bordered"
                        fullWidth
                        selectedKeys={propertyType}
                        onSelectionChange={setPropertyType}
                    >
                        {propertyTypes.map((propType) => (
                            <SelectItem key={propType.value} value={propType.value}>
                                {propType.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        isRequired
                        label="Bedrooms"
                        placeholder="Select the number of bedrooms"
                        variant="bordered"
                        fullWidth
                        selectedKeys={bedrooms}
                        onSelectionChange={setBedrooms}
                    >
                        {bedroomsTypes.map((numBeds) => (
                            <SelectItem key={numBeds.value} value={numBeds.value}>
                                {numBeds.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        isRequired
                        label="Bathrooms"
                        placeholder="Select the number of bathrooms"
                        variant="bordered"
                        fullWidth
                        selectedKeys={bathrooms}
                        onSelectionChange={setBathrooms}
                    >
                        {bathroomsTypes.map((numBaths) => (
                            <SelectItem key={numBaths.value} value={numBaths.value}>
                                {numBaths.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Input
                        type="number"
                        label="Square Footage"
                        placeholder="0.0"
                        variant="bordered"
                        isRequired
                        value={squarefootage}
                        onValueChange={setSquarefootage}
                        startContent={
                            <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">sqft</span>
                            </div>
                        }
                    />
                    <div className="flex justify-items-start space-x-2">
                        <Switch 
                            color="primary"
                            isSelected={backyard} 
                            onValueChange={setBackyard}
                        >
                            Backyard
                        </Switch>
                        <Switch 
                            color="primary"
                            isSelected={basement} 
                            onValueChange={setBasement}
                        >
                            Basement
                        </Switch>
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

export default PropertyModal;