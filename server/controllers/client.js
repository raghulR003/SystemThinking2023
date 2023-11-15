import Services from "../models/Services.js";
import ServiceStat from "../models/ServiceStat.js";
import User from "../models/User.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getServices = async (req,res) => {
    try {
        const service = await Services.find();
        const servicewithStats= await Promise.all(
            service.map(async (service) => {
                const stat = await ServiceStat.find({
                    serviceid: service._serviceid
                })
                return {
                    ...service._doc,
                    stat,
                };
            })
        );

        res.status(200).json(servicewithStats);
    } catch (error) {
        res.error(404).json({message: error.message});
    }
};

export const getWorkers = async (req, res) => {
    try {
        const Workers = await User.find({ role: "worker"}).select("-password");
        res.status(200).json(Workers);
    } catch (error) {
        res.error(404).json({message: error.message});
    }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};