import { useState } from "react";
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


interface TenantModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    onClose: () => void;
}
  
const TenantModal: React.FC<TenantModalProps> = ({
    isOpen,
    onOpenChange,
    onClose,
}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async () => {
        if (name === "" || (email === "" && phone === "")) {
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

        const postData = {
            name: name,
            email: email,
            phone: phone,
        };
        axios.post('/api/tenants', postData)
            .then((res) => {
                // Check for the status code in the response
                toast.success("Tenant added successfully.",
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
                setName("");
                setEmail("");
                setPhone("");
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
                        label="Name"
                        placeholder="full name"
                        variant="bordered"
                        isRequired
                        value={name}
                        onValueChange={setName}
                    />
                    <Divider />
                    <Input
                        label="Email"
                        placeholder="email"
                        variant="bordered"
                        value={email}
                        onValueChange={setEmail}
                    />
                    <Input
                        label="Phone Number"
                        placeholder="phone"
                        variant="bordered"
                        value={phone}
                        onValueChange={setPhone}
                    />
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

export default TenantModal;