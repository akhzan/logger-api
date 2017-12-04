import express from 'express';
import logCtrl from '../controllers/logController';

const router = express.Router();	// eslint-disable-line new-cap

router.route('/')
	.get(logCtrl.list)

	.post(logCtrl.create);

router.param('logId', logCtrl.load);

export default router;
