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
    const [totalExerciseCount, setTotalExerciseCount] = useState(0);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const category = workoutCategories.find(category => category.id === parseInt(id));
    //     setSelectedCategory(category);
    // }, [id, workoutCategories]); // Depend on id and workoutCategories

    // Function to fetch exercises with pagination
    const fetchExercises = async () => {
        setLoading(true);
        setError(null);
        console.log("Çalıştı : ", id, " ", limit, " ", offset);


        try {
            const offset = (currentPage - 1) * limit; // Calculate the offset based on current page
            const response = await fetch('https://localhost:7048/api/Workout/GetExercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bodyPartParam: id,
                    limit: limit,
                    offset: offset, // Pass offset to API
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch exercises');
            }

            const data = await response.json();
            setExercises(data.exercises); // Set the exercises data to state
            setTotalExerciseCount(data.count); // Assuming the API returns totalCount of exercises
        } catch (err) {
            setError(err.message); // Set error state if there's an issue
        } finally {
            setLoading(false);
        }
    };

    // Fetch exercises whenever currentPage or id changes
    useEffect(() => {
        window.scrollTo(0, 200); // Sayfanın üst kısmına biraz daha aşağı kaydırma (100px)
        fetchExercises();
    }, [currentPage, id]); // Depend on currentPage and id

    const handleNextPage = () => {
        if ((currentPage - 1) * limit + exercises.length < totalExerciseCount) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const addToList = async (exerciseId) => {
        const response = await fetch('https://localhost:7007/api/Users/FavouriteExercise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail: localStorage.getItem('email'),
                exerciseId: exerciseId
            }),
        });

        if (!response.ok) 
            throw new Error('Failed to fetch exercises');

        const data = await response.json();
        console.log("Add Favourite : ", data);
    }

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
                    <div className="container py-4 exercise-list">
                        <h2 className="text-center mb-4">Exercises for {id}</h2>
                        {loading && <div className="text-center text-warning">Loading...</div>}
                        {error && <p className="text-center text-danger">{error}</p>}
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {exercises.length === 0 && !loading ? (
                                <div className="col-12">
                                    <div className="alert alert-info text-center" role="alert">
                                        No exercises available for this category.
                                    </div>
                                </div>
                            ) : (
                                exercises.map((exercise, index) => (
                                    <div className="col" key={index}>
                                        <div className="card h-100" style={{ position: 'relative' }}>
                                            <p onClick={() => addToList(exercise.id)} style={{ position: 'absolute', top: '3px', right: '15px', color: 'orange', fontSize: '35px', cursor: 'pointer' }}>
                                                &hearts;</p>
                                            <img src={exercise.gifUrl} alt="Animated Exercise" className="card-img-top" />
                                            <div className="card-body" >
                                                <h5 className="card-title">{exercise.name || 'Unnamed Exercise'}</h5>
                                                <ul className="list-group list-group-flush">
                                                    {exercise.instructions.map((instruction, i) => (
                                                        <li key={i} className="list-group-item">
                                                            <strong>{instruction.order + 1})</strong> {instruction.detail || 'Unnamed Exercise'}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>


                        {/* Pagination Controls */}
                        <div className="pagination-controls text-center mt-4">
                            <button
                                className="btn btn-secondary"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>

                            {/* Page Buttons */}
                            {Array.from({ length: Math.ceil(totalExerciseCount / limit) })
                                .map((_, index) => {
                                    const pageNumber = index + 1;

                                    // Show only current page and the 2 pages before and after
                                    if (
                                        pageNumber >= currentPage - 2 &&
                                        pageNumber <= currentPage + 2 &&
                                        pageNumber > 0 &&
                                        pageNumber <= Math.ceil(totalExerciseCount / limit)
                                    ) {
                                        return (
                                            <button
                                                key={pageNumber}
                                                className={`btn btn-secondary mx-1 ${currentPage === pageNumber ? 'active' : ''}`}
                                                onClick={() => setCurrentPage(pageNumber)}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    }
                                    return null; // Skip pages that are not within the range
                                })
                            }

                            <button
                                className="btn btn-secondary"
                                onClick={handleNextPage}
                                disabled={currentPage === Math.ceil(totalExerciseCount / limit)}
                            >
                                Next
                            </button>
                        </div>


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
