# Podcast Management System

## Overview

The Podcast Management System is a web application that allows users to manage podcasts. Users can add, update, delete, and view podcasts, each of which includes a title, description, and audio file.

## Features

- Add, update, and delete podcasts
- View list of podcasts
- Upload and play audio files

## Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **MySQL**: Ensure you have MySQL installed. You can download it from [mysql.com](https://www.mysql.com/).

## Installation

### Backend

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd podcast-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure MySQL database**:

   - Create a `.env` file in the `podcast-backend` directory.
   - Add your MySQL database configuration to the `.env` file:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=podcasts_db
   ```

4. **Run database migrations**:

   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Start the backend server**:
   ```bash
   node app.js
   ```

### Frontend

1. **Navigate to the frontend directory**:

   ```bash
   cd ../podcast-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the frontend development server**:
   ```bash
   npm start
   ```

## Usage

1. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.

2. **Add a Podcast**:

   - Click on the "Add Podcast" button.
   - Fill in the podcast details and upload the audio file.
   - Click "Submit" to add the podcast.

3. **Edit a Podcast**:

   - Click on the "Edit" button next to the podcast you want to edit.
   - Update the podcast details and click "Submit" to save the changes.

4. **Delete a Podcast**:
   - Click on the "Delete" button next to the podcast you want to delete.
   - Confirm the deletion in the popup dialog.

## Contributing

If you would like to contribute to the project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
