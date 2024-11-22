import React from 'react'
import { useDispatch } from "react-redux";
import { updateCompleted } from '../redux/newsSlice';
import { Outlet, Link } from "react-router-dom";

const NewsCard = ({ news }) => {
    const dispatch = useDispatch()

    const handleCheckboxChange = () => {
        dispatch(updateCompleted({ id: news.id }));  // news.id'yi nesne olarak gönderiyoruz
    }



    return (
        <>

            <div className="card" style={{ minHeight: '250px', }}>
                <div className="card-body">
                    <Link to={`/news-detail/${news.id}`}>
                        <h5 className="card-title">Title: {news.title}</h5> {/* Başlık kısmı */}
                    </Link >

                    <p className="card-text"> {/* Checkbox'ı yerleştirdiğimiz alan */}
                        <input
                            type="checkbox"
                            checked={news.completed}
                            onChange={handleCheckboxChange}  // Checkbox'ı değiştirirken dispatch et
                        />
                        <span>{news.completed ? ' Completed' : ' Not Completed'}</span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default NewsCard
