import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        // enum is used when we want to restrict the user only to some certain values.
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is not the correct status type`
        }
    }
}, {
    timestamps: true
});

// Compound Indexing: It means that when we will query with both these parameters (fromUserId & toUserId) there response will become very fast.
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next: any) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
     // check if fromUserId equals to toUserId
     return new Error("Cannot send connection request to yourself !!");
  }
//   next();
});

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

export default ConnectionRequest;