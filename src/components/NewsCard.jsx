import React from 'react'
import { useDispatch } from "react-redux";
import { updateCompleted } from '../redux/newsSlice';

const NewsCard = ({ news }) => {
    const dispatch = useDispatch()

    const handleCheckboxChange = () => {
        dispatch(updateCompleted({ id: news.id }));  // news.id'yi nesne olarak gönderiyoruz
    }

    return (
        <div className="card" style={{ minHeight: '250px', }}>
            <div className="card-body">
                <h5 className="card-title">Title: {news.title}</h5> {/* Başlık kısmı */}
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
    )
}

export default NewsCard
