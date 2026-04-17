// ==================== Backend Server for Birthday Wishes ====================
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// ==================== Middleware ====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve pic folder for images  
app.use('/pic', express.static(path.join(__dirname, '../frontend/pic')));

// Serve mom&dad folder for parent photos
app.use('/momdad', express.static(path.join(__dirname, '../frontend/mom&dad')));

// Serve siblings folder for sibling photos
app.use('/siblings', express.static(path.join(__dirname, '../frontend/siblings')));

// Serve friends folder for friend photos
app.use('/friends', express.static(path.join(__dirname, '../frontend/friends')));

// Serve him folder for hero marquee photos
app.use('/him', express.static(path.join(__dirname, '../frontend/him')));


// ==================== In-Memory Storage (For Demo) ====================
let wishesDatabase = [];
let wishIdCounter = 1;

// ==================== API Routes ====================

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Birthday Wishes API is running! 🎉',
        timestamp: new Date().toISOString()
    });
});

// Get all wishes
app.get('/api/wishes', (req, res) => {
    try {
        const { category } = req.query;
        
        let filteredWishes = wishesDatabase;
        
        if (category) {
            filteredWishes = wishesDatabase.filter(wish => wish.category === category);
        }
        
        res.json({
            success: true,
            count: filteredWishes.length,
            wishes: filteredWishes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching wishes',
            error: error.message
        });
    }
});

// Get a single wish by ID
app.get('/api/wishes/:id', (req, res) => {
    try {
        const wishId = parseInt(req.params.id);
        const wish = wishesDatabase.find(w => w.id === wishId);
        
        if (!wish) {
            return res.status(404).json({
                success: false,
                message: 'Wish not found'
            });
        }
        
        res.json({
            success: true,
            wish: wish
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching wish',
            error: error.message
        });
    }
});

// Create a new wish
app.post('/api/wishes', (req, res) => {
    try {
        const { category, recipient, message, senderName } = req.body;
        
        // Validation
        if (!category || !recipient || !message) {
            return res.status(400).json({
                success: false,
                message: 'Category, recipient, and message are required'
            });
        }
        
        const newWish = {
            id: wishIdCounter++,
            category,
            recipient,
            message,
            senderName: senderName || 'Anonymous',
            timestamp: new Date().toISOString(),
            sent: true
        };
        
        wishesDatabase.push(newWish);
        
        res.status(201).json({
            success: true,
            message: 'Wish sent successfully! 🎉',
            wish: newWish
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error sending wish',
            error: error.message
        });
    }
});

// Update a wish
app.put('/api/wishes/:id', (req, res) => {
    try {
        const wishId = parseInt(req.params.id);
        const wishIndex = wishesDatabase.findIndex(w => w.id === wishId);
        
        if (wishIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Wish not found'
            });
        }
        
        const { category, recipient, message, senderName } = req.body;
        
        wishesDatabase[wishIndex] = {
            ...wishesDatabase[wishIndex],
            category: category || wishesDatabase[wishIndex].category,
            recipient: recipient || wishesDatabase[wishIndex].recipient,
            message: message || wishesDatabase[wishIndex].message,
            senderName: senderName || wishesDatabase[wishIndex].senderName,
            updatedAt: new Date().toISOString()
        };
        
        res.json({
            success: true,
            message: 'Wish updated successfully',
            wish: wishesDatabase[wishIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating wish',
            error: error.message
        });
    }
});

// Delete a wish
app.delete('/api/wishes/:id', (req, res) => {
    try {
        const wishId = parseInt(req.params.id);
        const wishIndex = wishesDatabase.findIndex(w => w.id === wishId);
        
        if (wishIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Wish not found'
            });
        }
        
        const deletedWish = wishesDatabase.splice(wishIndex, 1)[0];
        
        res.json({
            success: true,
            message: 'Wish deleted successfully',
            wish: deletedWish
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting wish',
            error: error.message
        });
    }
});

// Get statistics
app.get('/api/stats', (req, res) => {
    try {
        const stats = {
            totalWishes: wishesDatabase.length,
            byCategory: {
                family: wishesDatabase.filter(w => w.category === 'family').length,
                friends: wishesDatabase.filter(w => w.category === 'friends').length,
                fun: wishesDatabase.filter(w => w.category === 'fun').length
            },
            recentWishes: wishesDatabase.slice(-5).reverse()
        };
        
        res.json({
            success: true,
            stats: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics',
            error: error.message
        });
    }
});

// ==================== Serve Frontend ====================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message
    });
});

// ==================== Start Server ====================
app.listen(PORT, () => {
    console.log('🎂 ========================================');
    console.log(`🎉 Happy Birthday Sanjay Varma!`);
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
    console.log(`📡 API URL: http://localhost:${PORT}/api`);
    console.log('🎂 ========================================');
});

module.exports = app;

