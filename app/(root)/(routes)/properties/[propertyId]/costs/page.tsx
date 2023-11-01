import { HorizontalSeparator } from "@/app/components/UI/Separator";
import HookButton from "@/app/components/UI/HookButton";

const PropertyCostsPage = ({ params }: { params: { propertyId: string } }) => {
    return (
        <div className="space-y-6">
            <div className="flex flex-row justify-between">
                <div className="">
                    <h2 className="text-xl font-medium">
                        Costs
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Manage and add costs for this property.
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
            {/* <AppliancesForm propertyId={params.proper tyId} /> */}
        </div>
    );
};

export default PropertyCostsPage;