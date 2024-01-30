const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"]
        },
        desc: {
            type: String,
            required: [false, "Please enter product name"]
        },
        price: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;