
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { toast } from 'react-hot-toast';
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

import supabaseClient from "@/app/lib/supabaseClient";
import { isSelectionEmpty, extractFloatFromSelection } from "@/app/components/inputs/SelectHelper";

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
    props: any[];
    setProps: (props: any[]) => void;
}
  
const PropertyModal: React.FC<PropertyModalProps> = ({
    isOpen,
    onOpenChange,
    onClose,
    props,
    setProps
}) => {
    const { getToken, userId } = useAuth();
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
            toast.error("Please fill out all required fields.");
            return;
        }
        
        const supabaseAccessToken = await getToken({
            template: "supabase",
        });
        const supabase = await supabaseClient(supabaseAccessToken);
        const { data } = await supabase
            .from("properties")
            .insert({
                street_address: street,
                city_address: city,
                state_address: state,
                zipcode_address: zipcode,
                country_address: country,
                prop_type: Array.from(propertyType)[0],
                bedrooms: extractFloatFromSelection(bedrooms),
                bathrooms: extractFloatFromSelection(bathrooms),
                sqr_feet: parseFloat(squarefootage),  // Assuming squarefootage is a string, you need to convert it to a float.
                backyard: backyard,
                basement: basement,
                img: null,  // If you have an image to insert, replace null with the image data or URL.
                user_id: userId
            })
            .select();

        if (data) {
            setProps([...props, data[0]]);
        } else {
            // Handle the case where data is null, if needed.
            console.error("Data from Supabase is null after insert");
        }
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
        onClose();
        toast.success("Property added successfully!");
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
                        <Button color="primary" onPress={handleSubmit}>
                            Add
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