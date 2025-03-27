import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddTrip.css"
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

interface Trip {
  _id: string;
  destination: string;
  start_date: string;
  end_date: string;
  activities: string[];
  ages: number[];
  notes: string;
}

const AddTrip = () => {
  const navigate = useNavigate();

  const [trip, setTrip] = useState<Omit<Trip, "_id">>({
    destination: "",
    start_date: "",
    end_date: "",
    activities: [],
    ages: [],
    notes: "",
  });

  const [activity, setActivity] = useState("");
  const [age, setAge] = useState("");

  // Handles input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  // Add activity to the list
  const addActivity = () => {
    if (activity.trim()) {
      setTrip({ ...trip, activities: [...trip.activities, activity] });
      setActivity("");
    }
  };

  // Add age to the list
  const addAge = () => {
    const parsedAge = parseInt(age);
    if (!isNaN(parsedAge)) {
      setTrip({ ...trip, ages: [...trip.ages, parsedAge] });
      setAge("");
    }
  };

  // Remove activity
  const removeActivity = (index: number) => {
    setTrip({ ...trip, activities: trip.activities.filter((_, i) => i !== index) });
  };

  // Remove age
  const removeAge = (index: number) => {
    setTrip({ ...trip, ages: trip.ages.filter((_, i) => i !== index) });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://35.184.227.186:3006/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(trip),
      });

      if (!response.ok) throw new Error("Failed to create trip");

      alert("Trip created successfully!");
      navigate("/profile"); // Redirect to profile after success
    } catch (error) {
      console.error("Create error:", error);
    }
  };

  return (
    <div className="general">
        <NavBar/>
    <div className="create-trip">
      <h1>Create a New Trip</h1>
      <form onSubmit={handleSubmit}>
        <label>Destination:</label>
        <input type="text" name="destination" value={trip.destination} onChange={handleChange} required />

        <label>Start Date:</label>
        <input type="date" name="start_date" value={trip.start_date} onChange={handleChange} required />

        <label>End Date:</label>
        <input type="date" name="end_date" value={trip.end_date} onChange={handleChange} required />

        <label>Activities:</label>
        <input type="text" value={activity} onChange={(e) => setActivity(e.target.value)} />
        <button type="button" onClick={addActivity}>Add Activity</button>
        <ul>
          {trip.activities.map((act, index) => (
            <li key={index}>{act} <button type="button" onClick={() => removeActivity(index)}>Remove</button></li>
          ))}
        </ul>

        <label>Ages:</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        <button type="button" onClick={addAge}>Add Age</button>
        <ul>
          {trip.ages.map((a, index) => (
            <li key={index}>{a} <button type="button" onClick={() => removeAge(index)}>Remove</button></li>
          ))}
        </ul>

        <label>Notes:</label>
        <textarea name="notes" value={trip.notes} onChange={handleChange}></textarea>

        <button type="submit">Create Trip</button>
        <button onClick={()=>navigate('/profile')}>back to profile</button>
      </form>
      
    </div>
    <Footer/>
    </div>
  );
};

export default AddTrip;
