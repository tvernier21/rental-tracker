"use client";

import { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { UserButton } from "@clerk/nextjs"
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { AcmeLogo } from "./AcmeLogo"

const NavBar = () => {
    const tab = usePathname().split("/")[1];
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <Navbar
            classNames={{
                item: [
                "flex",
                "relative",
                "h-full",
                "items-center",
                "data-[active=true]:after:content-['']",
                "data-[active=true]:after:absolute",
                "data-[active=true]:after:bottom-0",
                "data-[active=true]:after:left-0",
                "data-[active=true]:after:right-0",
                "data-[active=true]:after:h-[2px]",
                "data-[active=true]:after:rounded-[2px]",
                "data-[active=true]:after:bg-primary",
                ]
          }}
        >
            <NavbarBrand>
                <AcmeLogo />
                <p className="font-bold text-inherit">ACME</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive={tab === "properties"}>
                    <Link 
                        color="foreground" 
                        href="/properties"
                        as={NextLink}
                    >
                        Properties
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={tab === "costs"}>
                    <Link 
                        color="foreground" 
                        href="/costs"
                        as={NextLink}
                    >
                        Costs
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={tab === "contracts"}>
                    <Link 
                            color="foreground" 
                            href="/contracts"
                            as={NextLink}
                            isDisabled
                    >
                        Contracts
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={tab === "tenants"}>
                    <Link 
                            color="foreground" 
                            href="/tenants"
                            as={NextLink}
                            isDisabled
                    >
                        Tenants
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={tab === "analytics"}>
                    <Link 
                        color="foreground" 
                        href="/analytics"
                        as={NextLink}
                        isDisabled    
                    >
                        Analytics
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    {isClient && <UserButton afterSignOutUrl="/" />}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}

export default NavBar; 