# ESM FullStack Challenge
Challenge for ESM FullStack candidates

## My Changes:
- I've made the drivers UI and API support CRUD operations- this involved adding functions to create and update a driver record in the database. Deletion came with the React-Admin library.

  <img width="1565" height="460" alt="image" src="https://github.com/user-attachments/assets/ade1e011-4925-41eb-a3bd-3f15ee1017b2" />

  _Record that I created._

<img width="1532" height="828" alt="image" src="https://github.com/user-attachments/assets/870d9133-6099-46de-9111-3947acc178bc" />

_The create driver form._

<img width="1519" height="490" alt="image" src="https://github.com/user-attachments/assets/cd640575-db89-49af-8cd0-167b562ab084" />

_The edit button allows for editing._

<img width="1506" height="806" alt="image" src="https://github.com/user-attachments/assets/5bc2361e-6886-40e9-9479-c7fd3223a577" />

_Deletion can be performed within the edit form screen or in the show page by selecting a row and clicking the delete button._


- I've integrated the fetching of data into the Races UI tabs for circuits, drivers, and constructors.

<img width="1031" height="312" alt="image" src="https://github.com/user-attachments/assets/47030361-07b2-4086-99fe-2d2557534071" />

_The circuit tab._

<img width="1522" height="1039" alt="image" src="https://github.com/user-attachments/assets/b2017989-cfe8-4e65-95e1-c3e6e57f4e3b" />

_The drivers tab._

<img width="841" height="803" alt="image" src="https://github.com/user-attachments/assets/4aac3cf1-748b-4fe6-84b9-9e8812f4fc8c" />

_The constructors tab._


- I've added 3 visualizations to the dashboard: Wins VS Podiums per Driver which shows how many wins a driver had compared ot their podium finishes to show how consistent drivers are at placing versus winning, a map visualization that plots out the circuit latitude and longitudes to show where the circuits are located on the globe, and the driver nationality pie chart to show where most F1 drivers are from.
<img width="2912" height="1052" alt="image" src="https://github.com/user-attachments/assets/30700ac3-4a12-4eb2-9a01-6537c27df347" />

_Wins vs Podiums per Driver_

<img width="1446" height="605" alt="image" src="https://github.com/user-attachments/assets/280d8e91-2ecf-4c9c-95d6-7799fe3af499" />

_Circuits Map_

<img width="1461" height="530" alt="image" src="https://github.com/user-attachments/assets/7a1f9484-0e15-43dd-b7cd-05329a59150e" />

_Driver Nationality Distribution_

- I've implemented magic link authentication to send a link to sign a user in via email using Supabase
<img width="665" height="276" alt="image" src="https://github.com/user-attachments/assets/a7e30661-1568-4b90-a3bc-15462e44daed" />

_Sign in page_

- The extra visualizations and way I structured things included additional frontend and backend work which I consider encapsulates the backedn/frotned feature of my choosing, such as including an extra visualization, using Supabase for magic link authentication, etc.



## Overview:
You are tasked with updating a Formula One Web App. The backend is written in Python (FastAPI), the frontend is written in JavaScript (React-Admin), and the underlying data is housed in a SQLite DB. There are multiple ways to complete this assessment, but we ask that you update both the frontend and backend so that we can comprehensively assess the skills required for this role. Please select one (or more) of the following options to complete:
1. The Web App is currently read-only. In order to keep data up-to-date, we would like you to upgrade the Web App from a read-only app to a simple CRUD app. Please update the 'Drivers' UI and API with the following capabilities: Create a new driver, Update a pre-existing driver, and Delete a pre-existing driver. You can find related code in `dashboard/src/pages/drivers.tsx` and `esm_fullstack_challenge/routers/drivers.py`.
2. The current UI/UX of the Web App feels disconnected. In order to remedy this, please update the 'Races' UI/UX. When clicking on a race for a more detailed view, please create a tabbed view displaying data related to the race. Please display data related to the race circuit, race drivers, and race constructors. You can find related code in `dashboard/src/pages/races.tsx` and `esm_fullstack_challenge/routers/races.py`.
3. The Web App does not display data in a meaningful way. Please add a dashboard that provides easy to digest insights. There should be at least 2 or more visualizations. You can find related code in `dashboard/src/pages/dashboard.tsx` and `esm_fullstack_challenge/routers/dashboard.py`.
4. The Web App currently uses a static JSON file for authentication. Please add proper user authentication and management. You can find related code in `dashboard/src/authProvider.ts`.
5. Improve a backend/frontend feature of your choosing. If you choose this route, please include a brief description of the work completed.

This challenge is meant to take anywhere from 1-4 hours and this will be taken into consideration when reviewing any work submitted.

## Getting Started
The easiest way to get started is by running the following command:
```
make run
```
This uses Docker Compose to launch two containerized services (`ui`, `api`) and mounts the `dashboard/src` and `esm_fullstack_challenge` folders which enables hot reload of the files as you work on them.


Alternatively, you can launch the applications individually by running:
```
make api
```
and (in a separate terminal)
```
make ui
```
This launches the applications without docker but requires you to have Python (v3.13+), NodeJS (v22.17.0+), and Yarn (v1.22.22+) installed.

## Submitting Work
Please create a public GitHub repo and share the link via email.

## Criteria
* The bare minimum requirement is that the Web App is able to run using the following command:
    ```
    make run
    ```
* Software development best practices are encouraged, but not required.
* Any documentation provided will help us better understand your work.
* Please take no longer than 72 hours to complete the challenge once you have begun.
