import React, { useState, useEffect } from "react";
import "./Editpage.css";
import { API } from "../../../../utils/api";
import { useParams ,Link } from "react-router-dom";

const Editpage = () => {
  const [clientName, setClientName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [receivedDate, setReceivedDate] = useState("");
  const [inventoryReceived, setInventoryReceived] = useState("");
  const [uploadInventory, setUploadInventory] = useState(null); // Changed to null to handle file object
  const [reportedIssues, setReportedIssues] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [assignedTechnician, setAssignedTechnician] = useState("");
  const [deadline, setDeadline] = useState("");
  const [estimatedAmount, setEstimatedAmount] = useState("");
  const [status, setStatus] = useState("");

  const { id } = useParams();

  // Fetch existing job sheet data
  const getJobSheet = async () => {
    try {
      const response = await API.get(`/api/v1/jobsheet/get/${id}`);
      const data = response.data.jobSheet;
      setClientName(data.clientName);
      setContactInfo(data.contactInfo);
      setReceivedDate(data.receivedDate.split("T")[0]);
      setInventoryReceived(data.inventoryReceived);
      setUploadInventory(data.uploadInventory);
      setReportedIssues(data.reportedIssues);
      setClientNotes(data.clientNotes);
      setAssignedTechnician(data.assignedTechnician);
      setDeadline(data.deadline.split("T")[0]);
      setEstimatedAmount(data.estimatedAmount);
      setStatus(data.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobSheet();
  }, [id]);

  // Handle form submission with FormData
  const handelSubmit = async () => {
    const formData = new FormData();
    formData.append("clientName", clientName);
    formData.append("contactInfo", contactInfo);
    formData.append("receivedDate", receivedDate);
    formData.append("inventoryReceived", inventoryReceived);

    // Only append file if a new one is uploaded
    if (uploadInventory instanceof File) {
      formData.append("uploadInventory", uploadInventory);
    }

    formData.append("reportedIssues", reportedIssues);
    formData.append("clientNotes", clientNotes);
    formData.append("assignedTechnician", assignedTechnician);
    formData.append("deadline", deadline);
    formData.append("estimatedAmount", estimatedAmount);
    formData.append("status", status);

    try {
      await API.put(`/api/v1/jobsheet/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Job sheet updated successfully");
    } catch (error) {
      console.log("Error updating job sheet:", error);
    }
  };

  // Handle file change for file input
  const handleFileChange = (e) => {
    setUploadInventory(e.target.files[0]);
  };

  return (
    <div className="edit-sheet">
      <div className="job-sheet">
        <h1>UPDATE JOB SHEET</h1>
      </div>
      <h2>Client Name:</h2>
      <input
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        type="text"
      />

      <h2>Contact Info (Phone 10nos):</h2>
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

      <h2>Upload Inventory Image/Document/Video:</h2>
      <input
        onChange={handleFileChange}
        type="file"
        accept="image/*,application/pdf,video/*"
      />

      <h2>Reported Issues:</h2>
      <textarea
        value={reportedIssues}
        onChange={(e) => setReportedIssues(e.target.value)}
      ></textarea>

      <h2>Client Notes:</h2>
      <textarea
        value={clientNotes}
        onChange={(e) => setClientNotes(e.target.value)}
      ></textarea>

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
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <Link to='/'> <button onClick={handelSubmit} className="sheet">
        Save Job Sheet
      </button></Link>
       
    </div>
  );
};

export default Editpage;
