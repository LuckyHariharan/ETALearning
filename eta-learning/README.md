# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Supabase parent portal

The application uses Supabase Auth for sign-in and reads the authenticated user's `profiles` row and permitted `students` rows. The publishable key is intended for browser use; never put a Supabase secret or service-role key in this React application.

1. Set `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_PUBLISHABLE_KEY` in `eta-learning/.env.local`. This file is ignored by Git. Restart the development server after changing it.
2. In the Supabase SQL Editor, run [`supabase/setup.sql`](./supabase/setup.sql). It enables row-level security, allows users to read their own profiles, restricts parent student rows to `students.parent_id = auth.uid()`, and permits active admins to read all student rows.
3. In Supabase Auth, make sure each account has a matching `profiles` row whose `id` equals the `auth.users.id` UUID, `full_name` is populated, `role` is `admin` or `parent`, and `is_active` is `true`. Assign the `admin` role only to the two intended administrator profiles.
4. Set each student's `parent_id` to the signed-in profile/auth UUID. Populate `drive_url` with the study-materials URL and `drive_url_2` with the session-report URL. The dashboard explicitly filters by the signed-in user's UUID so it shows only rows assigned to that profile.
5. Set or reset the account password in Supabase Auth, then run `npm start` from `eta-learning/` and sign in with the existing account. Do not put user passwords in source code or `.env.local`.

The website only links to HTTPS URLs on `drive.google.com` or `docs.google.com`. Configure sharing on each Google Drive resource separately; database row-level security does not change Google Drive sharing permissions. Review any existing `SELECT` policies on `profiles` and `students`: permissive policies are combined with `OR`, so remove any legacy policy that grants broader access than intended.
