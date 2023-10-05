import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

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
                jawn
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