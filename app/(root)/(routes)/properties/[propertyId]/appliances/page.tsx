import { HorizontalSeparator } from "@/app/components/UI/Separator";
import AppliancesForm from "@/app/components/forms/AppliancesForm";

const PropertyAppliancesPage = ({ params }: { params: { propertyId: string } }) => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Appliances</h3>
                <p className="text-sm text-muted-foreground">
                Manage and update appliances for this property.
                </p>
            </div>
            <HorizontalSeparator />
            <AppliancesForm propertyId={params.propertyId} />
        </div>
    );
};

export default PropertyAppliancesPage;