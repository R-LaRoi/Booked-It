# Booked It - sba.v6

Booked It -- a server application developed using Node, Express, and MongoDB that offers book recommendations through a CRUD API. Users can create a personalized reading list and create a favorites list based on the suggestions provided.

### Objectives

- Create GET routes for data as appropiate

  `GET /booked_it`
  `GET /user_booklist`
  `GET /user_favorites`

- Create route for client data creation.
  `GET /user_list`

- Create `DELETE` routes for data category to allow for client deletion via a request.

  `DELETE /deletebook/:id`

- Include MongoDB data validation rules for at least one data collection.

- Include MongoDB data validation rules for at least one data collection.

### Features

- Preview of book collection
- Navigation to user list, favorites list, homepage
- Interact with a form to add new books to user list
- Select a favorite book and add to favorites list
- Update user book list.
- Delete an exisiting title from list.

### Technologies Used

- Node.js
- Express.js
- Pug: Template view engine
- Mongo DB
- Mongoose
- CSS
- Font Awesome

## Screenshots

![App Screenshot](https://github.com/user-attachments/assets/54d11630-1dbc-4154-8039-25d570c5352a)

![App Screenshot](https://github.com/user-attachments/assets/80b693f1-bacb-4fc2-8e16-33c8cf8533bb)

![App Screenshot](https://github.com/user-attachments/assets/69731102-d940-4eff-8d7c-0f145f94983d)

![App Screenshot](https://github.com/user-attachments/assets/7dc42b4c-c689-4564-8951-1fbd22bfd0c1)

## Run Locally

Clone the project

```bash
  git clone https://github.com/R-LaRoi/Booked-It
```

Go to the project directory

```bash
  cd booked-it
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Open browser

```bash
 http://localhost:3000



```
