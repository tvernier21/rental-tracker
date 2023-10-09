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
    Switch
} from "@nextui-org/react";


const bedrooms = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" }
];

const bathrooms = [
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
    onOpen: () => void;
    onOpenChange: () => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({
    isOpen,
    onOpen,
    onOpenChange
}) => {

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
                    />
                    <div className="flex justify-between space-x-2">
                        <Input
                            label="City"
                            placeholder="City"
                            variant="bordered"
                            isRequired
                        />
                        <Input
                            label="State"
                            placeholder="State"
                            variant="bordered"
                            isRequired
                        />
                    </div>
                    <div className="flex justify-between space-x-2">
                        <Input
                            label="Zip Code"
                            placeholder="Zip Code"
                            variant="bordered"
                            isRequired
                        />
                        <Input
                            label="Country"
                            placeholder="Country"
                            variant="bordered"
                            isRequired
                        />
                    </div>
                    <Divider className="my-4" />
                    <Select
                        isRequired
                        label="Property Type"
                        placeholder="Select a property type"
                        variant="bordered"
                        fullWidth
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
                    >
                        {bedrooms.map((numBeds) => (
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
                    >
                        {bathrooms.map((numBaths) => (
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
                        startContent={
                            <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">sqft</span>
                            </div>
                        }
                    />
                    <div className="flex justify-items-start space-x-2">
                        <Switch color="primary">
                            Backyard
                        </Switch>
                        <Switch color="primary">
                            Basement
                        </Switch>
                    </div>
                </ModalBody>
                <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                            Cancel
                        </Button>
                        <Button color="primary" onPress={onClose}>
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

// prop_type text null,
// bedrooms real null,
// bathrooms real null,
// backyard boolean null,
// sqr_feet real null,