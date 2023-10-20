import NavBar from "@/app/components/NavBar";

const RootLayout = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <NavBar />
        </div>
      </div>
      <main className="h-full">
        {children}
      </main>
    </div>
   );
}
 
export default RootLayout;