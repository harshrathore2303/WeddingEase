import { Service } from "../models/service.models.js";
import { User } from "../models/user.models.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const createService = async (req, res) => {
  try {
    const { title, price, location, tag } = req.body;
    console.log("Oye mein yaha hoon")
    if ([title, location, tag].some((field) => field?.trim() === "") || price === 0) {
      return res.status(404).json({ message: "all fields are required" });
    }
    console.log("Yaha tk aaye 1");
    
    const dpLocalPath = req.files?.dp && req.files.dp.length > 0 ? req.files?.dp[0]?.path : null;

    const imageSetFiles = req.files?.imageSet || [];
    console.log("Yaha tk aaye 2");

    if (!dpLocalPath) {
      return res.status(400).json({ message: "dp file is required" });
    }
    
    if (imageSetFiles.length === 0){
      return res.status(400).json({ message: "images are required" });
    }
    
    if (imageSetFiles.length > 5){
      return res.status(400).json({ message: "Only 5 images are allowed" });
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

const getServices = async (req, res) => {
  try {
    const {tag, location, search} = req.query;
    const filter = {};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    const offset = (page - 1) * limit;

    if (tag){
      filter.tag = {$regex: tag, $options: "i"};
    }

    if (location){
      filter.location = {$regex: location, $options: "i"};
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { tag: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ];
    }

    const [services, total] = await Promise.all([
      Service.find(filter).skip(offset).limit(limit),
      Service.countDocuments(filter)
    ]);
    
    if (services.length === 0) {
      return res
        .status(200)
        .json({ message: "No services available", data:services });
    }

    return res
      .status(200)
      .json({ message: "Data fetched successfully", data:services, page, limit, total, totalPages: Math.ceil(total / limit) });
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

const getServicesByAdmin = async (req, res) => {
  try {
    const userId = req.user._id;

    const data = await Service.find({ adminId: req.user._id });;
    // console.log(data)

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Services fetched successfully",
      data,
    });
  } catch (error) {
    console.log("Error:::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const deleteService = async (req, res) => {
  try {
    const {id} = req.params;
    const service = await Service.findById(id);
    if (!service){
      return res.status(404).json({message: "Service not found"});
    }

    const serviceDeletion = await Service.findByIdAndDelete(id);
    
    return res.status(200).json({message: "Service deleted successfully"});
  } catch (error) {
    console.log("Error:::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, location, tag } = req.body;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if ([title, location, tag].some((field) => field?.trim() === "") || price === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await Service.findByIdAndUpdate(
      id,
      { title, price, location, tag },
      { new: true }
    );

    return res.status(200).json({ message: "Service updated successfully" });
  } catch (error) {
    console.log("Error:::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export { createService, getServices, getById, getServicesByAdmin, deleteService, updateService };
