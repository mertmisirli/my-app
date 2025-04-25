import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Link, useParams } from 'react-router-dom';
import Search from '../../components/Blog/Search';

function FilteredPage() {
    const { id } = useParams();
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getFilteredData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BLOG_API_URL}/Blogs/${id}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setFilteredData(data);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFilteredData();
    }, []);

    return (
        <>
            <Header />
            <div className="max-w-5xl mx-auto px-1 py-8">
                {loading ? (
                    <div className="text-center text-gray-600 text-lg">Yükleniyor...</div>
                ) :
                    filteredData.length === 0 ?
                        (
                            <>
                                <Search />
                                <div className="text-center text-gray-600 text-lg">Hiç veri bulunamadı.</div>

                            </>) :
                        (
                            <>
                                <Search />
                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                    {filteredData.map((item) => (
                                        <Link to={`/blog-detail/${item.slug}`} key={item.id}>
                                            <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition-shadow duration-300">
                                                <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h2>
                                                <p className="text-gray-700 whitespace-pre-line">{item.content}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </>
                        )
                }
            </div>

        </>
    );
}

export default FilteredPage;
