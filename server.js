const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// MongoDB connection URI
const uri = "mongodb+srv://srilakshmi:srii@cluster0.aqzaqqp.mongodb.net/mongodbVSCodePlaygroundDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

// Connect to MongoDB
async function connectToDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db("mongodbVSCodePlaygroundDB");
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Home route to serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Route to add a document to the DATABASE collection
app.post('/addDocument', async (req, res) => {
    try {
        const collection = db.collection('DATABASE');
        const doc = req.body; // Assuming form data is sent as JSON
        await collection.insertOne(doc);
        console.log('Document inserted:', doc);
        res.json({ message: 'Document inserted', statusCode: 200 });
    } catch (error) {
        console.error('Error inserting document', error);
        res.status(500).json({ message: 'Error inserting document', statusCode: 500 });
    }
});

// Start the server and connect to MongoDB
async function startServer() {
    try {
        await connectToDB();
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

// Call startServer to start the server and connect to MongoDB
startServer();
