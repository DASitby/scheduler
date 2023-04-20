# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

Use the command
```sh
npm start
```
to start the development server

## Running Jest Test Framework

Use the command
```sh
npm test
```
to start running Jest for integration tests

## Running Storybook Visual Testbed

Use the command
```sh
npm run storybook
```
to run the storybook server for component testing

## Running Cypress End-to-End Framework

Use the command
```sh
npm run cypress
```
to run Cypress for end-to-end and integration testing

## Application Flow

![Main View](https://github.com/DASitby/scheduler/blob/master/public/images/fullview.png)
- Navbar on the left side allows you to pick a day for the interview 
- Existing interviews for that day are listed in the section on the right
- Clicking the Plus button will open the Appointment Form

![Appointment View](https://github.com/DASitby/scheduler/blob/master/public/images/appointment.png)
- A booked appointment has a time, a student, and an interviewer associated with it
- You can click the pen and paper icon to Edit the appointment, which will open the Appointment Form for that appointment
- The trash can icon will delete the appointment, after a prompt

![Appointment Form](https://github.com/DASitby/scheduler/blob/master/public/images/form.png)
- Student's name can be entered in the text field (Note: when editing, the existing name will appear here)
- Select an Interviewer from those available for the day by clicking on their portrait
- Save and Cancel buttons will perform their respective actions

