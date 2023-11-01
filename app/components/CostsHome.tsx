'use client';

import CostsHeader from './CostsHeader';
import CostsList from './CostsList';

const CostsHome = () => {
    return (
        <div className="flex flex-col justify-center items-center space-y-10">
            <CostsHeader />
            <CostsList />
        </div>
    )
};

export default CostsHome;