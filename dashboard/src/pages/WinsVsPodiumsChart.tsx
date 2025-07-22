import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { API_BASE_URL } from '../utils/common';

interface DriverStats {
    id: number;
    full_name: string;
    wins: number;
    podiums: number;
}

const WinsVsPodiumsChart: React.FC = () => {
    const [data, setData] = useState<DriverStats[]>([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/dashboard/wins_vs_podiums`)
            .then((res) => res.json())
            .then(setData)
            .catch(console.error);
    }, []);

    if (data.length === 0) {
        return <div>Loading wins vs podiums data...</div>;
    }

    return (
        <Plot
            data={[
                {
                    x: data.map((driver) => driver.full_name),
                    y: data.map((driver) => driver.wins),
                    type: 'bar',
                    name: 'Wins',
                    marker: { color: 'gold' },
                },
                {
                    x: data.map((driver) => driver.full_name),
                    y: data.map((driver) => driver.podiums),
                    type: 'bar',
                    name: 'Podiums',
                    marker: { color: 'silver' },
                },
            ]}
            layout={{
                barmode: 'group',
                title: { text: 'Wins vs Podiums per Driver' },
                xaxis: { title: 'Driver', tickangle: -45 },
                yaxis: { title: 'Count' },
                margin: { b: 120 },
            }}
            style={{ width: '100%', height: '500px' }}
        />
    );
};

export default WinsVsPodiumsChart;
