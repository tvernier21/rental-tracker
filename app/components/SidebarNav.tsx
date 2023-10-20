"use client";

import "@/app/(root)/(routes)/properties/[propertyId]/box.css";
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
    Listbox,
    ListboxItem,
    ListboxSection
} from "@nextui-org/react"

interface SidebarNavProps {
    items: {
        key: string
        title: string
        href: string
        section: string
    }[]
}

const SidebarNav: React.FC<SidebarNavProps> = ({ 
    items 
}) => {
    const router = useRouter();
    const [selectedKeys, setSelectedKeys] = useState(new Set([items[0].key]));
    console.log(selectedKeys)

    return (
        <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            <div className="w-full max-w-[360px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                <Listbox
                    aria-label="Dynamic Actions"
                    variant="solid"
                    disallowEmptySelection={true}
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={(keys) => {
                        if (keys instanceof Set) {
                            setSelectedKeys(keys as Set<string>);
                        } else {
                            setSelectedKeys(new Set([keys]));
                        }
                    }}
                    autoFocus={true}
                    itemClasses={{
                        selectedIcon: "hide-icon"
                    }}
                >
                    <ListboxSection title="General" showDivider>
                        {items.filter(item => item.section === "general").map(item => (
                            <ListboxItem
                                key={item.key}
                                onPress={() => router.push(item.href)}
                            >
                                {item.title}
                            </ListboxItem>
                        ))}
                    </ListboxSection>
                    <ListboxSection title="Contracts">
                        {items.filter(item => item.section === "contracts").map(item => (
                            <ListboxItem
                                key={item.key}
                                onPress={() => router.push(item.href)}
                            >
                                {item.title}
                            </ListboxItem>
                        ))}
                    </ListboxSection>
                </Listbox>
            </div>
        </nav>
    );
};

export default SidebarNav;
