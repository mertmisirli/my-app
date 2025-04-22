import React, { useEffect, useState } from 'react'

function Topics() {
    const [showAddTopic, setShowAddTopic] = React.useState(false);
    const [topics, setTopics] = React.useState([]);
    const [openOptionsId, setOpenOptionsId] = useState(null);

    const handleShowTopic = () => {
        setShowAddTopic(!showAddTopic);
    }

    const fetchTopics = async () => {
        try {
            const response = await fetch('https://localhost:7100/api/Topics', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Veri alınamadı!');
            }
            const data = await response.json(); // Burada JSON verisini alıyoruz
            console.log('Topics:', data); // Burada state'e set edebilirsin
            setTopics(data); // State'e veri set etme işlemi

        } catch (error) {
            console.error('Error fetching topics:', error);
        }
    };

    const toggleOptionsForm = (id) => {
        setOpenOptionsId(openOptionsId === id ? null : id);
    };

    const deleteTopic = async (id) => {
        try {
            const response = await fetch(`https://localhost:7100/api/Topics/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Veri silinemedi!');
            }
            fetchTopics(); // Silme işlemi sonrası güncelle
            setOpenOptionsId(null); // Seçenekleri kapat
            console.log('Veri silindi:', response);
        }
        catch (error) {
            console.error('Hata:', error);
        }
    }

    const saveTopic = async () => {
        const topicName = document.querySelector('input[name="topicName"]').value;
        console.log(topicName);

        fetch('https://localhost:7100/api/Topics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": topicName,
                "articles": [],
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Veri gönderilemedi!');
                }
                console.log('Veri gönderildi:', response);

                setShowAddTopic(false); // Modalı kapat
                // Burada state'i güncelleyebilirsin
                // Örneğin, yeni topic'i state'e ekleyebilirsin
                fetchTopics(); // Yeni topic'i ekledikten sonra güncelle
            })
            .catch((error) => {
                console.error('Hata:', error);
            });
        // const topicDescription = document.querySelector('input[name="topicDescription"]').value;
    }

    useEffect(() => {
        fetchTopics();

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setShowAddTopic(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            <div className="container" style={{ position: 'relative' }}>
                <div className="row p-3 align-items-center justify-content-between mb-3 rounded" style={{ backgroundColor: 'grey' }}>
                    <div className="col-auto">
                        <h4 className="mb-0">Topics</h4>
                    </div>
                    <div className="col-auto">
                        <button onClick={handleShowTopic} className="btn btn-light">Add</button>
                    </div>
                </div>

                <div className="row">
                    {topics.length > 0 ? (
                        topics.map((topic) => (
                            <div className="col-md-4 p-2" key={topic.id} >
                                <div className="card mb-4 shadow-sm text-black" style={{ position: 'relative' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{topic.name}</h5>
                                        <p className="card-text">{topic.description}</p>
                                        <p className="card-text">Created At: {new Date(topic.createdDate).toLocaleDateString()}</p>
                                        <p className="card-text">Updated At: {new Date(topic.updatedDate).toLocaleDateString()}</p>
                                    </div>

                                    {openOptionsId === topic.id && (
                                        <div className='card' style={{ position: 'absolute', top: '12%', right: '8%', backgroundColor: 'white', borderRadius: '16px', padding: '10px', width: '80px' }}>
                                            <div className="action-menu" style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                                <button className="btn btn-primary btn-sm">Edit</button>
                                                <button onClick={() => deleteTopic(topic.id)} className="btn btn-danger btn-sm">Delete</button>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        className='p-2'
                                        onClick={() => toggleOptionsForm(topic.id)}
                                        style={{ position: 'absolute', top: '2%', right: '2%', fontSize: '15px', cursor: 'pointer' }}>:</button>
                                </div>

                            </div>


                        ))
                    ) : (

                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
                            <div className="col-md-4 p-2" key={item} >
                                <div className="card mb-4 shadow-sm text-black" style={{ position: 'relative' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Topic Title</h5>
                                        <p className="card-text">Short description of the topic.</p>
                                    </div>
                                </div>
                            </div>
                        )
                        ))}
                </div>

                {/* Modal */}
                {showAddTopic && (
                    <>
                        {/* Arka Planı Bulanıklaştırma */}
                        <div
                            className="backdrop"
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                backdropFilter: 'blur(1px)', // Burada arka plan bulanıklaştırılıyor
                                zIndex: 999, // Modalin üstünde olmalı
                            }}
                        ></div>

                        {/* Modal */}
                        <div className="d-flex justify-content-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
                            <div className="card text-dark mt-3" style={{ width: '20rem' }}>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="card-title mb-0">Add Topic</h5>
                                        <button
                                            onClick={() => setShowAddTopic(false)}
                                            style={{
                                                fontSize: '18px',
                                                color: '#fff',
                                                backgroundColor: '#dc3545', // Kırmızı buton rengi
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '30px',
                                                height: '30px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                            }}
                                            aria-label="Close"
                                        >
                                            <span style={{ fontSize: '20px', color: '#fff' }}>×</span> {/* X işareti */}
                                        </button>
                                    </div>
                                    <input name='topicName' type="text" className="form-control mb-2" placeholder="Topic Title" />
                                    <div className="d-flex justify-content-center">
                                        <button onClick={saveTopic} className="btn btn-success">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </div>



        </>
    )
}

export default Topics
