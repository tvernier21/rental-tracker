import { HorizontalSeparator } from "@/app/components/UI/Separator";
import AppliancesForm from "@/app/components/forms/AppliancesForm";
import HookButton from "@/app/components/UI/HookButton";

const PropertyAppliancesPage = ({ params }: { params: { propertyId: string } }) => {
    return (
        <div className="space-y-6">
            <div className="flex flex-row justify-between">
                <div className="">
                    <h2 className="text-xl font-medium">
                        Appliances
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Manage and update appliances for this property.
                    </p>
                </div>
                <div className="pt-1">
                    <HookButton 
                        type="appliances" 
                        propertyId={params.propertyId}
                    />
                </div>
            </div>
            <HorizontalSeparator />
            <AppliancesForm propertyId={params.propertyId} />
        </div>
    );
};

export default PropertyAppliancesPage;