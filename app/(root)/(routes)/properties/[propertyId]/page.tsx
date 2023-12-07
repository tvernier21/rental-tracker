import PropertyOverview from '@/app/components/PropertyOverview'

const PropertyOverviewPage = ({ params }: { params: { propertyId: string } }) => {
    return (
        <div>
            <PropertyOverview
                propertyId={params.propertyId}
            />
        </div>
    );
};

export default PropertyOverviewPage;