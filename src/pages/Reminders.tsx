// src/App.js
import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Reminders() {
  const [description, setDescription] = useState('');
  const [datetime, setDatetime] = useState('');
  const [phone, setPhone] = useState('');
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  interface Reminder {
    _id: string;
    description: string;
    datetime: string;
    phone:string;
  }

  useEffect(() => {
    // Fetch reminders from the backend when the component mounts
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await axios.get<Reminder[]>('http://localhost:5001/api/reminders');
      setReminders(response.data);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  const addReminder = async () => {
    if (description && datetime && phone) {
      try {
        // Send a POST request to add a new reminder
        await axios.post('http://localhost:5001/api/reminders', {
          description,
          datetime,
          phone,
        });

        // Fetch updated reminders after adding a new one
        fetchReminders();

        // Clear input fields
        setDescription('');
        setDatetime('');
        setPhone('');
      } catch (error) {
        console.error('Error adding reminder:', error);

        // Log the specific error details for further investigation
        if (axios.isAxiosError(error)) {
          const axiosError: AxiosError = error;
          console.error('Response status:', axiosError.response?.status);
          console.error('Response data:', axiosError.response?.data);
        }

        alert('Error adding reminder. Check the console for details.');
      }
    } else {
      alert('Please enter both description and date/time.');
    }
  };

  const deleteReminder = async (_id: string) => {
    try {
      // Send a DELETE request to remove the selected reminder
      await axios.delete(`http://localhost:5001/api/reminders/${_id}`);

      // Fetch updated reminders after deleting one
      fetchReminders();
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  const openEditModal = (reminder: Reminder) => {
    setEditingReminder(reminder);
  };

  const closeEditModal = () => {
    setEditingReminder(null);
  };

  const updateReminder = async () => {
    if (editingReminder) {
      try {
        // Send a PUT request to update the selected reminder
        await axios.put(`http://localhost:5001/api/reminders/${editingReminder._id}`, {
          description: editingReminder.description,
          datetime: editingReminder.datetime,
          phone:editingReminder.phone,
        });

        // Fetch updated reminders after editing one
        fetchReminders();
        setEditingReminder(null); // Close the edit modal
      } catch (error) {
        console.error('Error updating reminder:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary">Remind Me</h1>
      <div className="reminder-form">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          className="form-control mb-2"
          placeholder="Enter your reminder..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <label htmlFor="datetime">Date and Time:</label>
        <input
          type="datetime-local"
          id="datetime"
          className="form-control mb-2"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
        />
        <label htmlFor="phone">Phone Number:</label> {/* New input field for phone number */}
        <input
          type="text"
          id="phone"
          className="form-control mb-2"
          placeholder="Enter phone number..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <button onClick={addReminder} className="btn btn-primary">
          Add Reminder
        </button>
      </div>
      <div className="reminder-suggestions">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Description</th>
              <th>Date</th>
              <th>Time</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map((reminder) => (
              <tr key={reminder._id} className="reminder-item">
                <td>{reminder.description}</td>
                <td>{new Date(reminder.datetime).toLocaleDateString()}</td>
                <td>{new Date(reminder.datetime).toLocaleTimeString()}</td>
                <td>{reminder.phone}</td>
                <td>
                  <button onClick={() => openEditModal(reminder)} className="btn btn-warning">
                    Edit
                  </button>
                  <button onClick={() => deleteReminder(reminder._id)} className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Reminder Modal */}
      {editingReminder && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Reminder</h5>
                <button type="button" className="close" onClick={closeEditModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <label htmlFor="editDescription">Description:</label>
                <input
                  type="text"
                  id="editDescription"
                  className="form-control mb-2"
                  placeholder="Enter edited description..."
                  value={editingReminder.description}
                  onChange={(e) =>
                    setEditingReminder({ ...editingReminder, description: e.target.value })
                  }
                />
                <label htmlFor="editDatetime">Date and Time:</label>
                <input
                  type="datetime-local"
                  id="editDatetime"
                  className="form-control mb-2"
                  value={editingReminder.datetime}
                  onChange={(e) =>
                    setEditingReminder({ ...editingReminder, datetime: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                <button onClick={updateReminder} className="btn btn-primary">
                  Update Reminder
                </button>
                <button onClick={closeEditModal} className="btn btn-secondary ml-2">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reminders;
