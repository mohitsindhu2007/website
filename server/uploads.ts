import { Express, Request, Response, NextFunction } from 'express';
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

// Filter for image files
const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'));
  }
};

// Create the upload middleware
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Middleware to serve static files from the uploads directory
export const setupImageUploads = (app: Express) => {
  app.use('/uploads', (req: Request, res: Response, next: NextFunction) => {
    // Set cache control headers for better performance
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    next();
  }, express.static(UPLOADS_DIR));

  // Image upload endpoint
  app.post('/api/upload', upload.array('images', 5), (req, res) => {
    try {
      if (!req.files) {
        return res.status(400).json({ success: false, message: 'No files uploaded' });
      }
      
      const files = Array.isArray(req.files) ? req.files : [req.files];
      const fileUrls = files.map(file => `/uploads/${file.filename}`);
      
      return res.status(200).json({
        success: true,
        message: 'Files uploaded successfully',
        files: fileUrls
      });
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error uploading files'
      });
    }
  });
};

// Function to delete an image
export const deleteImage = (imagePath: string): boolean => {
  try {
    // Remove the /uploads/ prefix to get just the filename
    const filename = imagePath.replace('/uploads/', '');
    const fullPath = path.join(UPLOADS_DIR, filename);
    
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};