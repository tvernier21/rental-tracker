"use client";

import "@/app/(root)/(routes)/properties/[propertyId]/box.css";
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
    Listbox,
    ListboxItem,
    ListboxSection,
    Spinner
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
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedKeys, setSelectedKeys] = useState(new Set([items[0].key]));

    useEffect(() => {
        if (isLoading) {
            const item = items.find(item => item.href === pathname);
            if (item) {
                setSelectedKeys(new Set([item.key]));
            } else {
                setSelectedKeys(new Set([items[0].key]));
            }
            setIsLoading(false);
        }
    }, [pathname, isLoading, items]);


    return (
        <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            <div className="w-full max-w-[360px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                {isLoading ? (
                    <Spinner />
                ) : (
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
                )}
            </div>
        </nav>
    );
};

export default SidebarNav;
