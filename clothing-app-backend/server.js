const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware configuration
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files like images

// Ensure the `public/images` directory exists
if (!fs.existsSync('public/images')) fs.mkdirSync('public/images', { recursive: true });

// Set up Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Directory to save images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
  },
});

const upload = multer({ storage });

// Simulate a database using `items.json`
const itemsFilePath = 'items.json';

// Ensure the `items.json` file exists
if (!fs.existsSync(itemsFilePath)) fs.writeFileSync(itemsFilePath, '[]');

// Route to upload an image
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ filePath: `/images/${req.file.filename}` });
});

// Route to fetch all items
// app.get('/items', (req, res) => {
//   const items = JSON.parse(fs.readFileSync(itemsFilePath));
//   res.json(items);
// });
// Route to fetch all items with optional category filtering
app.get('/items', (req, res) => {
  const items = JSON.parse(fs.readFileSync(itemsFilePath));
  const { category } = req.query;

  // If a category is provided, filter items; otherwise, return all
  const filteredItems = category
    ? items.filter((item) => item.category === category)
    : items;

  res.json(filteredItems);
});


// Route to add a new item
app.post('/items', (req, res) => {
  const { name, category, price, image } = req.body;

  // Validation: Ensure all fields are provided
  if (!name || !category || !price || !image) {
    return res.status(400).json({ error: 'All fields (name, category, price, image) are required.' });
  }

  const items = JSON.parse(fs.readFileSync(itemsFilePath));
  const newItem = {
    id: Date.now(), // Unique identifier
    name,
    category,
    price: parseFloat(price), // Ensure price is stored as a number
    image,
  };

  items.push(newItem);
  fs.writeFileSync(itemsFilePath, JSON.stringify(items, null, 2)); // Pretty-print JSON
  res.json(newItem);
});

// Route to delete an item (optional feature)
// app.delete('/items/:id', (req, res) => {
//   const items = JSON.parse(fs.readFileSync(itemsFilePath));
//   const updatedItems = items.filter((item) => item.id !== parseInt(req.params.id));

//   fs.writeFileSync(itemsFilePath, JSON.stringify(updatedItems, null, 2));
//   res.json({ message: 'Item deleted successfully.' });
// });
// Route to delete an item by ID
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const items = JSON.parse(fs.readFileSync(itemsFilePath));
  const filteredItems = items.filter(item => item.id !== parseInt(id, 10));
  fs.writeFileSync(itemsFilePath, JSON.stringify(filteredItems));
  res.json({ message: 'Item deleted successfully' });
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
