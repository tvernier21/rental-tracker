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
} from "@nextui-org/react";
import { FcApproval } from "react-icons/fc";


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

    useEffect(() => {
        if (!isLoading) return;

        let endpoint = "/api/tenants/";
        if (propertyId) {
            endpoint.concat(`/${propertyId}/`);
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
    }, [isLoading]);

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
            default:
                return value;
        }
    }, []);

    return(
        <div>
            <Table 
                fullWidth={true}
                aria-label="Properties Contracts"
            >
                <TableHeader>
                    <TableColumn key="name" align="center">Name</TableColumn>
                    <TableColumn key="email" align="center">Email</TableColumn>
                    <TableColumn key="phone" align="center">Phone</TableColumn>
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