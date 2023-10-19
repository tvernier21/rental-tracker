import PropertyHeader from "@/app/components/PropertyHeader";

const PropertyPage = ({ params }: { params: { propertyId: string } }) => {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            {/* Header Content */}
            <PropertyHeader propertyId={params.propertyId} />
            {/* Property Info */}
            {/* Property Tenants */}
            {/* Property Contracts */}
        </div>
    );
};

export default PropertyPage;