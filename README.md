# TP : API MongoDB avec Mongoose

## Setup

1. Create a .env file at the root of the project
   ```bash
   MONGODB_CONN_STRING="mongodb://root:password@mongo_container:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.4.0"
   ```

2. Start the API server and MongoDB container
   ```bash
   docker compose up --build -d
   ```

## API Routes

### Profiles
- `GET /profiles` - Get all profiles
  - Possibility to filter the search by adding at least one the following query parameter
    - `name` : The name of the user (ex: `/profiles?name=john`)
    - `location` : The location of the user based on his informations (ex: `/profiles?location=Paris`)
    - `skills` : The skills of the user (ex: `/profiles?skills=cooking` or `/profiles?skills=cooking,baking`)
    - `company` : The company of the user based on his experience (ex: `/profiles?name=Ynov`)
- `GET /profiles/:id` - Get profile by ID
- `POST /profiles` - Create a new profile
  - Example of a request body
    ```json
    {
        "name": "john",
        "email": "john@mail.fr"
    }
    ```
- `PUT /profiles/:id` - Update a profile
  - Example of a request body
    ```json
    {
        "name": "john doe",
        "email": "john.doe@mail.fr"
    }
    ```
- `DELETE /profiles/:id` - Delete a profile

### Experience
- `POST /profiles/:id/experience` - Add experience to a profile
  - Example of a request body
    ```json
    {
        "title": "Full Stack Senior Cook",
        "company": "SpaceX",
        "dates": {
            "start": "2020-01-01",
            "end": "2025-01-01"
        },
        "description": "blablabla..."
    }
    ```
  - `description` field is not required
- `DELETE /profiles/:id/experience/:exp` - Remove experience from a profile

### Skills
- `POST /profiles/:id/skills` - Add a skill to a profile
  - Example of a request body
    ```json
    {
        "skill": "Cooking"
    }
    ```
- `DELETE /profiles/:id/skills/:skill` - Remove a skill from a profile

### Information
- `PUT /profiles/:id/information` - Update profile information
  - Example of a request body
    ```json
    {
        "location": "Paris",
        "bio": "some blablabla...",
        "website": "my-super-website.the-goat.john.com"
    }
    ```
  - The fields are not required to make possible to update only the fields wanted
