import PropertyHeader from "@/app/components/PropertyHeader";
import SidebarNav from "@/app/components/SidebarNav";

const PropertyLayout = ({
    children,
    params
}: {
    children: React.ReactNode;
    params: {
        propertyId: string;
    };
}) => {

    const sidebarNavItems = [
      {
        key: "overview",
        label: "Overview",
        href: `/properties/${params.propertyId}`,
        section: 'general'
      },
      {
        key: "tenants",
        label: "Tenants",
        href: `/properties/${params.propertyId}/tenants`,
        section: 'general'
      },
      {
        key: "lease",
        label: "Lease",
        href: `/properties/${params.propertyId}/contracts`,
        section: 'contracts'
      },
      {
        key: "mortgage",
        label: "Mortgage",
        href: `/properties/${params.propertyId}/contracts`,
        section: 'contracts'
      },
      {
        key: "gas",
        label: "Gas",
        href: `/properties/${params.propertyId}/contracts`,
        section: 'contracts'
      },
    ];

    return (
      <>
        <div className="hidden space-y-6 p-10 pb-16 md:block">
          <div className="space-y-3 mx-5">
            <PropertyHeader propertyId={params.propertyId} />
          </div>
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">
              {children}
            </div>
          </div>
        </div>
      </>
    );
};

export default PropertyLayout;
