'use client';

// import ContractsHeader from '@/app/components/ContractsHeader';
import ContractsTable from '@/app/components/ContractsTable';

const ContractsHome = () => {
    return (
        <div className="flex flex-col justify-center items-center h-full">
            <div className="">
                <ContractsTable />
            </div>
        </div>
    )
};

export default ContractsHome;
