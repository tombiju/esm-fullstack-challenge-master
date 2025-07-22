import React, { useEffect, useState } from 'react';
import { useRecordContext, SimpleList } from 'react-admin';

interface Constructor {
    id: number;
    name: string;
    nationality: string;
}

const API_BASE_URL = 'http://localhost:9000';

const RaceConstructorsTab: React.FC = () => {
    const record = useRecordContext();
    const [constructors, setConstructors] = useState<Constructor[]>([]);

    useEffect(() => {
        if (record) {
            fetch(`${API_BASE_URL}/races/${record.id}/constructors`)
                .then(res => res.json())
                .then(setConstructors)
                .catch(console.error);
        }
    }, [record]);

    if (constructors.length === 0) {
        return <div>No constructors found for this race.</div>;
    }

    return (
        <SimpleList
            data={constructors}
            primaryText={record => record.name}
            secondaryText={record => record.nationality}
        />
    );
};

export default RaceConstructorsTab;
