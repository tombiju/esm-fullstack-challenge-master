from typing import List, Optional

from fastapi import APIRouter, HTTPException

from datetime import date
from esm_fullstack_challenge.models import AutoGenModels
from esm_fullstack_challenge.db.utils import create_record
from esm_fullstack_challenge.routers.utils import \
    get_route_list_function, get_route_id_function
from pydantic import BaseModel, HttpUrl
import sqlite3


drivers_router = APIRouter()

class DriverCreateRequest(BaseModel):
    driver_ref: str
    number: str = None
    code: str = None
    forename: str
    surname: str
    dob: date
    nationality: str
    url: HttpUrl = None  # Validates URL input

class DriverUpdateRequest(BaseModel):
    driver_ref: Optional[str] = None
    number: Optional[str] = None
    code: Optional[str] = None
    forename: Optional[str] = None
    surname: Optional[str] = None
    dob: Optional[date] = None
    nationality: Optional[str] = None
    url: Optional[HttpUrl] = None

class DriverResponse(DriverCreateRequest):
    id: int

table_model = AutoGenModels['drivers']

# Route to get driver by id
get_driver = get_route_id_function('drivers', table_model)
drivers_router.add_api_route(
    '/{id}', get_driver,
    methods=["GET"], response_model=table_model,
)

# Route to get a list of drivers
get_drivers = get_route_list_function('drivers', table_model)
drivers_router.add_api_route(
    '', get_drivers,
    methods=["GET"], response_model=List[table_model],
)

def sanitize_for_sqlite(data: dict) -> dict:
    """
    Convert date, HttpUrl, and other non-primitive types to strings.
    """
    for key, value in data.items():
        if isinstance(value, date):
            data[key] = value.isoformat()
        elif value is not None and not isinstance(value, (str, int, float)):
            data[key] = str(value)
    return data


# CREATE Route
@drivers_router.post('', response_model=table_model)
def create_driver(driver: DriverCreateRequest):
    conn = sqlite3.connect('data.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    driver_data = driver.dict()
    driver_data = sanitize_for_sqlite(driver_data)

    columns = ', '.join(driver_data.keys())
    placeholders = ', '.join(['?'] * len(driver_data))
    values = tuple(driver_data.values())

    sql = f'''
        INSERT INTO drivers ({columns})
        VALUES ({placeholders})
    '''

    cursor.execute(sql, values)
    new_id = cursor.lastrowid

    cursor.execute('SELECT * FROM drivers WHERE id = ?', (new_id,))
    created_driver = dict(cursor.fetchone())

    conn.commit()
    conn.close()

    return created_driver


# UPDATE Route
@drivers_router.put('/{driver_id}', response_model=table_model)
def update_driver(driver_id: int, driver_update: DriverUpdateRequest):
    conn = sqlite3.connect('data.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    update_data = driver_update.dict(exclude_unset=True)

    if not update_data:
        conn.close()
        raise HTTPException(status_code=400, detail="No fields provided for update.")

    update_data = sanitize_for_sqlite(update_data)

    set_clause = ', '.join([f"{key} = ?" for key in update_data.keys()])
    values = list(update_data.values())
    values.append(driver_id)

    sql = f'''
        UPDATE drivers
        SET {set_clause}
        WHERE id = ?
    '''

    cursor.execute(sql, values)

    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Driver not found.")

    cursor.execute('SELECT * FROM drivers WHERE id = ?', (driver_id,))
    updated_driver = dict(cursor.fetchone())

    conn.commit()
    conn.close()

    return updated_driver


# Add route to delete driver
@drivers_router.delete('/{id}', response_model=table_model)
def delete_driver(id: int):
    """
    Delete driver.
    """
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()

    cursor.execute("DELETE FROM drivers WHERE id = ?", (id,))
    conn.commit()
    conn.close()

    return  # 204 No Content
