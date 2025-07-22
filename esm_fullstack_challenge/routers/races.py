from typing import List

from fastapi import Depends, HTTPException, APIRouter

import sqlite3

from esm_fullstack_challenge.models import AutoGenModels
from esm_fullstack_challenge.routers.utils import \
    get_route_list_function, get_route_id_function

from esm_fullstack_challenge.db import DB
from esm_fullstack_challenge.dependencies import get_db


races_router = APIRouter()

table_model = AutoGenModels['races']

# Route to get race by id
get_race = get_route_id_function('races', table_model)
races_router.add_api_route(
    '/{id}', get_race,
    methods=["GET"], response_model=table_model,
)

# get_race_circuits = get_race_circuits_function('races', table_model)
# races_router.add_api_route(
#     '/{id}', get_race_circuits,
#     methods=["GET"], response_model=table_model,
# )

# get_race_circuits = get_race_circuits_drivers('races', table_model)
# races_router.add_api_route(
#     '/{id}', get_race_circuits,
#     methods=["GET"], response_model=table_model,
# )

# Route to get a list of races
get_races = get_route_list_function('races', table_model)
races_router.add_api_route(
    '', get_races,
    methods=["GET"], response_model=List[table_model],
)

# GET /races/{race_id}/circuit
@races_router.get("/{race_id}/circuit")
def get_race_circuit(race_id: int, db: DB = Depends(get_db)):
    with db.get_connection() as conn:
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("""
            SELECT circuits.*
            FROM races
            JOIN circuits ON races.circuit_id = circuits.id
            WHERE races.id = ?;
        """, (race_id,))
        row = cur.fetchone()

    if not row:
        raise HTTPException(status_code=404, detail="Circuit not found")

    return dict(row)


# GET /races/{race_id}/drivers
@races_router.get("/{race_id}/drivers")
def get_race_drivers(race_id: int, db: DB = Depends(get_db)):
    with db.get_connection() as conn:
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("""
            SELECT DISTINCT drivers.*
            FROM results
            JOIN drivers ON results.driver_id = drivers.id
            WHERE results.race_id = ?;
        """, (race_id,))
        rows = cur.fetchall()

    return [dict(row) for row in rows]


# GET /races/{race_id}/constructors
@races_router.get("/{race_id}/constructors")
def get_race_constructors(race_id: int, db: DB = Depends(get_db)):
    with db.get_connection() as conn:
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("""
            SELECT DISTINCT constructors.*
            FROM results
            JOIN constructors ON results.constructor_id = constructors.id
            WHERE results.race_id = ?;
        """, (race_id,))
        rows = cur.fetchall()

    return [dict(row) for row in rows]