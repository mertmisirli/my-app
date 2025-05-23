import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../components/Blog/Search';
import { fetchArticles } from '../../redux/articleSlice';
import { fetchTopics } from '../../redux/categorySlice';

function Blog() {
    const sliderRef = useRef(null)
    //const [topics, setTopics] = useState([]); // State for topics
    //const [articles, setArticles] = useState([]); // State for articles
    // const topics = useSelector((state) => state.topic.topics);
    const [size, setSize] = useState(15);
    const [page, setPage] = useState(1);
    const [blogFrom, setBlogFrom] = useState(0);

    const dispatch = useDispatch();

    const { articles, count, loading, error } = useSelector((state) => state.article);
    const { topics, articlesByTopic } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchArticles({ page: page, size: size }));
    }, [dispatch, page]);

    useEffect(() => {
        dispatch(fetchTopics());
    }, [dispatch])

    const scrollLeft = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
            if (scrollLeft <= 0) {
                sliderRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' })
            } else {
                sliderRef.current.scrollBy({ left: -clientWidth, behavior: 'smooth' })
            }
        }
    }

    const scrollRight = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
            const maxScrollLeft = scrollWidth - clientWidth

            if (scrollLeft >= maxScrollLeft - 5) {
                sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' })
            } else {
                sliderRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' })
            }
        }
    }

    setInterval(() => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
            const maxScrollLeft = scrollWidth - clientWidth

            if (scrollLeft >= maxScrollLeft - 5) {
                sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' })
            } else {
                sliderRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' })
            }
        }
    }
        , 5000); // 5 saniyede bir kaydırma işlemi

    return (
        <>
            <Header />
            <div className="bg-gray-100 min-h-screen py-10">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-600 mb-4 px-5">
                    <Link to="/" className="text-blue-600 hover:underline">Ana Sayfa</Link> / <span>Blog</span>
                </div>

                <Search />

                <div style={{ position: 'relative' }}>
                    <div
                        ref={sliderRef}
                        className="w-full overflow-hidden snap-x snap-mandatory scroll-smooth"
                    >
                        <div className="flex w-full">
                            {articles.slice(0, 9).map((item) => (
                                <div
                                    key={item.id}
                                    className="w-full flex-shrink-0 snap-center px-1"
                                    style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
                                    <Link to={`/blog-detail/${item.slug}`} className="w-full h-full flex items-center justify-center">
                                        <div className="bg-white rounded-xl shadow-md p-3 mx-auto overflow-x-hidden"
                                            style={{ width: '90%', height: '245px' }}>
                                            <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                                            <p className="text-gray-600">
                                                {item.content.length > 800 ? `${item.content.substring(0, 800)}...` : item.content}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <button
                            style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }}
                            onClick={scrollLeft}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-200"
                        >
                            ◀
                        </button>
                        <button
                            style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
                            onClick={scrollRight}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-200"
                        >
                            ▶
                        </button>
                    </div>
                </div>

                {/* Google Ads Alanı */}
                <div className="my-6 text-center">
                    <div className="bg-gray-200 p-4 rounded-lg">
                        <p className="text-gray-600">Google Ads Alanı</p>
                    </div>
                </div>

                <div className="mx-5">
                    <div className="row">
                        <div className="col-md-2" >
                            <p className='mb-2'>Topics</p>
                            <div style={{ height: '550px', overflowY: 'auto' }}>
                                {topics.map((topic, index) => (
                                    <Link to={`/topic/${topic.name}`} key={index} className="block mb-2">
                                        <div key={index} className="bg-gray-200 p-2 rounded-lg mb-2">
                                            {topic.name}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {/* Popüler Yazılar */}
                            <div className="bg-white p-4 rounded-xl shadow-md mt-6">
                                <h3 className="font-bold text-lg mb-3">Popüler Yazılar</h3>
                                <ul className="text-sm text-gray-700 space-y-2">
                                    <li><Link to="/blog-detail/1" className="hover:underline">Yapay Zeka ve 2025</Link></li>
                                    <li><Link to="/blog-detail/2" className="hover:underline">Sağlıklı Yaşamın Sırları</Link></li>
                                    <li><Link to="/blog-detail/3" className="hover:underline">Geleceğin Meslekleri</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <div className="container mx-auto px-4 mt-3">
                                <h1 className="text-3xl font-bold text-center mb-8">Blog</h1>

                                <p>{count} Adet bulundu.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {articles.slice(0).map((item) => (
                                        <div
                                            key={item}
                                            className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-lg"
                                        >
                                            <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                                                Görsel Alanı
                                            </div>
                                            <div className="p-5">
                                                <p className="text-gray-400 text-sm mb-2">10 Nisan 2025</p>
                                                <h2 className="text-xl font-semibold mb-2">Blog Başlığı {item.title}</h2>
                                                <p className="text-gray-600 text-sm mb-2">
                                                    {item.content.length > 250 ? `${item.content.substring(0, 250)}...` : item.content}
                                                </p>
                                                <div className="flex flex-wrap gap-2 mt-2 mb-4">
                                                    {item.topicNames.map((tag, index) => (
                                                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                    {/* <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">#Teknoloji</span> */}
                                                    {/* <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">#YapayZeka</span> */}
                                                </div>

                                                <Link to={`/blog-detail/${item.slug}`}>
                                                    <button className="text-blue-600 hover:underline text-sm">
                                                        Devamını oku →
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="row navigation">
                                    <div className="d-flex justify-content-center">
                                        <p className="mx-2" style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setPage(page - 1)
                                                setBlogFrom(blogFrom - size)
                                                console.log("From ", blogFrom , size)
                                            }}>Before</p>
                                        <p className="mx-2">{page}</p>
                                        <p className="mx-2" style={{ cursor: 'pointer' }} onClick={() => {
                                            setPage(page + 1)
                                            setBlogFrom(blogFrom + size)
                                            console.log("From ", blogFrom , size)
                                        }}>After</p>
                                    </div>
                                </div>
                            </div>

                            {/* İlgili Yazılar */}
                            {/* <div className="mt-8 container mx-auto px-4">
                                <h2 className="text-2xl font-bold text-center mb-6">İlgili Yazılar</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[1, 2, 3].map((item) => (
                                        <div
                                            key={item}
                                            className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-lg"
                                        >
                                            <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                                                Görsel Alanı
                                            </div>
                                            <div className="p-5">
                                                <h2 className="text-xl font-semibold mb-2">İlgili Yazı Başlığı {item}</h2>
                                                <button className="text-blue-600 hover:underline text-sm">
                                                    Devamını oku →
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* Yukarı Çık Butonu */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700"
                >
                    ↑
                </button>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-6 mt-8">
                    <div className="container mx-auto text-center">
                        <p>&copy; 2025 Blog Sayfası. Tüm Hakları Saklıdır.</p>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Blog
