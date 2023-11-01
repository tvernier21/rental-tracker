import { HorizontalSeparator } from "@/app/components/UI/Separator";
import AppliancesForm from "@/app/components/forms/AppliancesForm";

const PropertyCostsPage = ({ params }: { params: { propertyId: string } }) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-medium">
                    Costs
                </h2>
                <p className="text-sm text-muted-foreground">
                    Manage and add costs for this property.
                </p>
            </div>
            <HorizontalSeparator />
            <AppliancesForm propertyId={params.propertyId} />
        </div>
    );
};

export default PropertyCostsPage;