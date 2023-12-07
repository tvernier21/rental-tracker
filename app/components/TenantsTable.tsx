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
    Dropdown, 
    DropdownTrigger, 
    DropdownMenu, 
    DropdownItem,
} from "@nextui-org/react";

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

    const handleDropdownClick = useCallback((key: any, item: any): void => {
        if (key === "edit") {
            setPrevId(getKeyValue(item, "id"));
            setPrevName(getKeyValue(item, "name"));
            setPrevEmail(getKeyValue(item, "email"));
            setPrevPhone(getKeyValue(item, "phone"));
            onOpen();
        } else if (key === "delete") {
            const tenantId = getKeyValue(item, "id");
            axios.delete(`/api/tenants/${tenantId}/`)
                .then((res) => {
                    toast.success("Contract deleted successfully.",
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
                    toast.error("Contract could not be deleted.",
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
                    window.location.reload();
                });
        }
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
                    <Dropdown>
                        <DropdownTrigger>
                            <Button 
                                color="default"
                                variant="faded"
                                className="capitalize"
                            >
                                Edit
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu 
                            aria-label="Dropdown Variants"
                            color="default"
                            variant="faded"
                            onAction={(key) => handleDropdownClick(key, item)}
                        >
                            <DropdownItem key="edit">Edit tenant</DropdownItem>
                            <DropdownItem key="delete" className="text-danger" color="danger">
                                Delete tenant
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                );
            default:
                return value;
        }
    }, [handleDropdownClick]);

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
                aria-label="Tenants table"
            >
                <TableHeader>
                    <TableColumn key="name" align="center">Name</TableColumn>
                    <TableColumn key="email" align="center">Email</TableColumn>
                    <TableColumn key="phone" align="center">Phone</TableColumn>
                    <TableColumn key="edit" align="center">Edit</TableColumn>
                </TableHeader>
                <TableBody 
                    items={tenants}
                    emptyContent={isLoading ? " " : "No tenants found."}
                    isLoading={isLoading}
                    loadingContent={<Spinner label="Loading tenants..." />}
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