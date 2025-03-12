import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
}, { timestamps: true });

const vehicleSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["two wheeler", "four wheeler"],
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    availabilityStatus: {
        type: Boolean,
        required: true,
        default: true,
    },
    image: {
        type: String, // URL for the image (could be stored in a cloud service like AWS S3)
        required: true,
    },
    verify: {
        type: Boolean, // Indicates if the vehicle is verified by the admin
        default: false,
    },
    reviews: [reviewSchema], // Embedded array of review documents
}, { timestamps: true });

export default mongoose.model("Vehicle", vehicleSchema);
