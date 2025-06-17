import { useState, useEffect } from 'react';
import './Patients.css';
import Modal from '../common/Modal/Modal';
import usePatients from './usePatientsHook';
import { Patient, Vitals } from './patientTypes';
import { getLocalISODateTime } from '../../utils/dateUtils';
import { addPatient, addVitals, fetchVitalsByPatientId } from './patientApi';
import { useDateFormatter } from '@react-aria/i18n';

// This component displays a list of patients, allows adding vitals for each patient, and handles the UI interactions.
const Patients = () => {
  const formatter = useDateFormatter({ dateStyle: "long" });
  const { patients, loading, error, refetch } = usePatients();
  const [message, setMessage] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const[showAddVitalsForm, setShowAddVitalsForm] = useState(false);
  const [showAddPatientForm, setShowAddPatientForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    address: '',
    reasonForVisit: '',
  });

  const [vitals, setVitals] = useState({
    recordedAt: '',
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    respiratoryRate: '',
  });

  const [selectedVitals, setSelectedVitals] = useState<Vitals[]>([]);
  const [showVitalsModal, setShowVitalsModal] = useState(false);


  // This effect clears the message after 3 seconds.
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // This function validates the new patient data, calls the API to add the patient, and updates the UI accordingly.
  const handleAddPatient = async () => {
    if (!newPatient.firstName || !newPatient.lastName || !newPatient.dateOfBirth || !newPatient.gender 
      || !newPatient.contactNumber || !newPatient.address || !newPatient.reasonForVisit) 
    {
      setMessage("Please fill in all the details.");
      return;
    }
  
    try {
      const result = await addPatient(newPatient);
      console.log("Patient added result:", result); // Check what server sends back
      await refetch();
      setMessage(`Patient ${newPatient.firstName} ${newPatient.lastName} added successfully`);
      setNewPatient({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        contactNumber: '',
        address: '',
        reasonForVisit: '',
      });
      setShowAddPatientForm(false);
    } catch (error: any) {
      setMessage(error.response?.data || error.message);
    }
  };  

  /*
    This function sets the selected patient and opens the vitals form and 
    initializes the vitals form with the current date and time.
  */
  const handleSelectedPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setVitals({
      recordedAt: getLocalISODateTime(),
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      respiratoryRate: '',
    });
    setShowAddVitalsForm(true);
  };

  // This function sets the selected patient and opens the vitals form.
  const handleAddVitals = async () => {
    if (
      !vitals.recordedAt ||
      !vitals.bloodPressure ||
      !vitals.heartRate ||
      !vitals.temperature ||
      !vitals.respiratoryRate
    ) {
      setMessage("Please fill in all vitals.");
      return;
    }
  
    if (!selectedPatient?.id) {
      setMessage("No patient selected.");
      return;
    }
  
    try {
      const vitalsPayload = {
        patientId: selectedPatient.id,
        ...vitals,
      };
  
      const result = await addVitals(vitalsPayload);
      console.log("Vitals added result:", result); // Debug log
  
      await refetch();
      setMessage(`Vitals recorded for ${selectedPatient.firstName} ${selectedPatient.lastName}`);
  
      setVitals({
        recordedAt: '',
        bloodPressure: '',
        heartRate: '',
        temperature: '',
        respiratoryRate: '',
      });
  
      setShowAddVitalsForm(false);
    } catch (error: any) {
      setMessage(error.response?.data || error.message);
    }
  };

  // This function displays the selected patient's vitals details.
  const handleShowVitals = async (patientId: number) => {
    try {
      const vitals = await fetchVitalsByPatientId(patientId);
      setSelectedVitals(vitals);
      setShowVitalsModal(true);
    } catch (error: any) {
      setMessage(error.response?.data || error.message);
    }
  };
  

  return (
    <div className="patients-container">
      <h2>Patients List</h2>
      {message && <div className="info-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <button onClick={() => setShowAddPatientForm(true)}>Add Patient</button>
      {loading ? (
        <div>Loading patients...</div>
      ) : (
        <div className={`patients-table-scroll-wrapper ${showAddVitalsForm ? 'modal-open' : ''}`}>
          <table className="patients-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Contact Number</th>
              <th>Address</th>
              <th>Reason For Visit</th>
              <th>Actions</th>
              <th>Vitals Summary</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient: Patient) => (
              <tr key={patient.id}>
                <td>{`${patient.firstName} ${patient.lastName}` }</td>
                <td>{formatter.format(new Date(patient.dateOfBirth))}</td>
                <td>{patient.gender}</td>
                <td>{patient.contactNumber}</td>
                <td>{patient.address}</td>
                <td>{patient.reasonForVisit}</td>
                <td>
                <button onClick={() => handleSelectedPatient(patient)}>Add Vitals</button>
                </td>
                <td>
                <button onClick={() => handleShowVitals(patient.id)}>Show Vitals</button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      )}

{showAddPatientForm && (
  <Modal onClose={() => setShowAddPatientForm(false)}
  className="add-patient-btn">
    <h3>Add Patient</h3>
    <div className="modal-form">
      <input
        type="text"
        placeholder="First Name"
        value={newPatient.firstName}
        onChange={e => setNewPatient(prev => ({ ...prev, firstName: e.target.value }))}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={newPatient.lastName}
        onChange={e => setNewPatient(prev => ({ ...prev, lastName: e.target.value }))}
      />
      <input
        type="text"
        placeholder="Date Of Birth"
        value={newPatient.dateOfBirth}
        onFocus={e => (e.target.type = 'date')}
        onBlur={e => (e.target.type = newPatient.dateOfBirth ? 'date' : 'text')}
        onChange={e => setNewPatient(prev => ({ ...prev, dateOfBirth: e.target.value }))}
      />

      <select
        value={newPatient.gender}
        onChange={e => setNewPatient(prev => ({ ...prev, gender: e.target.value }))}
      >
        <option value="" disabled>Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Female">Other</option>
      </select>
      <input
        type="text"
        placeholder="Contact Number"
        value={newPatient.contactNumber}
        onChange={e => setNewPatient(prev => ({ ...prev, contactNumber: e.target.value }))}
      />
      <input
        type="text"
        placeholder="Address"
        value={newPatient.address}
        onChange={e => setNewPatient(prev => ({ ...prev, address: e.target.value }))}
      />
      <input
        type="text"
        placeholder="Reason for Visit"
        value={newPatient.reasonForVisit}
        onChange={e => setNewPatient(prev => ({ ...prev, reasonForVisit: e.target.value }))}
      />
      <button onClick={handleAddPatient}>Submit</button>
    </div>
  </Modal>
)}

{showAddVitalsForm && (
        <Modal onClose={() => setShowAddVitalsForm(false)}
        className="add-vitals-btn">
          <h3>Record Vitals</h3>
          <div className="modal-form">
            <input type="text" value={`${selectedPatient?.firstName} ${selectedPatient?.lastName}`} disabled />
            <input
              type="datetime-local"
              value={vitals.recordedAt}
              disabled
            />
            <input
              type="text"
              placeholder="Blood Pressure"
              value={vitals.bloodPressure}
              onChange={e => setVitals(prev => ({ ...prev, bloodPressure: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Heart Rate"
              value={vitals.heartRate}
              onChange={e => setVitals(prev => ({ ...prev, heartRate: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Temperature"
              value={vitals.temperature}
              onChange={e => setVitals(prev => ({ ...prev, temperature: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Respiratory Rate"
              value={vitals.respiratoryRate}
              onChange={e => setVitals(prev => ({ ...prev, respiratoryRate: e.target.value }))}
            />
            <button onClick={handleAddVitals}>Submit</button>
          </div>
        </Modal>
      )}

      {showVitalsModal && (
        <Modal onClose={() => setShowVitalsModal(false)}
        className="vitals-modal-box">
          <h3>Vitals for Patient</h3>
          {selectedVitals.length === 0 ? (
            <div>No vitals recorded.</div>
          ) : (
            <table className="vitals-table">
              <thead>
                <tr>
                  <th>Recorded At</th>
                  <th>Blood Pressure</th>
                  <th>Heart Rate</th>
                  <th>Temperature</th>
                  <th>Respiratory Rate</th>
                </tr>
              </thead>
              <tbody>
                {selectedVitals.map((vital, index) => (
                  <tr key={index}>
                    <td>{vital.recordedAt}</td>
                    <td>{vital.bloodPressure}</td>
                    <td>{vital.heartRate}</td>
                    <td>{vital.temperature}</td>
                    <td>{vital.respiratoryRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Patients;
