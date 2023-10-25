# Nirmata React Assignment (2-9 years)

The application is built on React Boiler plate code using [create-react-app]

## Running application on local

- Clone application using command `git clone https://github.com/pavan899/nirmata-test.git`
- Change directory into application root directory using `cd nirmata-test`
- Install necessary packages using `npm i` command
- Run application using `npm start` command

## Application Preview
Configured auto build on vercel, **Live preview:** https://nirmata-test.vercel.app/

## Time Taken for development

- Time spent on development (Approximately 5-6 hours)

 
## Folder Structure

- ### public
  - index.html
- ### src
  - components
    - cricketer-details
      - index.js _(Main component for individual cricketer details)_
      - SimilarPlayers.js _(Component for similar player cards)_
    - cricketers
      - index.js _(All cricketers list component)_
    - CustomTable.js _(Re-usable Table component to display list)_
    - Error.js _(Fallback page for the routes)_
    - Header.js _(Main Header Component)_
    - HelperLogic.js _(Re-usable logics)_
  - layout
    - MainLayout _(Main Layout Style with header)_
  - Routes
    - index.js _(All Routes)_
  - services _(All Api data providers)_
 
## Concepts used
- HOC (Templating)
- Haven't used Provided pattern assuming api calls must be distinct
- Re-usable Logic
