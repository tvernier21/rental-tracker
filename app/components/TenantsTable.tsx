"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { 
    Table, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell, 
    getKeyValue,
    Spinner,
    Button,
    User,
    useDisclosure,
} from "@nextui-org/react";
import { FcApproval } from "react-icons/fc";

import TenantModal from "@/app/components/modals/TenantModal";

interface TenantsTableProps {
    propertyId?: string;
    filter?: string;
}

const TenantsTable: React.FC<TenantsTableProps> = ({
    propertyId,
    filter,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [tenants, setTenants] = useState<any[]>([]);
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const [prevId, setPrevId] = useState<string>();
    const [prevName, setPrevName] = useState<string>();
    const [prevEmail, setPrevEmail] = useState<string>();
    const [prevPhone, setPrevPhone] = useState<string>();

    const handleEditClick = useCallback((item: any): void => {
        setPrevId(getKeyValue(item, "id"));
        setPrevName(getKeyValue(item, "name"));
        setPrevEmail(getKeyValue(item, "email"));
        setPrevPhone(getKeyValue(item, "phone"));
        onOpen();
    }, [onOpen]);

    useEffect(() => {
        if (!isLoading) return;

        let endpoint = "/api/tenants/";
        if (propertyId) {
            endpoint = `/api/tenants/property/${propertyId}/`;
        }
        axios.get(endpoint)
            .then((res) => {
                setTenants(res.data);
            })
            .catch((error) => {
                toast.error("Contracts could not be loaded.",
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
    }, [isLoading, propertyId]);

    const renderCell = useCallback((item: any, columnKey: any) => {
        const value = getKeyValue(item, columnKey);
        switch (columnKey) {
            case "name":
                return (
                    <User
                        name={value}
                        avatarProps={{
                            src: getKeyValue(item, "avatar_pathname")
                        }}
                    />
                );
            case "edit":
                return (
                    <div>
                        <Button 
                            color='primary'
                            onPress={() => handleEditClick(item)}
                        >
                            Edit
                        </Button>
                    </div>
                );
            default:
                return value;
        }
    }, [handleEditClick]);

    return(
        <div>
            <TenantModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
                prevId={prevId}
                prevName={prevName}
                prevEmail={prevEmail}
                prevPhone={prevPhone}
            />
            <Table 
                fullWidth={true}
                aria-label="Properties Contracts"
            >
                <TableHeader>
                    <TableColumn key="name" align="center">Name</TableColumn>
                    <TableColumn key="email" align="center">Email</TableColumn>
                    <TableColumn key="phone" align="center">Phone</TableColumn>
                    <TableColumn key="edit" align="center">Edit</TableColumn>
                </TableHeader>
                <TableBody 
                    items={tenants}
                    emptyContent={isLoading ? " " : "No contracts found."}
                    isLoading={isLoading}
                    loadingContent={<Spinner label="Loading contracts..." />}
                >
                    {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => 
                                <TableCell>
                                    {renderCell(item, columnKey)}
                                </TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
};

export default TenantsTable;