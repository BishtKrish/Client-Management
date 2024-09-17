import React, { useEffect, useState } from "react";
import "./Viewpage.css";
import { useParams } from "react-router-dom";
import { API } from "../../../../utils/api";
import { Link } from 'react-router-dom'
import { PDFExport, savePDF } from "@progress/kendo-react-pdf"

const Viewpage = () => {
  const { id } = useParams();
  const [JobSheet, setJobSheet] = useState();
  const container = React.useRef(null);
  const [file, setFile] = useState();
  const getJobSheet = async () => {
    try {
      const response = await API.get(`/api/v1/jobsheet/get/${id}`);
      setJobSheet(response.data.jobSheet);
      setFile(response.data.fileData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobSheet();
  }, []);

  const exportPDFWithMethod = () => {
    let element = container.current || document.body;
    savePDF(element, {
      paperSize: "auto",
      margin: 10,
      fileName: `Jobsheet for ${JobSheet.clientName}`,
    });
  };

  return (
    <div>
     <div >
      <div className="details" ref={container} >
     <div className="view-job">
        <h1>VIEW JOB SHEET</h1>
      </div>
        <table>
          <tr>
            <td className="client"> Client Name:</td>
            <td className="detail"> {JobSheet?.clientName}</td>
          </tr>
          <tr>
            <td className="client"> Contact Info:</td>
            <td className="detail">{JobSheet?.contactInfo}</td>
          </tr>
          <tr>
            <td className="client"> Received Date:</td>
            <td className="detail">{JobSheet?.receivedDate.split("T")[0]}</td>
          </tr>
          <tr>
            <td className="client"> Inventory Received:</td>
            <td className="detail">{JobSheet?.inventoryReceived}</td>
          </tr>
          <tr>
            <td className="client">Inventory Image/Document/Video:</td>
            <td className="view">
              {file ? (
                <a
                  href={`data:application/octet-stream;base64,${file}`} // Using Base64 data in the href
                  download={JobSheet?.uploadInventory} // Default filename for download, you can set this dynamically if you know the file type
                >
                  <button className="download-button">Download</button>
                </a>
              ) : (
                <span>No file available</span>
              )}
            </td>
          </tr>
          <tr>
            <td className="client"> Reported Issues:</td>
            <td className="detail">{JobSheet?.reportedIssues}</td>
          </tr>
          <tr>
            <td className="client">Client Notes:</td>
            <td className="detail">{JobSheet?.clientNotes}</td>
          </tr>
          <tr>
            <td className="client"> Assigned Technician:</td>
            <td className="detail">{JobSheet?.assignedTechnician}</td>
          </tr>
          <tr>
            <td className="client"> Estimated Amount:</td>
            <td className="detail">{JobSheet?.estimatedAmount}</td>
          </tr>
          <tr>
            <td className="client"> Deadline:</td>
            <td className="detail">{JobSheet?.deadline.split("T")[0]}</td>
          </tr>
          <tr>
            <td className="client"> Status:</td>
            <td className="detail">{JobSheet?.status}</td>
          </tr>
        </table>
     </div>
        <h2 className="add">Add or Update Note:</h2>
        <textarea className="area" name="" id=""></textarea>

        
        <Link to={`/editpage/${id}`}><h2 className="edit">Edit Delete</h2></Link>     
        

        <Link to='/'><button className="note">Save Note</button></Link>
        
      </div>

      <button onClick={exportPDFWithMethod} className="save-pdf">Save as PDF</button>
    </div>
  );
};

export default Viewpage;
