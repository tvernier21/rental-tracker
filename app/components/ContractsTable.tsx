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
    useDisclosure,
    AvatarGroup,
    Avatar,
    Tooltip,
} from "@nextui-org/react";
import { FcApproval } from "react-icons/fc";

import ContractsModal from "./modals/ContractsModal";

interface ContractsTableProps {
    propertyId?: string;
    filter?: string;
}

const ContractsTable: React.FC<ContractsTableProps> = ({
    propertyId,
    filter,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [contracts, setContracts] = useState<any[]>([]);
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const [prevData, setPrevData] = useState<any>();

    const handleEditClick = useCallback((item: any): void => {
        setPrevData({
            id: getKeyValue(item, "id"),
            property_id: getKeyValue(item, "property_id"),
            address: getKeyValue(item, "address"),
            rent: getKeyValue(item, "rent"),
            pet_deposit: getKeyValue(item, "pet_deposit"),
            pet_refundable: getKeyValue(item, "pet_refundable"),
            start_date: getKeyValue(item, "start_date"),
            end_date: getKeyValue(item, "end_date"),
            tenants: getKeyValue(item, "tenants"),
        })
        onOpen();
    }, [onOpen]);

    useEffect(() => {
        if (!isLoading) return;

        let endpoint = "/api/contracts";
        if (propertyId) {
            endpoint.concat(`/${propertyId}/`);
        }
        axios.get(endpoint)
            .then((res) => {
                console.log(res.data);
                setContracts(res.data);
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
            case "active":
                return (
                    value === true ? <FcApproval /> : <></>
                );
            case "pet_refundable":
                return (
                    value === true ? <FcApproval /> : <></>
                );
            case "rent":
                if (value === null) {
                    return "N/A";
                } else {
                    return "$" + value.toString();
                }
            case "pet_deposit":
                if (value === null) {
                    return "N/A";
                } else {
                    return "$" + value.toString();
                }
            case "start_date":
                // format date as month-day-year
                return `${value.split("-")[1]}-${value.split("-")[2]}-${value.split("-")[0]}`;
            case "end_date":
                // format date as month-day-year
                return `${value.split("-")[1]}-${value.split("-")[2]}-${value.split("-")[0]}`;
            case "tenants_info":
                return (
                    <AvatarGroup max={3}>
                        {value.map((tenant: any, i: number) => (
                            <Tooltip key={i} color="secondary" content={
                                <div className="px-1 py-2">
                                    <div className="text-small font-bold">{tenant.name}</div>
                                    <div className="text-tiny">{tenant.phone}</div>
                                    <div className="text-tiny">{tenant.email}</div>
                                </div>
                            }>
                                <Avatar
                                    size="sm"
                                    src={tenant.avatar_pathname}
                                />
                            </Tooltip>
                        ))}
                    </AvatarGroup>
                )
            case "edit":
                return (
                    <Button 
                        color='primary'
                        onPress={() => handleEditClick(item)}    
                    >
                        Edit
                    </Button>
                );
            default:
                return value;
        }
    }, [handleEditClick]);

    return (
        <div>
            <ContractsModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
                prevData={prevData}
            />
            <Table 
                fullWidth={true}
                aria-label="Properties Contracts"
            >
                <TableHeader>
                    <TableColumn key="address" align="center">Property</TableColumn>
                    <TableColumn key="rent" align="center">Rent</TableColumn>
                    <TableColumn key="pet_deposit" align="center">Pet Deposit</TableColumn>
                    <TableColumn key="pet_refundable" align="center">Refundable</TableColumn>
                    <TableColumn key="start_date" align="center">Start Date</TableColumn>
                    <TableColumn key="end_date" align="center">End Date</TableColumn>
                    <TableColumn key="tenants_info" align="center">Tenants</TableColumn>
                    <TableColumn key="edit" align="center">Edit</TableColumn>
                </TableHeader>
                <TableBody 
                    items={contracts}
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
    );
};

export default ContractsTable;
