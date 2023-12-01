### Backend (Django) Documentation (go in Backend folder and then follow the steps below)):

**1. Prerequisites:**
   - Ensure you have Python installed on your system. You can download it from [python.org](https://www.python.org/downloads/).

**2. Setup Virtual Environment:**
   - Open a terminal and navigate to the project directory.
   - Run the following commands:

     ```
     python -m venv venv
     source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
     ```

**3. Install Dependencies:**
   - Install the required packages using:

     ```
     pip install -r requirements.txt
     ```

**4. Apply Database Migrations:**
   - Run the following commands to apply migrations and create the database:

     ```
     python manage.py makemigrations
     python manage.py migrate
     ```

**5. Populate the Database:**
   - If you have a JSON file containing initial data, you can use the following command:

     ```
     python manage.py populate_comments
     ```

**6. Run the Development Server:**
   - Start the Django development server:

     ```
     python manage.py runserver
     ```

   - The backend will be accessible at `http://localhost:8000`.

### Frontend (React) Documentation:

**1. Prerequisites:**
   - Ensure you have Node.js and npm installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

**2. Install Dependencies:**
   - Open a terminal and navigate to the `frontend` directory (comment-system-frontend).
   - Run the following command:

     ```
     npm install
     ```

**3. Start the Development Server:**
   - Run the following command to start the React development server:

     ```
     npm start
     ```

   - The frontend will be accessible at `http://localhost:3000`.

**4. Access the Application:**
   - Open your web browser and visit `http://localhost:3000` to access the application.
