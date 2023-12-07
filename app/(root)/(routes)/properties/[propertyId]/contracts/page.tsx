import { HorizontalSeparator } from "@/app/components/UI/Separator";
import HookButton from "@/app/components/UI/HookButton";
import ContractsTable from "@/app/components/ContractsTable";

const PropertyContractsPage = ({ params }: { params: { propertyId: string } }) => {
    return (
        <div className="space-y-6">
            <div className="flex flex-row justify-between">
                <div className="">
                    <h2 className="text-xl font-medium">
                        Contracts
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Manage your property contracts
                    </p>
                </div>
                <div className="pt-1">
                    <HookButton 
                        type="contracts" 
                        propertyId={params.propertyId}
                    />
                </div>
            </div>
            <HorizontalSeparator />
            <ContractsTable 
                propertyId={params.propertyId}
            />
        </div>
    );
};

export default PropertyContractsPage;