import mongoose from 'mongoose';

const connectionRequestSchema = new mongoose.Schema({
    
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUES} is not a valid value type`
        }
    }
},  {
    timestamps: true
    }
);

const ConnectionRequestModel = mongoose.model("ConnectionRequestModel", connectionRequestSchema);

module.exports = ConnectionRequestModel;