import React, { useEffect, useState } from 'react'
import { Link, Route, useParams } from 'react-router-dom'
import Header from '../../components/Header'

// Örnek blog içerikleri
const allPosts = [
    { id: 1, title: 'React Nedir?', category: 'yazilim' },
    { id: 1, title: 'React Nedir?', category: 'yazilim' },
    { id: 1, title: 'React Nedir?', category: 'yazilim' },
    { id: 1, title: 'React Nedir?', category: 'yazilim' },
    { id: 2, title: 'Yeni Teknolojiler', category: 'teknoloji' },
    { id: 3, title: 'CSS ile Tasarım', category: 'tasarim' },
    { id: 4, title: 'Spor ve Sağlık', category: 'saglik' },
    { id: 5, title: 'JavaScript Güncellemeleri', category: 'yazilim' },
    { id: 6, title: 'Ekonomi 2025 Tahminleri', category: 'ekonomi' },
]

function Topic() {
    const { id } = useParams()
    const [filteredPosts, setFilteredPosts] = useState([])

    const getTopicArticles = async () => {
        try {
            const response = await fetch(`https://localhost:7100/api/Blogs/topic/${id}`)
            const data = await response.json()
            setFilteredPosts(data)
        } catch (error) {
            console.error('Error fetching articles:', error)
        }
    }
    useEffect(() => {
        // id burada kategori key'idir (örn. yazilim, ekonomi, vs.)
        // const result = allPosts.filter((post) => post.category === id)
        // setFilteredPosts(result)
        getTopicArticles();
    }, [id])

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4 capitalize">Kategori: {id}</h1>

                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredPosts.map((post) => (
                            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                                <p className="text-gray-600">{post.content}</p>
                                <Link to={`/blog-detail/${post.slug}`}><button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Devamını Oku</button></Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">Bu kategoriye ait içerik bulunamadı.</p>
                )}
            </div>
        </>
    )
}

export default Topic
