const mongoose = require("mongoose")

const productVariantSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"]
        },
        SKU: {
            type: String,
            required: [false, "Please enter product name"]
        },
        additionalCost: {
            type: Number,
            required: true,
            default: 0
        },
        stockCount: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

const ProductVarient = mongoose.model('Product', productVariantSchema);

module.exports = ProductVarient;