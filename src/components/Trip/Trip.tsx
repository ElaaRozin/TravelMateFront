import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './Trip.css';
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

interface Suggestion {
  destination: string;
  plans: {
    theme: string;
    dayNumber: string;
    schedule: {
      activity: string;
      details: string;
      imageURL: string;
      time: number;
    }[];
  }[];
}

const Trip = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTrip, setEditedTrip] = useState<Trip | null>(null);
  const [loadingSuggestion, setLoadingSuggestion] = useState(false); // Only this part was added

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://35.184.227.186:3006/api/trips/${tripId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching trip:", errorData);
          return;
        }

        const data = await response.json();
        setTrip(data);
        setEditedTrip(data); // Set initial values for edit
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };

    fetchTrip();
  }, [tripId]);

  const editTrip = async () => {
    if (!editedTrip) return;

    try {
      const response = await fetch(`http://35.184.227.186:3006/api/trips/${tripId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editedTrip),
      });

      if (!response.ok) throw new Error("Failed to update trip");

      const data = await response.json();
      setTrip(data);
      setIsEditing(false); // Exit edit mode
      alert("Trip updated successfully!");
      navigate(`/trip/${tripId}`)
    } catch (error) {
      console.error("Edit error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editedTrip) {
      setEditedTrip({
        ...editedTrip,
        [name]: value,
      });
    }
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, arrayType: "activities" | "ages") => {
    const { value } = e.target;
    if (editedTrip) {
      const updatedArray = [...(editedTrip[arrayType] || [])];
      updatedArray.push(value);
      setEditedTrip({
        ...editedTrip,
        [arrayType]: updatedArray,
      });
    }
  };

  const handleRemoveArrayItem = (index: number, arrayType: "activities" | "ages") => {
    if (editedTrip) {
      const updatedArray = [...(editedTrip[arrayType] || [])];
      updatedArray.splice(index, 1);
      setEditedTrip({
        ...editedTrip,
        [arrayType]: updatedArray,
      });
    }
  };

  const deleteTrip = async () => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;

    try {
      const response = await fetch(`http://35.184.227.186:3006/api/trips/${tripId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete trip");

      alert("Trip deleted successfully!");
      navigate("/profile"); // Redirect to profile page
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const getSuggestion = async () => {
    setLoadingSuggestion(true); // This triggers the loading message to appear

    try {
      const response = await fetch(`http://35.184.227.186:3006/api/suggest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(trip),
      });

      if (!response.ok) throw new Error("Failed to fetch suggestion");

      const data = await response.json();
      console.log("Suggestion response:", data);
      // Extracting the suggestion and organizing it
      const destination = data.Destination;
      const plans = data.Plans.map((plan: any) => {
        return {
          dayNumber: plan.dayNumber,
          theme: plan.theme,
          schedule: plan.schedule.map((activity: any) => ({
            activity: activity.activity,
            details: activity.details,
            imageURL: activity.imageURL,
            time: activity.time,
          })),
        };
      });

      setSuggestion({ destination, plans });
    } catch (error) {
      console.error("Suggestion fetch error:", error);
      setSuggestion(null);
      setLoadingSuggestion(false)
    } finally {
      setLoadingSuggestion(false); // This hides the loading message after fetching
    }
  };
  if (loading) return <p>Loading trip details...</p>;
  if (!trip) return <p>Trip not found.</p>;

  return (
    <div>
      <NavBar />
      <div className="trip-container">
       
        <h1>{`My Trip to ${trip.destination}`}</h1>
        {!isEditing?(<div className="dates">
        <p><strong>Start Date:</strong> {trip.start_date}</p>
        <p><strong>End Date:</strong> {trip.end_date}</p>
        </div>):('')}
        
        

        {/* Editable Fields Section */}
        <div className="editable-fields">
          <p><strong>Activities:</strong></p>
          {isEditing ? (
            <div>
                <input
                type="text"
                placeholder="Add Activity"
                onBlur={(e) => handleArrayChange(e, "activities")}
                />
                <ul>
                {editedTrip?.activities?.map((activity, index) => (
                    <li key={index}>
                    {activity}
                    <button onClick={() => handleRemoveArrayItem(index, "activities")}>Remove</button>
                    </li>
                ))}
                </ul>
            </div>
            ) : (
            (trip.activities?.length || 0) > 0 ? trip.activities.join(", ") : "None"
            )}


          <p><strong>Ages:</strong></p>
          {isEditing ? (
            <div>
              <input
                type="number"
                placeholder="Add Age"
                onBlur={(e) => handleArrayChange(e, "ages")}
              />
              <ul>
                {editedTrip?.ages.map((age, index) => (
                  <li key={index}>
                    {age}
                    <button onClick={() => handleRemoveArrayItem(index, "ages")}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            trip.ages.length > 0 ? trip.ages.join(", ") : "None"
          )}

          <p><strong>Notes:</strong></p>
          {isEditing ? (
            <textarea
              name="notes"
              value={editedTrip?.notes || ""}
              onChange={handleChange}
              placeholder="Add notes"
            />
          ) : (
            trip.notes || "No notes"
          )}
        </div>

        {/* Edit and Save Section */}
        <div className="edit-actions">
          {!isEditing && (
            <button onClick={() => setIsEditing(true)}>Edit Trip</button>
          )}
          {isEditing && (
            <div className="edit-form">
              <label>
                Destination:
                <input
                  type="text"
                  name="destination"
                  value={editedTrip?.destination || ""}
                  onChange={handleChange}
                />
              </label>
              <label>
                Start Date:
                <input
                  type="date"
                  name="start_date"
                  value={editedTrip?.start_date || ""}
                  onChange={handleChange}
                />
              </label>
              <label>
                End Date:
                <input
                  type="date"
                  name="end_date"
                  value={editedTrip?.end_date || ""}
                  onChange={handleChange}
                />
              </label>
              <button onClick={editTrip}>Save Changes</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          )}
        </div>

        {/* Delete and Suggestion Section */}
        {!isEditing && (
          <div className="trip-actions">
            <button onClick={deleteTrip} className="delete-btn">Delete Trip</button>
            <button onClick={getSuggestion}>Get a Personalized Suggestion</button>
          </div>
        )}


        {/* Loading suggestion state */}
        {!isEditing && loadingSuggestion && (
        <div className="suggestion-box">
            <h3>Loading Your Vacation...</h3>
        </div>
        )}

        {/* Suggestion Display */}
        {!isEditing && suggestion && (
          <div className="suggestion-box">
            
            <h1>Your {suggestion.destination} trip suggestion:</h1>
            {suggestion.plans.map((plan, planIndex) => (
              <div key={planIndex} className="plan">
                <h2>Day {plan.dayNumber}</h2>
                <h3>{plan.theme}</h3>
                <ul>
                  {plan.schedule.map((item, index) => (
                    <li key={index}>
                      {item.imageURL && (
                        <img src={item.imageURL} alt={item.activity} />
                      )}
                      <div className="plan-info">
                      <h4>{item.activity}</h4>
                      <p>{item.details}</p>
                      <p>time:{item.time}</p>
                      </div>
                      
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Trip;
