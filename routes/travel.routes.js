import { Router } from 'express';
import { getDB } from '../config/db.js';
import { travelSchema } from '../schema/travel.schema.js';

const router = Router();
const travels = () => getDB().collection('travels');


router.post('/', async (req, res) => {
    try {
        const result = travelSchema.safeParse(req.body);
        console.log('Result: ',result);

        if (!result.success) {
            console.log(JSON.stringify('Zod errors message: ',result.error.issues, null, 2));
            const errors = result.error.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message
            }))
            return res.status(400).json({message: "Validation failed", errors})
        }
        const now = new Date();
        const travel = {
            ...result.data,
            createdAt: now,
            updatedAt: now,
        };
        const inserted = await travels().insertOne(travel);
        console.log(inserted);
        res.status(201).json({ _id: inserted.insertedId, ...travel });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


export default router;
