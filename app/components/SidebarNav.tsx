"use client"

import NextLink from "next/link";
import { usePathname } from "next/navigation"
import {
    Listbox,
    ListboxItem,
    ListboxSection
} from "@nextui-org/react"

interface SidebarNavProps {
    items: {
        key: string
        label: string
        href: string
        section: string
    }[]
}

const SidebarNav: React.FC<SidebarNavProps> = ({ 
    items 
}) => {
    const pathname = usePathname()

    return (
        <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            <Listbox
                aria-label="Dynamic Actions"
                variant="flat"
            >
                <ListboxSection title="General" showDivider>
                    {items.filter(item => item.section === "general").map(item => (
                        <ListboxItem
                            key={item.key}
                            color={item.key === "delete" ? "danger" : "default"}
                            className={item.key === "delete" ? "text-danger" : ""}
                        >
                            {item.label}
                        </ListboxItem>
                    ))}
                </ListboxSection>
                <ListboxSection title="Contracts" showDivider>  
                    {items.filter(item => item.section === "contracts").map(item => (
                        <ListboxItem
                            key={item.key}
                            color={item.key === "delete" ? "danger" : "default"}
                            className={item.key === "delete" ? "text-danger" : ""}
                        >
                            {item.label}
                        </ListboxItem>
                    ))}
                </ListboxSection>
            </Listbox>
        </nav>
    );
};

export default SidebarNav;