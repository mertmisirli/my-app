import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/News.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { getWorkoutBanners } from '../redux/workoutSlice';

const Home = () => {
    const dispatch = useDispatch();
    const workoutBanners = useSelector(state => state.workout.workoutBanners)
    const workoutCategories = useSelector(state => state.workout.workoutCategories)
    const plans = useSelector(state => state.plans.plans)
    const questions = useSelector(state => state.questions.questions)
    const workoutStatus = useSelector((state) => state.workout.status);


    const [slideIndex, setSlideIndex] = useState(0);

    const prevSlide = () => { setSlideIndex((prevIndex) => (prevIndex === 0 ? workoutBanners.length - 1 : prevIndex - 1)); };
    const nextSlide = () => { setSlideIndex((prevIndex) => (prevIndex === workoutBanners.length - 1 ? 0 : prevIndex + 1)); };

    useEffect(() => {
        if (workoutStatus === 'idle') {
            dispatch(getWorkoutBanners());
        }
    }, [dispatch, workoutStatus]);

    return (
        <div>
            <Header />

            {/* Banner */}
            <div className="d-flex " style={{ width: '100%', position: 'relative' }}>
                {workoutBanners && workoutBanners.length > 0 && workoutBanners.filter((_, index) => index === slideIndex).map((item) => (
                    <div className="card" key={item} style={{ flex: '0 0 100%', height: '290px', padding: '10px' }}>
                        <div style={{ width: '100%', height: '100%', backgroundColor: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px' }}>
                            <p>{item}</p>
                            <button onClick={prevSlide} style={{ cursor: 'pointer', position: 'absolute', left: '2%', top: '35%', fontSize: '30px' }}>&lt;</button>
                            <button onClick={nextSlide} style={{ cursor: 'pointer', position: 'absolute', right: '2%', top: '35%', fontSize: '30px' }}>&gt;</button>
                        </div>
                    </div>))}
            </div>


            {/* Categories */}
            <div className="row mt-2">
                <div className="d-flex justify-content-between mx-2 flex-wrap">
                    {workoutCategories && workoutCategories.length > 0 && workoutCategories.map(c => {
                        return (
                            <Link to={`/category-detail/${c.name}`} key={c.name} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <div className="card workout-card" style={{ height: '150px', width: '100%' }}>
                                    <p className="text-center" style={{ position: 'absolute', bottom: '8%', left: '30%' }}>
                                        {c.name}
                                    </p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>


            {/* Workout Plans */}
            <div style={{ padding: '20px', marginTop: '50px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#333', textAlign: 'center', marginBottom: '30px' }}>
                    Workout Plans
                </h2>
                <div className="row">
                    {plans && plans.map((p) => (
                        <div className="col-md-4 col-sm-6 mb-4" key={p.id}>
                            <div
                                style={{
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    padding: '20px',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                                }}
                            >
                                <div style={{ padding: '20px' }}>
                                    <h5 style={{ fontSize: '1.2rem', fontWeight: 500, color: '#333', marginBottom: '10px' }}>
                                        {p.name}
                                    </h5>
                                    <p style={{ fontSize: '1rem', color: '#555', marginBottom: '15px' }}>
                                        {p.description}
                                    </p>
                                    <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '20px' }}>
                                        Plan ID: {p.id}
                                    </p>
                                    <button
                                        style={{
                                            backgroundColor: '#007bff',
                                            border: 'none',
                                            padding: '8px 16px',
                                            fontSize: '1rem',
                                            borderRadius: '5px',
                                            color: 'white',
                                            cursor: 'pointer'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                                    >
                                        View Plan
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tips & Questions */}
            <div className='mx-4' style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', marginTop: '20px' }}>
                <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
                    Tips & Questions
                </h2>

                {questions && questions.map((q) => {
                    return (
                        <div key={q.id} style={{ backgroundColor: '#fff', borderRadius: '8px', marginBottom: '15px', padding: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                                {q.questionText}
                            </p>
                            <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.6' }}>
                                {q.answer}
                            </p>
                        </div>
                    );
                })}
            </div>



            {/*  */}
            <div className='d-flex' style={{ marginTop: '150px' }}>
                <p className='text-center mx-auto mb-5' style={{ fontSize: '25px' }}>Text</p>
            </div>


            <Footer />

        </div>
    )
}

export default Home
