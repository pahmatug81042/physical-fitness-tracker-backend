# Fitness Tracker Backend

This is the backend server for the **Fitness Tracker** full stack application. It handles user authentication, workout management, exercise data retrieval, and integration with external APIs for exercise videos.

---

RapidAPI :- https://rapidapi.com/hub?utm_source=youtube.com%2FJavaScriptMastery&utm_medium=referral&utm_campaign=DevRel

RapidAPI ExerciseDB :- https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb?utm_source=youtube.com%2FJavaScriptMastery&utm_medium=referral&utm_campaign=DevRel

RapidAPI YouTube Search :- https://rapidapi.com/h0p3rwe/api/youtube-search-and-download?utm_source=youtube.com%2FJavaScriptMastery&utm_medium=referral&utm_campaign=DevRel

---

Here's the GitHub Repository for Frontend using React + Vite + JavaScript, and Vanilla CSS: https://github.com/pahmatug81042/physical-fitness-tracker-frontend/tree/main

---

Here is the deployed backend on Render: https://physical-fitness-tracker-backend.onrender.com/

* Important Note: It will take a few minutes for the server to wake up if it was left idle for sometime to cause it to go to sleep so please beware of that.

---

## Features

- **User Authentication**
  - Register a new user
  - Login and receive a JWT token
  - Retrieve current logged-in user data (protected)
- **Workout Management**
  - Create, update, delete, and fetch workouts
  - Add exercises to workouts
- **Exercise Data**
  - Fetch exercises by ID, body part, target muscle, or equipment
- **Video Integration**
  - Fetch exercise tutorial videos from YouTube via RapidAPI

---

## Technologies Used

- Node.js
- Express
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Axios for external API requests
- RapidAPI (ExerciseDB & YouTube)
- CORS for frontend communication
- dotenv for environment variables

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAPIDAPI_KEY=your_rapidapi_key
EXERCISEDB_HOST=exercisedb.p.rapidapi.com
YOUTUBE_HOST=youtube-search-and-download.p.rapidapi.com
```

## Installation
1. Clone the repository:
```bash
git clone
cd <backend folder>
```
2. Install dependencies:
```bash
npm install
```

3. Setup the .env file as shown above.

4. Run the server locally:
```bash
npm run dev
```
* The backend server will start on http://localhost:5000.

## API Routes
### Authentication
* POST /api/auth/register — Register a new user
* POST /api/auth/login — Login and get JWT token
* GET /api/auth/me — Get current logged-in user (protected)

### Exercises
* GET /api/exercises — Get all exercises
* GET /api/exercises/:id — Get exercise by ID
* GET /api/exercises/bodyPart/:bodyPart — Get exercises by body part
* GET /api/exercises/target/:target — Get exercises by target muscle
* GET /api/exercises/equipment/:equipment — Get exercises by equipment

### Workouts
* POST /api/workouts — Create new workout (protected)
* GET /api/workouts — Get all workouts for user (protected)
* GET /api/workouts/:id — Get single workout by ID (protected)
* PUT /api/workouts/:id — Update workout (protected)
* DELETE /api/workouts/:id — Delete workout (protected)

### Videos
* GET /api/videos/:exerciseName — Fetch exercise videos from YouTube

## Deployment
* The backend can be deployed on platforms like Render or Heroku.
* Important: When deploying on Render, the server may take a few minutes to boot up and fully load the first request. Subsequent requests will respond faster.

## Future Enhancements
* Add pagination for exercises and workouts
* Improve error handling and validation
* Add user profile management
* Optimize video fetching and caching
