import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../styles/CategoryDetail.css'; // Import a CSS file for styling
import Header from '../components/Header';
import Footer from '../components/Footer';

const CategoryDetail = () => {
    const { id } = useParams();
    const workoutCategories = useSelector(state => state.workout.workoutCategories);

    const [selectedCategory, setSelectedCategory] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const category = workoutCategories.find(c => c.id === parseInt(id));
        if (category) {
            setSelectedCategory(category);
        }
    }, [id, workoutCategories]);

    return (
        <>
            <Header />

            <div className="category-detail-container">
                <div className="category-detail-header">
                    <h1>Category Detail</h1>
                </div>
                <div className="category-detail-content">
                    <p><strong>ID:</strong> {id}</p>
                    <p><strong>Selected Category:</strong> {selectedCategory.category}</p>
                    <p><strong>Description:</strong> {selectedCategory.description || "No description available."}</p>
                    <div className="category-image">
                        <img src={selectedCategory.image || "default-image.jpg"} alt={selectedCategory.category} />
                    </div>
                    <div className="related-workouts">
                        <h2>Related Workouts</h2>
                        <ul>
                            {selectedCategory.workouts ? selectedCategory.workouts.map((workout, index) => (
                                <li key={index}>{workout}</li>
                            )) : <li>No workouts available.</li>}
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
