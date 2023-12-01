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
} from "@nextui-org/react";
import { FcApproval } from "react-icons/fc";


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

    useEffect(() => {
        if (!isLoading) return;

        let endpoint = "/api/contracts";
        if (propertyId) {
            endpoint.concat(`/${propertyId}/`);
        }
        axios.get(endpoint)
            .then((res) => {
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
    }, [isLoading]);

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
            case "edit":
                return (
                    <Button color='primary'>
                        Edit
                    </Button>
                );
            default:
                return value;
        }
    }, []);

    return (
        <div>
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
