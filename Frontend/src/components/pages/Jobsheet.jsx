import React, { useState } from "react";
import "./Jobsheet.css";
import { API } from "../../../utils/api";
import { useNavigate } from 'react-router-dom';



const Jobsheet = () => {
  const [clientName, setClientName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [receivedDate, setReceivedDate] = useState("");
  const [inventoryReceived, setInventoryReceived] = useState("");
  const [uploadInventory, setUploadInventory] = useState(null); // File input
  const [reportedIssues, setReportedIssues] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [assignedTechnician, setAssignedTechnician] = useState("");
  const [deadline, setDeadline] = useState("");
  const [estimatedAmount, setEstimatedAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setUploadInventory(e.target.files[0]); // Set the file to state
  };

  const navigate = useNavigate();
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("clientName", clientName);
    formData.append("contactInfo", contactInfo);
    formData.append("receivedDate", receivedDate);
    formData.append("inventoryReceived", inventoryReceived);
    formData.append("uploadInventory", uploadInventory); // Append the file
    formData.append("reportedIssues", reportedIssues);
    formData.append("clientNotes", clientNotes);
    formData.append("assignedTechnician", assignedTechnician);
    formData.append("deadline", deadline);
    formData.append("estimatedAmount", estimatedAmount);
    formData.append("status", status);

    try {
      const response = await API.post("/api/v1/jobsheet/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });
      navigate('/');
      
      console.log("Job sheet created successfully:", response.data);
    } catch (error) {
      console.log("Error creating job sheet:", error);
    }
  };

  return (
    <div className="job-sheet">
      <div>
        <h1>CREATE NEW JOB SHEET</h1>
      </div>

      <div>
        <h2>Client Name:</h2>
        <input
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          type="text" required
        />

        <h2>Contact Info (Phone 10 nos):</h2>
        <input
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          type="text"
        />

        <h2>Received Date:</h2>
        <input
          value={receivedDate}
          onChange={(e) => setReceivedDate(e.target.value)}
          type="date"
        />

        <h2>Inventory Received:</h2>
        <input
          value={inventoryReceived}
          onChange={(e) => setInventoryReceived(e.target.value)}
          type="text"
        />

        <h2>Upload Inventory Image/Document/Video (PDF):</h2>
        <input
          type="file"
          onChange={handleFileChange}
          accept="application/pdf,image/*,video/*"
        />

        <h2>Reported Issues:</h2>
        <textarea
          value={reportedIssues}
          onChange={(e) => setReportedIssues(e.target.value)}
        />

        <h2>Client Notes:</h2>
        <textarea
          value={clientNotes}
          onChange={(e) => setClientNotes(e.target.value)}
        />

        <h2>Assigned Technician:</h2>
        <input
          value={assignedTechnician}
          onChange={(e) => setAssignedTechnician(e.target.value)}
          type="text"
        />

        <h2>Deadline:</h2>
        <input
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          type="date"
        />

        <h2>Estimated Amount:</h2>
        <input
          value={estimatedAmount}
          onChange={(e) => setEstimatedAmount(e.target.value)}
          type="text"
        />

        <h2>Status:</h2>
        <input
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          type="text"
        />

        <button onClick={handleSubmit} className="sheet">
          Save Job Sheet
        </button>
      </div>
    </div>
  );
};

export default Jobsheet;
