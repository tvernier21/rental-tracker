'use client';

// import ContractsHeader from '@/app/components/ContractsHeader';
import ContractsTable from '@/app/components/ContractsTable';

const ContractsHome = () => {
    return (
        <div className="flex flex-col justify-center items-center space-y-10">
            <ContractsTable />
        </div>
    )
};

export default ContractsHome;
