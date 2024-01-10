import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    owner: String,
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    published: {
      type: Boolean,
      require: true,
    },
    imageURL: {
      type: String,
    },
    enrolledByStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
