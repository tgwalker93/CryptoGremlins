import express from 'express';

const router = express.Router();

router.get('/healthcheck', async (_req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date()
    };
    try {
        res.send(healthcheck);
    } catch (e) {
        healthcheck.message = e;
        res.status(503).send();
    }
});

export default router;