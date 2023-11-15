import mongoose from "mongoose";

const ServiceStatSchema = new mongoose.Schema(
  {
    serviceid: Number,
    employeeid: Number,
    outcome: String,
    notes: String,

    servicemetrics:[
        {
            metricid: Number,
            metricname: String,
            metricdesc: String,
            value: Number,
        },
    ],
    servicehistory:[
        {
            usagecount: Number,
            totalcost: Number,
            averageResponse: Number,
        },
    ],
  },
  { timestamps: true }
);

const ServiceStat = mongoose.model("ServiceStat", ServiceStatSchema);
export default ServiceStat;