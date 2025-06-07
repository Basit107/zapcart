import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        price: {
            type: Number,
            required: true,
            min: 1,
        },
    },],
    totalAmount: {
        type: Number,
        required: true,
        min: 1,
    },
}, { timestamps: true })

// Exporting Order Model
const Order = mongoose.model("orders", orderSchema);
export default Order;