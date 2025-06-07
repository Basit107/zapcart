import Users from '../models/user.models.js';


export const getUser = async (request, response, next) => {
    try {
        // Fetching user data from the database
        let userData = await Users.findById(request.params.id).select('-password -__v');
        
        // If no user data is found, return a 404 error
        if (!userData) {
            const error = new Error("User not found");
            error.status = 404;
            throw next(error);
        }
     
        // Sending the user data as a JSON response
        response.status(200).json({success: true, data: userData});
    } 
    catch (error) {
        // Handling any errors that occur during the process
        next(error);
    }
}

export const getCartProducts = async (request, response, next) => {
    try {
        let userData = await Users.findOne({_id:request.params.id}).select('cartData');
        if (!userData) {
            return response.status(404).json({ success: false, message: "User not found" });
        }
        response.json({
            success: true,
            message: "Cart Data Retrieved Successfully.",
            cartData: userData.cartData,
        });
    }
    catch (error) {
        next(error)
    }
}

export const addProductToCart = async (request, response, next) =>{
    try {
        let userData = await Users.findOne({_id:request.params.id});
        userData.cartData[request.body.itemId] = (userData.cartData[request.body.itemId] || 0) + 1;
        if (!userData) {
            return response.status(404).json({ success: false, message: "User not found" });
        }
        // Update the user's cart data in the database
        await Users.findOneAndUpdate({_id:request.params.id}, {cartData:userData.cartData});

        response.send({
        success: true,
        message:"Product Added To Cart"
        })
    }
    catch (error) {
        next(error)
    }
}

export const removeProductFromCart = async (request, response, next) =>{
    try {
        if (request.params.id !== request.user.id) {
            const error = new Error("You are not The owner of this account.")
            error.status = 401
            throw error;
        }
        let userData = await Users.findOne({_id:request.user.id});

        if (userData.cartData[request.body.itemId] > 0) {
            userData.cartData[request.body.itemId] -= 1;
            await Users.findOneAndUpdate({_id:request.user.id}, {cartData:userData.cartData});
            response.send({
            success: true,
            message: "Product Removed From Cart"
            })
        }
    }
    catch (error) {
        next(error)
    }
}