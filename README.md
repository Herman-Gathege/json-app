Clothing App
A simple full-stack application to manage and display clothing items with categories, pricing, and images. Users can add items, filter by categories, and delete items.

Features-

Frontend
Add New Item:

Add clothing items with the following fields:
Name
Category (e.g., Sports Wear, Casual Wear, Ceremony Wear, Swim Wear, Shoes, Jewelry)
Price
Image (uploaded from the local machine)

The uploaded image is saved on the server and displayed in the item list.

Display Items:

All items are displayed as cards with the following details:
Image
Name
Category
Price
Cards include a delete button to remove items.

Filter Items:

A dropdown menu allows users to filter items by category.

Backend
Image Upload:

Images uploaded via the frontend are stored in a public/images folder on the server.
Data Management:

Item data (name, category, price, and image path) is stored in a simulated database (items.json file).
Routes:

POST /upload: Handles image uploads.
GET /items: Retrieves all items.
POST /items: Adds a new item.
DELETE /items/:id: Deletes an item by ID.

Technologies Used

Frontend
React.js: Component-based UI development.
Axios: For making HTTP requests to the backend.
CSS: Basic styling for the application.

Backend
Node.js: Server-side JavaScript runtime.
Express.js: Backend framework for API development.
Multer: Middleware for handling file uploads.
CORS: Cross-Origin Resource Sharing for frontend-backend communication.
File System (fs): To manage items.json and store image files.

Project Structure

Frontend
bash
Copy code
src/
  components/
    AddItemForm.js       # Form for adding new items
    CategoryFilter.js    # Dropdown for filtering items
    ProductList.js       # Displays all items as cards
  styles/
    App.css              # Global styles
    AddItemForm.css      # Styles for the AddItemForm
    CategoryFilter.css   # Styles for the CategoryFilter
    ProductList.css      # Styles for the ProductList
  App.js                 # Main App component

Backend
php
Copy code
server.js
public/
  images/               # Folder to store uploaded images
items.json              # Simulated database for storing items

Setup Instructions
Backend Setup
Install dependencies:
bash
Copy code
npm install express multer cors
Run the server:
bash
Copy code
node server.js
Server runs on: http://localhost:5000

Frontend Setup
Install dependencies:
bash
Copy code
npm install
Start the frontend:
bash
Copy code
npm start
Frontend runs on: http://localhost:3000

Endpoints
Backend API
HTTP Method	Endpoint	Description
POST	/upload	Upload an image.
GET	/items	Fetch all items.
POST	/items	Add a new item.
DELETE	/items/:id	Delete an item by ID.

How to Use
Add an Item:

Fill in the name, category, price, and select an image using the form. Click "Add Item."
Filter Items:

Select a category from the dropdown to display only items from that category.
Delete an Item:

Click the "Delete" button on any item card to remove it.

Future Enhancements
Add item editing functionality.
Add user authentication for managing items.
Implement a database like MongoDB or PostgreSQL instead of items.json.
Improve the UI with advanced styling or component libraries.
