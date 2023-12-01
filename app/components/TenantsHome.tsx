'use client';

import TenantsHeader from "@/app/components/TenantsHeader";
import TenantsTable from "@/app/components/TenantsTable";

const TenantsHome = () => {
    return (
        <div className="flex flex-col justify-center items-center space-y-10">
            <TenantsHeader />
            <TenantsTable />
        </div>
    )
};

export default TenantsHome;