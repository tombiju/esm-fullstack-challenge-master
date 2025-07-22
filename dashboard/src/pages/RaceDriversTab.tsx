import React, { useEffect, useState } from 'react';
import { useRecordContext, SimpleList } from 'react-admin';

interface Driver {
    id: number;
    number: string;
    forename: string;
    surname: string;
    nationality: string;
}

const API_BASE_URL = 'http://localhost:9000';

const RaceDriversTab: React.FC = () => {
    const record = useRecordContext();
    const [drivers, setDrivers] = useState<Driver[]>([]);

    useEffect(() => {
        if (record) {
            fetch(`${API_BASE_URL}/races/${record.id}/drivers`)
                .then(res => res.json())
                .then(setDrivers)
                .catch(console.error);
        }
    }, [record]);

    if (drivers.length === 0) {
        return <div>No drivers found for this race.</div>;
    }

    return (
        <SimpleList
            data={drivers}
            primaryText={record => `${record.forename} ${record.surname}`}
            secondaryText={record => record.nationality}
            tertiaryText={record => `Number: ${record.number ?? '-'}`}
        />
    );
};

export default RaceDriversTab;
