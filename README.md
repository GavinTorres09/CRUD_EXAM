# CRUD-EXAM-Frontend-Developer-Intern-Position
This project demonstrates a simple User Management system using React, where an admin can Create, Read, Update, and Delete users. The system is built using ReactJS, SCSS, and integrates with an API to manage user data.

## Environments

Node: v16.18.1\
NPM: 8.19.2

## PROJECT OVERVIEW 
This project contains a simple React application for managing users. The application allows the administrator to:

- **Add User**: You can add a new user by providing their email, first name, and last name.
- **Edit User**: You can edit a user's email, first name, and last name.
- **Delete User**: You can delete a user from the table.
- **Confirmation Modal**: Before deleting a user, a confirmation modal is displayed to prevent accidental deletions.
- **View User**: You can view the details of a user.
- **Pagination**: The table supports pagination to navigate through the users.
- **User Feedback**: When users perform actions (e.g., create, update, delete), appropriate feedback (success or error messages) is shown.

## FOLDER STRUCTURE
- **/users**: Directory for all user-related functionality (View, Create, Edit, Delete).
- **/index.js**: Root file where the app is rendered.

## FEATURES

### HOME PAGE  (/)
- Displays basic information about the user: {yourName}, {email}.

### USER PAGE (/users)
- **VIEW USERS LIST**: Display a paginated list of users in the table.
- **ADD USER**: Click on the "Add User" button to open a modal for creating a new user.
- **VIEW USER**: Click the "View User" button to open a modal for the details of the user.
- **EDIT USER**: Click the "Edit" button on any user to open the Edit User Modal.
- **DELETE USER**: Click the "Delete" button to confirm and remove a user.

### USERS LISTING TABLE
- **Columns**: ID, Avatar, Email, First Name, Last Name, Actions (Edit, Delete).
- **Pagination**: Shows 10 users per page.
- **Add User**: A button above the table that opens the Create User Modal.

### ADD USER MODAL
- **Fields**: Email, First Name, Last Name (Avatar is a placeholder).
- **Buttons**: Submit (to create the user) and Cancel (to close the modal).

### VIEW USER MODAL
- Displays the selected user’s details in a static view, including ID, Avatar, Email, First Name, and Last Name.
- Includes a Close button to exit the modal.

### EDIT USER MODAL
- Contains a form with input fields to submit the user’s information to be updated by ID.
- Editable input fields: email, first name, last name (avatar is not editable).
- Includes Submit and Cancel buttons with functionality to handle closing and updating the user.

### DELETE USER MODAL

**Soft Confirmation Modal**:
- Displays a message asking if the user is sure they want to delete the selected user.
- Shows the selected user’s details, including ID, avatar, email, first name, and last name.
- Includes Cancel and Delete buttons. Clicking Delete will trigger a hard confirmation modal.

**Hard Confirmation Modal**:
- Displays a warning that the deletion action cannot be undone.
- Includes Cancel and Yes, Delete buttons.
- Once Yes, Delete is clicked, the user is permanently deleted.


## API Endpoints and Functions

Below are the API endpoints with the corresponding functions implemented in the code:

### 1. Get the List of Users (GET /users?page=1)
**Function**: `getAllUsers()`
- This function calls the API to fetch a list of users.

### 2. Get User by ID (GET /users/{id})
**Function**: `getUserById(id)`
- Dynamically fetches a user by the specified ID.

### 3. Create User (POST /users)
**Function**: `createUser(userData)`
- This function handles posting data to create a new user.

### 4. Update User by ID (PUT /users/{id})
**Function**: `updateUser(id, userData)`
- Updates a user's details based on their ID.

### 5. Delete User by ID (DELETE /users/{id})
**Function**: `deleteUser(id)`
- Deletes a user when the corresponding ID is specified.

Each of these API calls is implemented with the corresponding HTTP method (GET, POST, PUT, DELETE) in the code.


## SETUP INSTRUCTIONS
- Node.js and npm installed. (version Node: v16.18.1: NPM: 8.19.2)
- Git installed (if you plan to clone this repository).

## INSTALLATION
**CLONE THE REPOSITORY**
-git clone https://github.com/GavinTorres09/CRUD_EXAM.git

**INSTALL DEPENDENCIES**
- npm install

**START THE DEVELOPMENT SERVER**
- npm start

