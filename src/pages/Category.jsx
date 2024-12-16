import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Category = () => {
    const workoutCategories = useSelector(state => state.workout.workoutCategories)

    return (
        <>
            <div>Category</div>
            <div className="row">

                {workoutCategories && workoutCategories.length > 0 && workoutCategories.map(c => {
                    return (
                        <Link to={`/category-detail/${c.id}`}>
                            <div className='mt-1 mx-2 p-2' style={{ backgroundColor: 'GrayText', color: 'black', boxShadow: '2px black' }}>
                                {c.category}
                            </div>
                        </Link>
                    )
                })}
            </div>

        </>
    )
}

export default Category