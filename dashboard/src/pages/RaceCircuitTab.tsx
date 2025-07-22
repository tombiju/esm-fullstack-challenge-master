import React, { useEffect, useState } from 'react';
import { useRecordContext, SimpleShowLayout, TextField } from 'react-admin';

interface Circuit {
    id: number;
    name: string;
    location: string;
    country: string;
}

const API_BASE_URL = 'http://localhost:9000';

const RaceCircuitTab: React.FC = () => {
    const record = useRecordContext();
    const [circuit, setCircuit] = useState<Circuit | null>(null);

    useEffect(() => {
        if (record) {
            fetch(`${API_BASE_URL}/races/${record.id}/circuit`)
                .then(res => res.json())
                .then(setCircuit)
                .catch(console.error);
        }
    }, [record]);

    if (!circuit) {
        return <div>Loading circuit data...</div>;
    }

    return (
        <SimpleShowLayout record={circuit}>
            <TextField source="name" label="Name" />
            <TextField source="location" label="Location" />
            <TextField source="country" label="Country" />
        </SimpleShowLayout>
    );
};

export default RaceCircuitTab;
