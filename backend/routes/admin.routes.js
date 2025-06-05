import Router from 'express';
import { authorizeAdmin } from '../middlewares/auth.middlewares.js';
import { getUsers } from '../controllers/user.controllers.js';
import { addProduct, deleteProduct, updateProduct } from '../controllers/admin.controllers.js';
import { staticUpload, upload } from '../middlewares/upload.middlewares.js';

const adminRouter = Router();

adminRouter.use(authorizeAdmin);

adminRouter.get('/', (req, res) => {
    res.send('Admin route is working');
});

adminRouter.get('/get-users', getUsers)
adminRouter.post('/add-product', addProduct)
adminRouter.delete('/product/:id', deleteProduct)
adminRouter.put('/product/:id', updateProduct)
adminRouter.post("/upload", upload.single('product'), staticUpload);

export default adminRouter;
