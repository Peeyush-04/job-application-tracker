import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["APPLIED", "IN-REVIEW", "SUCCESS", "REJECTED"],
      default: "APPLIED",
    },
    resume: {
      type: String,
    },
    history: [
      {
        status: String,
        changedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
