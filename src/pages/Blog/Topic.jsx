import React, { useEffect, useState } from 'react'
import { Link, Route, useParams } from 'react-router-dom'
import Header from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getArticlesByTopic } from '../../redux/categorySlice'

function Topic() {
    const { id } = useParams()
    const [filteredPosts, setFilteredPosts] = useState([])

    const dispatch = useDispatch();

    const { topics, loading, error } = useSelector((state) => state.category);

    useEffect(() => {
        const fetchTopicArticles = async () => {
            try {
                const resultAction = await dispatch(getArticlesByTopic({ id }));

                console.log("Result ", resultAction);
                
                if (getArticlesByTopic.fulfilled.match(resultAction)) {
                    console.log("Başarılı");
                    setFilteredPosts(resultAction.payload); // payload -> gelen veridir
                  } else {
                    console.error('Topic articles yüklenemedi.');
                  }
                // Eğer başarılı ise:

            }
            catch (error) {
                console.error('Hata:', error);
            }
        };

        fetchTopicArticles();
    }, [dispatch, id]);

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
