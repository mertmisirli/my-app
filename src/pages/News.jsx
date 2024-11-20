import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useSelector, useDispatch } from 'react-redux'
import Modal from '../components/Modal'
import NewsCard from '../components/NewsCard'
import { setFetchedNews } from '../redux/newsSlice'  // Redux action'ını import ettik

const News = () => {
    const { modal } = useSelector(state => state.modal)  // modal state'ini Redux'dan alıyoruz
    const dispatch = useDispatch()
    
    // news verisini Redux store'dan alıyoruz
    const news = useSelector(state => state.news.news) 

    // State to hold the loading and error states
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

                dispatch(setFetchedNews(data))  // Redux'a veriyi set et

            } catch (err) {
                setError(err.message)  // Hata durumunda error state'ini güncelle
            } finally {
                setLoading(false)  // Veri çekme işlemi tamamlandı
            }
        }

        fetchNews()
    }, [dispatch])  // [] bağımlılığı, sadece bileşen ilk render'da çalışmasını sağlar

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
