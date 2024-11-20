import React from 'react'

const NewsCard = ({ news }) => {
    

    const handleCheckboxChange = () => {

    }

    return (
        <div className="card" style={{minHeight:'250px', }}>
            <div className="card-body">
                <h5 className="card-title">Title: {news.title}</h5> {/* Başlık kısmı */}
                <p className="card-text"> {/* Checkbox'ı yerleştirdiğimiz alan */}
                    <input
                        type="checkbox"
                        checked={news.completed}
                        onChange={() => handleCheckboxChange(item.id)}
                        
                    />
                    <span>{news.completed ? ' Completed' : ' Not Completed'}</span>
                </p>
            </div>
        </div>
    )
}

export default NewsCard
