import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { API_BASE_URL } from '../utils/common';

interface NationalityCount {
    nationality: string;
    driver_count: number;
}

const DriverNationalityChart: React.FC = () => {
    const [data, setData] = useState<NationalityCount[]>([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/dashboard/driver_nationalities`)
            .then((res) => res.json())
            .then(setData)
            .catch(console.error);
    }, []);

    if (data.length === 0) {
        return <div>Loading driver nationalities...</div>;
    }

    return (
        <Plot
            data={[
                {
                    type: 'pie',
                    labels: data.map((item) => item.nationality),
                    values: data.map((item) => item.driver_count),
                    textinfo: 'label+percent',
                    hole: 0.3, // optional donut chart
                },
            ]}
            layout={{
                title: { text: 'Driver Nationality Distribution' },
            }}
            style={{ width: '100%', height: '500px' }}
        />
    );
};

export default DriverNationalityChart;
