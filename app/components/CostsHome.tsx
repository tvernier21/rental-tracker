'use client';

import CostCard from './cards/CostCard';

const CostsHome = () => {
    return (
        <div className="flex flex-col justify-center items-center space-y-10">
            <CostCard />
            {/* <CostsTable /> */}
        </div>
    );
};

export default CostsHome;