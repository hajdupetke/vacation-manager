# Vacation Manager

This is a web application written in Next.js using Prisma, FullCalendar, Next-Auth, Tailwind and DaisyUI.

## Application setup

Clone the repo

`git clone https://github.com/hajdupetke/vacation-manager`

Rename the `.env.example` file to `.env`.

Get Google API keys for authentication from [here](https://console.cloud.google.com/apis/credentials) and paste it in the `.env` file. [Next-Auth docs for Google](https://next-auth.js.org/providers/google).

Create a [Resend](https://resend.com/) account, generate an API key and paste it in the `.env` file.

## Running the application

The application is run using Docker, if you don't have docker installed you can install it from [here](https://docs.docker.com/engine/install/). With Docker installed running this command starts the application and the database.

`docker-compose -f docker/docker-compose.yml --env-file .env up`

## Using the application

### Homepage

After starting up the application the you start out on the homepage with the Calendar view. On the top right of the page the is a Sign In button to sign in to the application using your Google account. After authenticating an Administrator user needs to approve your registration in order to access other features of the app. If there are no Adminstrator account connect to the database with a database viewer application like DBeaver, and modify an existing user so that they become an Administrator.git

After approval the will be a new button on the homepage to the north of the calendar. Clicking this button takes you to a new page where you can create a new leave request by selecting a range of dates and a category.

## Users page

Only Administrator users can access this page.

On this page there will be a list of all the registered users. Clicking the 'Edit' button next to one of the users takes you to that user's page, where the user's categories and the user's role can be modified.

## Leave Requests page

Only Adminsitrator users can access this page.

On this page there will be a list of all the leave requests. The administrator can approve or decline a request, doing so will send an email to the appropiate user if they didn't disable notifications under the Settings page.

## Leave Categories page

Only Administrator users can access this page.

On this page there will be a list of all the categories. The administrator can delete a category by clicking the 'Delete' button right next to category. In order to create a category click the 'Create new' button and fill out the name field and click 'Create' button.

## Settings page

Settings page where the user can select if they want to recieve email notification when a requests status is changed.
