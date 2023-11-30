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
            case "rent":
                return (
                    // Convert to string and add dollar sign at the beginnign
                    "$" + value.toString()
                );
            default:
                return value;
        }
    }, []);

    return (
        <div>
            <Table aria-label="Properties Contracts">
                <TableHeader>
                    <TableColumn key="address" align="center">Property</TableColumn>
                    <TableColumn key="type" align="center">Type</TableColumn>
                    <TableColumn key="rent" align="center">Rent</TableColumn>
                    <TableColumn key="active" align="center">Active</TableColumn>
                    <TableColumn key="start_date" align="center">Start Date</TableColumn>
                    <TableColumn key="end_date" align="center">End Date</TableColumn>
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
