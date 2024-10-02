const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'eve_spotify',
    password: ''
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); 
    },
    filename: (req, file, cb) => {
        
        const newFileName = `${Date.now()}_${file.originalname}`; 
        cb(null, newFileName);
    }
});

const upload = multer({ storage: storage }).single('mp3file');


const eve = {
    
    index: (req, res) => {
        const sql = 'SELECT * FROM mp3_files';
        db.query(sql, (err, results) => {
            if (err) throw err;
            res.render('index', { files: results }); 
        });
    },
    
    
    uploadPage: (req, res) => {
        res.render('upload');
    },
    
    
    uploadFile: (req, res) => {
        upload(req, res, function (err) {
            if (err) {
                return res.status(400).send('Error uploading file.');
            }
            if (!req.file) {
                return res.status(400).send('No file uploaded.');
            }
            
            
            const sql = 'INSERT INTO mp3_files (file_name, file_path) VALUES (?, ?)';
            db.query(sql, [req.file.filename, `/uploads/${req.file.filename}`], (err, result) => {
                if (err) throw err;
                res.redirect('/'); 
            });
        });
    }
};

module.exports = eve;