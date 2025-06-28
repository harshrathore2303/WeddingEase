import { Service } from "../models/service.models.js";
import { User } from "../models/user.models.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const createService = async (req, res) => {
  try {
    const { title, price, location, tag } = req.body;
    console.log("Oye mein yaha hoon")
    if ([title, price, location, tag].some((field) => field?.trim() === "")) {
      return res.status(404).json({ message: "all fields are required" });
    }
    console.log("Yaha tk aaye 1");
    const dpLocalPath = req.files?.dp[0]?.path;

    const imageSetFiles = req.files?.imageSet || [];
    console.log("Yaha tk aaye 2");

    if (!dpLocalPath) {
      return res.status(400).json({ message: "dp file is required" });
    }

    const dp = await uploadCloudinary(dpLocalPath);
    //this will delete temp dp file that is stored in public/temp
    fs.unlinkSync(dpLocalPath);
    console.log("Yaha tk aaye 3");

    // Promise.all() runs all uploads in parallel and waits until all are done.
    const uploadResults = await Promise.all(
      imageSetFiles.map(async (file) => {
        const result = await uploadCloudinary(file.path);
        fs.unlinkSync(file.path);
        return result;
      })
    );

    console.log("Yaha tk aaye 4");
    const imageSet = uploadResults
      .filter((res) => res && res.url)
      .map((res) => res.url);

    if (!dp) {
      throw new ApiError(400, "dp file is required");
    }

    const service = await Service.create({
      title,
      price,
      location,
      dp: dp.url,
      imageSet: imageSet,
      tag,
      adminId: req.user._id,
    });

    return res.status(201).json({ message: "Service created successfully" });
  } catch (error) {
    console.log("Error:::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();

    return res
      .status(200)
      .json({ message: "Data fetched successfully", data: services });
  } catch (error) {
    console.log("Error:::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Not found" });
    }
    return res
      .status(200)
      .json({ message: "Data fetched successfully", data: service });
  } catch (error) {
    console.log("Error:::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getByFilter = async (req, res) => {
  try {
    const { tag, location } = req.query;
    const filter = {};
    if (tag) {
      filter.tag = { $regex: tag, $options: "i" }; // case-insensitive match
    }
    if (location) {
      filter.location = { $regex: location, $options: "i" }; // case-insensitive match
    }

    const services = await Service.find(filter);

    if (services.length === 0) {
      return res
        .status(200)
        .json({ message: "No services available", data: [] });
    }
    return res
      .status(200)
      .json({ message: "Data fetched successfully", data: services });
  } catch (error) {
    console.log("Error:::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getServicesByAdmin = async (req, res) => {
  try {
    const userId = req.user._id;

    const data = await Service.find({ adminId: req.user._id });;
    console.log(data)

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Services fetched successfully",
      data: data.services,
    });
  } catch (error) {
    console.log("Error:::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export { createService, getAllServices, getById, getByFilter, getServicesByAdmin };
