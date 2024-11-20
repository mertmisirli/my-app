import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import Modal from '../components/Modal'
import NewsCard from '../components/NewsCard'

const News = () => {
    const { modal } = useSelector(state => state.modal)

    // State to hold the fetched data
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // API çağrısı
        const fetchNews = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos') // API URL'nizi buraya koyun
                if (!response.ok) {
                    throw new Error('Veri çekme hatası!')
                }
                const data = await response.json()
                console.log("Data : ", data);

                setNews(data)  // Veriyi state'e set et
            } catch (err) {
                setError(err.message) // Hata durumunda error state'ini güncelle
            } finally {
                setLoading(false)  // Veri çekme işlemi tamamlandı
            }
        }

        fetchNews()
    }, [])  // [] bağımlılığı, sadece bileşen ilk render'da çalışmasını sağlar

    return (
        <div>
            <Header />

            {modal && <Modal title={"Ürün Ekle"} />}

            {/* Yükleniyor durumu */}
            {loading && <p>Yükleniyor...</p>}

            {/* Hata durumu */}
            {error && <p style={{ color: 'red' }}>Hata: {error}</p>}

            {/* Veri başarıyla geldiğinde göstermek */}
            <div className="row">
                {news && news.length > 0 ? (
                    news.map(item => (
                        <div key={item.id} className="col-md-3 mb-4"> 
                            <NewsCard news={item} />
                        </div>
                    ))
                ) : (
                    <p>Haber bulunamadı</p>
                )}
            </div>
        </div>
    )
}

export default News
