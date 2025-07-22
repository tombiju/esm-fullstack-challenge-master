import pandas as pd
from fastapi import APIRouter, Depends

from esm_fullstack_challenge.db import DB, query_builder
from esm_fullstack_challenge.dependencies import get_db, CommonQueryParams


dashboard_router = APIRouter()


@dashboard_router.get("/top_drivers_by_wins")
def get_top_drivers_by_wins(
    cqp: CommonQueryParams = Depends(CommonQueryParams),
    db: DB = Depends(get_db)
) -> list:
    """Gets top drivers by wins.

    Args:
        cqp (CommonQueryParams, optional): Common query params used for filtering.
                                           Defaults to Depends(CommonQueryParams).
        db (DB, optional): SQLite DB connection. Defaults to Depends(get_db).

    Returns:
        list: list of top drivers by wins.
    """
    base_query_str = (
        "with driver_wins as (\n"
        "    select d.id,\n"
        "        d.forename || ' ' || d.surname as full_name,\n"
        "        d.nationality,\n"
        "        d.dob,\n"
        "        date() - date(dob)             as age,\n"
        "        d.url\n"
        "    from drivers d\n"
        "          join results r on d.id = r.driver_id\n"
        "          join status s on r.status_id = s.id\n"
        "    where s.status = 'Finished'\n"
        "    and r.position_order = 1\n"
        ")\n"
        "select\n"
        "    *,\n"
        "    count(*) as number_of_wins\n"
        "from driver_wins"
    )
    query_str = query_builder(
        custom_select=base_query_str,
        order_by=cqp.order_by or [('number_of_wins', 'desc')],
        limit=cqp.limit,
        offset=cqp.offset,
        filter_by=cqp.filter_by,
        group_by=['id', 'full_name', 'nationality', 'dob', 'age', 'url']
    )
    with db.get_connection() as conn:
        df = pd.read_sql_query(query_str, conn)
        drivers = list(df.to_dict(orient='records'))

    return drivers

@dashboard_router.get("/wins_vs_podiums")
def get_wins_vs_podiums(db: DB = Depends(get_db)) -> list:
    """Returns wins and podium counts per driver."""
    query_str = """
        SELECT d.id,
               d.forename || ' ' || d.surname as full_name,
               SUM(CASE WHEN r.position_order = 1 THEN 1 ELSE 0 END) AS wins,
               SUM(CASE WHEN r.position_order IN (1, 2, 3) THEN 1 ELSE 0 END) AS podiums
        FROM results r
        JOIN drivers d ON r.driver_id = d.id
        GROUP BY d.id, full_name
        ORDER BY podiums DESC
    """
    with db.get_connection() as conn:
        df = pd.read_sql_query(query_str, conn)
        results = df.to_dict(orient='records')

    return results

@dashboard_router.get("/circuits_locations")
def get_circuits_locations(db: DB = Depends(get_db)) -> list:
    """Returns circuit names and locations (lat/lng)."""
    query_str = """
        SELECT name, location, country, lat, lng
        FROM circuits
        WHERE lat IS NOT NULL AND lng IS NOT NULL;
    """
    with db.get_connection() as conn:
        df = pd.read_sql_query(query_str, conn)
        circuits = df.to_dict(orient='records')

    return circuits

@dashboard_router.get("/driver_nationalities")
def get_driver_nationalities(db: DB = Depends(get_db)) -> list:
    """Returns count of drivers grouped by nationality."""
    query_str = """
        SELECT nationality, COUNT(*) AS driver_count
        FROM drivers
        GROUP BY nationality
        ORDER BY driver_count DESC;
    """
    with db.get_connection() as conn:
        df = pd.read_sql_query(query_str, conn)
        nationalities = df.to_dict(orient='records')

    return nationalities
