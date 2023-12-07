import { HorizontalSeparator } from "@/app/components/UI/Separator";
import HookButton from "@/app/components/UI/HookButton";
import TenantsTable from "@/app/components/TenantsTable";

const PropertyTenantsPage = ({ params }: { params: { propertyId: string } }) => {
    return (
        <div className="space-y-6">
            <div className="flex flex-row justify-between">
                <div className="">
                    <h2 className="text-xl font-medium">
                        Tenants
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Manage your properties tenants
                    </p>
                </div>
                <div className="pt-1">
                    <HookButton 
                        type="costs" 
                        propertyId={params.propertyId}
                    />
                </div>
            </div>
            <HorizontalSeparator />
            <TenantsTable 
                propertyId={params.propertyId}
            />
        </div>
    );
};

export default PropertyTenantsPage;