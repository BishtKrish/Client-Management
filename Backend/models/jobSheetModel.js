import mongoose from "mongoose";

const JobsheetSchema = new mongoose.Schema({
    clientName:{
        type:String,
        required:true
    },
    contactInfo:{
        type:Number,
        required:true
    },
    receivedDate:{
        type:Date,
        required:true
    },
    inventoryReceived:{
        type:String,
        required:true
    },
    uploadInventory:{
        type:String,
        required:false
    },
    reportedIssues:{
        type:String,
        required:true
    },
    clientNotes:{
        type:String,
        required:true
    },
    assignedTechnician:{
        type:Number,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    estimatedAmount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },


},{timestamps:true})

export const jobSheetModel = mongoose.model("JobSheet",JobsheetSchema)