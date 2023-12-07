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


interface TenantModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    onClose: () => void;
    prevId?: string;
    prevName?: string;
    prevEmail?: string;
    prevPhone?: string;
}
  
const TenantModal: React.FC<TenantModalProps> = ({
    isOpen,
    onOpenChange,
    onClose,
    prevId,
    prevName,
    prevEmail,
    prevPhone,
}) => {
    const [name, setName] = useState(prevName || "");
    const [email, setEmail] = useState(prevEmail || "");
    const [phone, setPhone] = useState(prevPhone || "");
    const isUpdate = prevId || prevName || prevEmail || prevPhone ? true : false;

    useEffect(() => {
        setName(prevName || "");
        setEmail(prevEmail || "");
        setPhone(prevPhone || "");
    }, [prevId, prevName, prevEmail, prevPhone]);

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
        
        let postData = {
            name: name,
            email: email,
            phone: phone,
        };
        if (isUpdate) {
            postData = {
                ...postData,
                id: prevId,
            } as typeof postData;
        }

        axios.post('/api/tenants', postData)
            .then((res) => {
                // Check for the status code in the response
                let message = "Tenant added successfully."
                if (prevId) {
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
                setName("");
                setEmail("");
                setPhone("");
                // Refresh the page
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
                    New Tenant
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
                        <Button color={prevId ? "success" : "primary"} onPress={handleSubmit}>
                            {prevId ? "Update" : "Add"}
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