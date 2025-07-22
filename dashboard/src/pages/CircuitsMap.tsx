import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { API_BASE_URL } from '../utils/common';

interface Circuit {
    name: string;
    location: string;
    country: string;
    lat: number;
    lng: number;
}

const CircuitsMap: React.FC = () => {
    const [data, setData] = useState<Circuit[]>([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/dashboard/circuits_locations`)
            .then((res) => res.json())
            .then(setData)
            .catch(console.error);
    }, []);

    if (data.length === 0) {
        return <div>Loading circuits map...</div>;
    }

    return (
        <Plot
            data={[
                {
                    type: 'scattergeo',
                    mode: 'markers',
                    text: data.map(circuit =>
                        `${circuit.name} (${circuit.location}, ${circuit.country})`
                    ),
                    lon: data.map(circuit => circuit.lng),
                    lat: data.map(circuit => circuit.lat),
                    marker: {
                        size: 8,
                        color: 'red',
                    },
                },
            ]}
            layout={{
                title: { text: 'Map of F1 Circuits' },
                geo: {
                    projection: { type: 'natural earth' },
                    showland: true,
                },
                margin: { t: 50, b: 0 },
            }}
            style={{ width: '100%', height: '600px' }}
        />
    );
};

export default CircuitsMap;
