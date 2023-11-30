'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { CostCard, LoadingCostCard } from '@/app/components/cards/CostCard';

interface CostsListProps {
    propertyId?: string;
};

const CostsList: React.FC<CostsListProps> = ({
    propertyId
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [costs, setCosts] = useState<any[]>([]);

    useEffect(() => {
        if (!isLoading) return;
        const endpoint = propertyId ? `/api/costs/${propertyId}` : '/api/costs';
        axios.get(endpoint)
            .then((res) => {
                setCosts(res.data);
            })
            .catch((error) => {
                toast.error("Costs could not be loaded.",
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [isLoading, propertyId]);

    return (
        <div>
            {isLoading ? (
                <div className="flex flex-col justify-center items-center gap-4">
                    <LoadingCostCard />
                    <LoadingCostCard />
                    <LoadingCostCard />
                    <LoadingCostCard />
                    <LoadingCostCard />
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center gap-4">
                    {costs.map((cost, i) => (
                        <CostCard
                            key={i}
                            type={cost.type}
                            price={cost.price}
                            date={cost.date}
                            description={cost.description}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CostsList;