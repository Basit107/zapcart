import Router from 'express';
import { authorizeAdmin } from '../middlewares/auth.middlewares.js';
import upload from '../middlewares/upload.middlewares.js';
import { addProduct, cloudinaryUpload, deleteProduct, updateProduct, getUsers } from '../controllers/admin.controllers.js';
import { getAnalyticsData } from '../controllers/analytics.controllers.js';

const adminRouter = Router();

adminRouter.use(authorizeAdmin);

adminRouter.get('/', (req, res) => {
    res.send('Admin route is working');
});

adminRouter.get('/get-users', getUsers)
adminRouter.get('/analytics', getAnalyticsData)

adminRouter.post("/upload", upload.single('product'), cloudinaryUpload);
adminRouter.post('/add-product', addProduct)
adminRouter.delete('/product/:id', deleteProduct)
adminRouter.put('/product/:id', updateProduct)

export default adminRouter;
