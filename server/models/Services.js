import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    serviceid: Number,
    name: String,
    price: Number,
    description: String,
    category: String,
    provider: String,
    availability: Number,
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", ServiceSchema);
export default Service;