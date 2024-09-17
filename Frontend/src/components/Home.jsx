import React, { useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import { API } from '../../utils/api';

const Home = () => {
    const [jobSheets, setJobSheets] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Add state for search term

    const getJobSheets = async () => {
        try {
            const response = await API.get("/api/v1/jobsheet/get");
            setJobSheets(response.data.jobSheets);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getJobSheets();
    }, []);

    const deleteSheet = async (id) => {
        try {
            await API.delete(`/api/v1/jobsheet/delete/${id}`);
            getJobSheets();
        } catch (error) {
            console.log(error);
        }
    };

    // Filter job sheets based on search term (clientName or _id)
    const filteredJobSheets = jobSheets.filter((sheet) => {
        return sheet.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
               sheet._id.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div>
            <div className="navbar">
                <h1>HARDIK TRADERS - CLIENT MANAGEMENT DASHBOARD</h1>
            </div>

            <div className="search">
                <input 
                    type="text" 
                    placeholder="Search by Client Name or ID" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                />
                <button onClick={() => getJobSheets()}>Search</button> {/* Search button */}
            </div>

            <Link to='/jobsheet'>
                <button className='New-Job-Sheet'>New Job Sheet</button>
            </Link>

            <div className="entry">
                <table>
                    <thead>
                        <tr className='head-row'>
                            <th>#</th>
                            <th>Client Id</th>
                            <th>Client Name</th>
                            <th>Contact Info</th>
                            <th>Received Date</th>
                            <th>Inventory Received</th>
                            <th>Reported Issues</th>
                            <th>Client Notes</th>
                            <th>Assigned Technician</th>
                            <th>Estimated Amount</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredJobSheets.length > 0 ? (
                            filteredJobSheets.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item._id}</td>
                                    <td>{item.clientName}</td>
                                    <td>{item.contactInfo}</td>
                                    <td>{item.receivedDate.split("T")[0]}</td>
                                    <td>{item.inventoryReceived}</td>
                                    <td>{item.reportedIssues}</td>
                                    <td>{item.clientNotes}</td>
                                    <td>{item.assignedTechnician}</td>
                                    <td>{item.estimatedAmount}</td>
                                    <td>{item.deadline.split("T")[0]}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <div className='action'>
                                            <Link to={`/viewpage/${item._id}`}>
                                                <button className='btn-1'>View</button>
                                            </Link>
                                            <Link to={`/editpage/${item._id}`}>
                                                <button className='btn-2'>Edit</button>
                                            </Link>
                                            <button onClick={() => deleteSheet(item._id)} className='btn-3'>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="13">No job sheets found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="footer">
                <h2>@2024 Hardik Traders</h2>
            </div>
        </div>
    );
};

export default Home;
