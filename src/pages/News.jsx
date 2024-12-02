import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useSelector, useDispatch } from 'react-redux'
import Modal from '../components/Modal'
import NewsCard from '../components/NewsCard'
import { setFetchedNews, setInputText } from '../redux/newsSlice'  // Redux action'ını import ettik
import '../styles/News.css';

const News = () => {
    const { modal } = useSelector(state => state.modal)  // modal state'ini Redux'dan alıyoruz
    const dispatch = useDispatch()

    // news verisini Redux store'dan alıyoruz
    const news = useSelector(state => state.news.news)
    const filteredNews = useSelector(state => state.news.filteredNews)
    const inputText = useSelector(state => state.news.inputText)

    const [featuredNews, setFeaturedNews] = useState([])
    const [slideIndex, setSlideIndex] = useState(1)

    const [count, setCount] = useState(0);

    // State to hold the loading and error states
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // API çağrısı

        dispatch(setInputText(''));

        const fetchNews = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos') // API URL'nizi buraya koyun
                if (!response.ok) {
                    throw new Error('Veri çekme hatası!')
                }
                const data = await response.json()
                console.log("Data : ", data);

                dispatch(setFetchedNews(data))  // Redux'a veriyi set et
                setFeaturedNews(news.slice(0, 10))

            } catch (err) {
                setError(err.message)  // Hata durumunda error state'ini güncelle
            } finally {
                setLoading(false)  // Veri çekme işlemi tamamlandı
            }
        }

        fetchNews()
    }, [dispatch])  // [] bağımlılığı, sadece bileşen ilk render'da çalışmasını sağlar

    useEffect(() => {
        if (news.length > 0) {
            setFeaturedNews(news.slice(0, 10)); // Redux'tan gelen haberleri kullanarak featuredNews'u güncelle
        }
    }, [news]);  // `news` state'ine bağlı olarak çalışacak

    const nextSlide = () => {
        setSlideIndex((slideIndex + 1) % 5);
    }

    const prevSlide = () => {
        if ((slideIndex - 1) === 0) {
            console.log("Slide Index : ", slideIndex);
            setSlideIndex(5)
        }

        else {
            console.log("Slide Index : ", slideIndex);
            setSlideIndex(slideIndex - 1)
        }
    }

    return (
        <div>
            <Header />

            {modal && <Modal title={"Ürün Ekle"} />}

            {/* Yükleniyor durumu */}
            {loading && <p>Yükleniyor...</p>}

            {/* Hata durumu */}
            {error && <p style={{ color: 'red' }}>Hata: {error}</p>}

            <div className="d-flex" style={{ width: '100%', position: 'relative' }}>
                {news && news.length > 0 && featuredNews.filter((n, index) => index === slideIndex).map((item) => (
                    <div
                        className="card"
                        key={item.id}
                        style={{ flex: '0 0 100%', height: '150px', padding: '10px' }}>
                        <div style={{ width: '100%', height: '100%', backgroundColor: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px' }}>
                            <p>{item.title}</p>

                            <button onClick={prevSlide} style={{ cursor: 'pointer', position: 'absolute', left: '2%', top: '35%', fontSize: '30px' }}>&lt;</button>
                            <button onClick={nextSlide} style={{ cursor: 'pointer', position: 'absolute', right: '2%', top: '35%', fontSize: '30px' }}>&gt;</button>

                        </div>
                    </div>
                ))}
            </div>


                <p>Input Text : {inputText}</p>


            {inputText !== '' ? (
                filteredNews && filteredNews.length > 0 ? (
                    <div className="row mt-2">
                        {filteredNews.map(item => (
                            <div key={item.id} className="col-md-3 mb-4">
                                <NewsCard news={item} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No News Found</p>
                )
            ) : (
                <div className="row mt-2">
                    <p>All News</p>
                    {news.map(item => (
                        <div key={item.id} className="col-md-3 mb-4">
                            <NewsCard news={item} />
                        </div>
                    ))}
                </div>
            )}





        </div>
    )
}

export default News
