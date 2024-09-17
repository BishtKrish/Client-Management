import { jobSheetModel } from "../models/jobSheetModel.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // You need to create the 'uploads' directory in your project root
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});

const upload = multer({ storage: storage }).single("uploadInventory");

export const createJobSheet = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.log(err);

      return res
        .status(500)
        .json({ success: false, message: "File upload failed", error: err });
    }

    try {
      const jobSheetData = {
        ...req.body,
        uploadInventory: req.file ? req.file.path : null, // Save the file path in the database
      };

      const jobSheet = await jobSheetModel.create(jobSheetData);

      if (!jobSheet) {
        return res
          .status(400)
          .json({ success: false, message: "Failed to create job sheet" });
      }

      return res.status(201).json({
        success: true,
        message: "Job sheet created successfully",
        data: jobSheet,
      });
    } catch (error) {
      console.log("Error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to create job sheet", error });
    }
  });
};

export const getJobSheets = async (req, res) => {
  try {
    const jobSheets = await jobSheetModel.find();
    if (!jobSheets) {
      return res
        .status(404)
        .json({ success: false, message: "no jobsheet found" });
    }
    return res.status(200).json({
      success: true,
      message: "jobsheet fetched successfully",
      jobSheets,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "failed to get jobsheet" });
  }
};

export const getJobSheetById = async (req, res) => {
  try {
    const jobSheet = await jobSheetModel.findById(req.params.id);
    if (!jobSheet) {
      return res.status(404).json({
        success: false,
        message: "No jobsheet found",
      });
    }

    let fileData = null;
    if (jobSheet.uploadInventory) {
      const filePath = path.resolve(jobSheet.uploadInventory);
      try {
        // Read the file and convert it to Base64
        const fileBuffer = fs.readFileSync(filePath);
        fileData = fileBuffer.toString("base64");
      } catch (error) {
        console.log("error", error);
        return res
          .status(404)
          .json({ success: false, message: "File not found" });
      }
    }

    // Send job sheet data with file (Base64 encoded)
    return res.status(200).json({
      success: true,
      message: "Job sheet fetched successfully",
      jobSheet,
      fileData, // Base64 encoded file
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Failed to get jobsheet",
    });
  }
};

export const deleteJobsheets = async (req, res) => {
  try {
    const deleteJobs = await jobSheetModel.deleteOne({ _id: req.params.id });
    if (!deleteJobs) {
      return res.status(404).json({ success: false, message: "no data" });
    }
    return res
      .status(200)
      .json({ success: true, message: "jobsheet deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "failed" });
  }
};

export const updatejobSheets = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "File upload failed", error: err });
    }

    try {
      const jobSheetData = {
        ...req.body,
        uploadInventory: req.file ? req.file.path : req.body.uploadInventory, // Update file only if new one is uploaded
      };

      const updateJobs = await jobSheetModel.findByIdAndUpdate(
        req.params.id,
        jobSheetData,
        { new: true }
      );

      if (!updateJobs) {
        return res
          .status(404)
          .json({ success: false, message: "Job sheet not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Updated successfully", updateJobs });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to update job sheet", error });
    }
  });
};
