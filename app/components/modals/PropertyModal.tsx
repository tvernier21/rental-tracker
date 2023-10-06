import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Divider} from "@nextui-org/react";

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
                    <Input
                        label="Property Name"
                        placeholder="Property Name"
                        variant="bordered"
                    />
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