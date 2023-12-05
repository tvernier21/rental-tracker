import { useEffect, useState } from "react";
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
    Divider
} from "@nextui-org/react";


interface ContractsModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    onClose: () => void;
    // prevId?: string;
    // prevName?: string;
    // prevEmail?: string;
    // prevPhone?: string;
}
  
const ContractsModal: React.FC<ContractsModalProps> = ({
    isOpen,
    onOpenChange,
    onClose,
    // prevId,
    // prevName,
    // prevEmail,
    // prevPhone,
}) => {
    const [rent, setRent] = useState<string>();
    const [petDeposit, setPetDeposit] = useState<string>();
    const [petRefundable, setPetRefundable] = useState<boolean>();
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();

    // useEffect(() => {
    //     setName(prevName || "");
    //     setEmail(prevEmail || "");
    //     setPhone(prevPhone || "");
    // }, [prevId, prevName, prevEmail, prevPhone]);

    const handleSubmit = async () => {
        if (startDate === undefined || 
            endDate === undefined || 
            rent === undefined ||
            petDeposit === undefined ||
            petRefundable === undefined) {
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
            start_date: startDate,
            end_date: endDate,
            rent: rent,
            pet_deposit: petDeposit,
            pet_refundable: petRefundable,
        };
        // if (isUpdate) {
        //     postData = {
        //         ...postData,
        //         id: prevId,
        //     } as typeof postData;
        // }

        axios.post('/api/tenants', postData)
            .then((res) => {
                // Check for the status code in the response
                let message = "Tenant added successfully."
                // if (prevId) {
                //     message = "Tenant updated successfully."
                // }
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
                setRent(undefined);
                setPetDeposit(undefined);
                setPetRefundable(undefined);
                setStartDate(undefined);
                setEndDate(undefined);
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
                        label="Rent"
                        placeholder="full name"
                        variant="bordered"
                        isRequired
                        value={rent}
                        onValueChange={setRent}
                    />
                    <Input
                        label="Pet Deposit"
                        placeholder="email"
                        variant="bordered"
                        isRequired
                        value={petDeposit}
                        onValueChange={setPetDeposit}
                    />
                </ModalBody>
                <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                            Cancel
                        </Button>
                        <Button color="primary" onPress={handleSubmit}>
                            {/* {prevId ? "Update" : "Add"} */}
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

export default ContractsModal;