"use client";

import { useState } from "react";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { UserButton } from "@clerk/nextjs"

import { AcmeLogo } from "./AcmeLogo"

const NavBar = () => {
    const [tab, setTab] = useState("homes")

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
                ],
          }}
        >
            <NavbarBrand>
                <AcmeLogo />
                <p className="font-bold text-inherit">ACME</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive={tab === "homes"}>
                    <Link color="foreground" href="#">
                        Homes
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={tab === "tenants"}>
                    <Link href="#" aria-current="page">
                        Tenants
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={tab === "costs"}>
                    <Link color="foreground" href="#">
                        Costs
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={tab === "Analytics"}>
                    <Link color="foreground" href="#">
                        Analytics
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <UserButton afterSignOutUrl="/" />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}

export default NavBar; 