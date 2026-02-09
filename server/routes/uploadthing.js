import express from 'express';
import { createRouteHandler } from 'uploadthing/server';
import { ourFileRouter } from '../lib/uploadthing.js';

const router = express.Router();

// Create the uploadthing route handlers
const handlers = createRouteHandler({ router: ourFileRouter });

// Mount GET and POST handlers
router.get('/', handlers.GET);
router.post('/', handlers.POST);

export default router;
