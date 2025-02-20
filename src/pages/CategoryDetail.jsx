import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../styles/CategoryDetail.css'; // Import a CSS file for styling
import Header from '../components/Header';
import Footer from '../components/Footer';

const CategoryDetail = () => {
    const { id } = useParams();
    const workoutCategories = useSelector(state => state.workout.workoutCategories);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [exercises, setExercises] = useState([]); // State to hold exercises data
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    const dispatch = useDispatch();

    // useEffect to get selected category based on the name
    useEffect(() => {
        const category = workoutCategories.find(category => category.id === parseInt(id));
        setSelectedCategory(category);

        const fetchExercises = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('https://localhost:7048/api/Workout/GetExercises', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        bodyPartParam: id,
                        limit: 10,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch exercises');
                }

                const data = await response.json();
                console.log("Data : ", data);

                setExercises(data); // Set the exercises data to state
            } catch (err) {
                setError(err.message); // Set error state if there's an issue
            } finally {
                setLoading(false);
            }
        };

        fetchExercises(); // Fetch exercises based on the category name
    }, [id, workoutCategories]); // Depend on id and workoutCategories

    return (
        <>
            <Header />

            <div className="category-detail-container">
                <div className="category-detail-header">
                    <h1>Category Detail</h1>
                </div>
                <div className="category-detail-content">
                    {selectedCategory ? (
                        <>
                            <div className="category-info">
                                <p><strong>Selected Category:</strong> {selectedCategory.name}</p>
                                <p><strong>Description:</strong> {selectedCategory.description || "No description available."}</p>
                            </div>

                            <div className="category-image">
                                <img src={selectedCategory.image || "default-image.jpg"} alt={selectedCategory.name} />
                            </div>

                            <div className="related-workouts">
                                <h2>Related Workouts</h2>
                                <ul>
                                    {selectedCategory.workouts && selectedCategory.workouts.length > 0 ?
                                        selectedCategory.workouts.map((workout, index) => (
                                            <li key={index}>{workout}</li>
                                        )) :
                                        <li>No workouts available.</li>
                                    }
                                </ul>
                            </div>
                        </>
                    ) : (
                        <p>Category not found</p>
                    )}

                    {/* Exercises Section */}
                    <div className="exercise-list">
                        <h2>Exercises for {id}</h2>
                        {loading && <div className="loading-spinner">Loading...</div>}
                        {error && <p className="error-message">{error}</p>}
                        <ul>
                            {exercises.length === 0 && !loading ? (
                                <li>No exercises available for this category.</li>
                            ) : (
                                exercises.map((exercise, index) => (
                                    <>
                                        <li key={index}>{exercise.name || 'Unnamed Exercise'}</li>
                                        <img src={exercise.gifUrl} alt="Animated GIF" />

                                        {exercise.instructions.map((instruction, i) => (
                                            <>
                                                <li key={i}>{instruction.order +1} {instruction.detail || 'Unnamed Exercise'}</li>
                                            </>
                                        ))}
                                    </>
                                ))
                            )}
                        </ul>
                        
                    </div>

                    <div className="navigation-links">
                        <a href="/">Back to Categories</a>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default CategoryDetail;
