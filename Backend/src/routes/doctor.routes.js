
import { Router } from 'express';
import { getDoctors } from '../controllers/doctor.controller.js';

const router = Router();

// Define routes related to doctors
router.route('/').get(getDoctors);

export default router;
