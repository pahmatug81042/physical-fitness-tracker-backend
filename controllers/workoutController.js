import React, { useEffect, useState } from "react";
import { getWorkouts } from "../services/workoutService";

/**
 * WorkoutList component
 * Renders the user's workouts and their exercises.
 * Accepts an optional refreshKey prop to re-fetch workouts when something changes (e.g., new workout added).
 */
export default function WorkoutList({ refreshKey = 0 }) {
  const [workouts, setWorkouts] = useState([]);

  const loadWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error("Failed to load workouts:", error);
    }
  };

  useEffect(() => {
    loadWorkouts();
  }, [refreshKey]); // Re-fetch workouts whenever refreshKey changes

  if (!workouts || workouts.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Your Workouts</h2>
        <p>No workouts yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Workouts</h2>
      {workouts.map((workout) => (
        <div
          key={workout._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>{workout.title}</h3>
          <p>
            Date:{" "}
            {workout.date
              ? new Date(workout.date).toLocaleDateString()
              : "No date set"}
          </p>
          <div>
            {workout.exercises && workout.exercises.length > 0 ? (
              workout.exercises.map((ex, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 6,
                    borderBottom: "1px solid #eee",
                    fontSize: 14,
                  }}
                >
                  <strong>{ex.exercise?.name || "Unnamed Exercise"}</strong> |{" "}
                  Sets: {ex.sets ?? 0} | Reps: {ex.reps ?? 0} | Duration:{" "}
                  {ex.duration ?? 0} min
                </div>
              ))
            ) : (
              <p style={{ fontStyle: "italic", fontSize: 14 }}>
                No exercises added yet.
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}