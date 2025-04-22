import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';

function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [openReplyId, setOpenReplyId] = useState(null);

    const cards = [1, 2, 3, 4, 5, 6, 7];
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleCount = 4;

    const getArticleDetail = async () => {
        try {
            console.log("detail for ID:", `https://localhost:7100/api/Blogs/blog/${id}`);
            const response = await fetch(`https://localhost:7100/api/Blogs/blog/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            var text = await response.text(); // Önce metni al
            console.log("Raw response text:", text); // Metni kontrol et
            
            // Önce status kontrolü yap
            if (!response.ok) {
                const text = await response.text(); // JSON olmayabilir
                console.log('Error response:', text);
                throw new Error(`HTTP ${response.status} - ${text}`);
            }
            console.log("Response status:", response);
            
            // const data = await response.json(); // Artık güvenli
            const data = JSON.parse(text); // JSON.parse ile metni JSON'a çevir
            console.log("Article Detail Data:", data);

            setBlog(data);
        } catch (error) {
            console.error('Error fetching article detail:', error);
        }
    };

    useEffect(() => {
        getArticleDetail();
    }, [id]);

    const next = () => {
        if (currentIndex < cards.length - visibleCount) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const comments = [
        { id: 1, name: "Ali Veli", comment: "Bu yazı çok bilgilendirici!" },
        { id: 2, name: "Ayşe Fatma", comment: "Gerçekten çok faydalı bilgiler var." },
    ];

    const toggleReplyForm = (id) => {
        setOpenReplyId(openReplyId === id ? null : id);
    };

    const getReadDuration = (text) => {
        const words = text.split(/\s+/).length;
        return `${Math.ceil(words / 200)} dk okuma süresi`;
    };

    // ✅ Sesli okuma fonksiyonu
    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'tr-TR';
            utterance.rate = 1;
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Tarayıcınız sesli okuma özelliğini desteklemiyor.");
        }
    };

    // useEffect(() => {
    //     const mockData = {
    //         1: {
    //             title: "Yapay Zeka ile Gelecek: 2025 ve Sonrası",
    //             date: "10 Nisan 2025",
    //             author: "Ayşe Yılmaz",
    //             image: "https://source.unsplash.com/800x400/?technology,ai",
    //             content: "Yapay zeka, 2025 yılında iş dünyasından günlük yaşama kadar birçok alanı dönüştürmeye devam ediyor. Yeni çıkan modeller ve uygulamalar, üretkenliği artırırken aynı zamanda etik tartışmaları da beraberinde getiriyor. Bu yazıda, AI teknolojisinin olası senaryolarına yakından bakıyoruz.",
    //             readDuration: "10"
    //         },
    //         2: {
    //             title: "Sağlıklı Yaşam İçin 5 Altın Kural",
    //             date: "8 Nisan 2025",
    //             author: "Mehmet Demir",
    //             image: "https://source.unsplash.com/800x400/?health,fitness",
    //             content: "Sağlıklı yaşamak için dengeli beslenmek, düzenli egzersiz yapmak, stresten uzak durmak ve uyku düzenine dikkat etmek oldukça önemlidir. Bu yazımızda bu konuları detaylıca inceliyoruz.",
    //             readDuration: "8"
    //         }
    //     };

    //     setBlog(mockData[id]);
    // }, [id]);

    if (!blog) return <p className="text-center mt-5">Yükleniyor...</p>;

    return (
        <>
            <Header />
            <div className="container mt-5 mb-5 ">
                <div>
                    <img src={blog.image} alt={blog.title} className="img-fluid rounded-4 mb-4" />
                    <h1 className="fw-bold">{blog.title}</h1>
                    <p className="text-muted">{blog.createdDate} | {blog.author} | {getReadDuration(blog.content)}</p>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>{blog.content}</p>

                    {/* ✅ Sesli okuma butonu */}
                    <button
                        className="btn btn-secondary mt-3"
                        onClick={() => speakText(`${blog.title}. ${blog.content}`)}
                    >
                        Sesli Oku
                    </button>
                </div>

                {/* Yorum Alanı */}
                <div className='comment-section mt-5'>
                    <h3 className="mb-4">Yorumlar</h3>

                    <form className="mb-5">
                        <textarea className="form-control mb-3" rows="4" placeholder="Yorumunuzu yazın..."></textarea>
                        <button type="submit" className="btn btn-primary">Yorum Yap</button>
                    </form>

                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-light p-4 rounded-4 shadow-sm mb-4">
                            <strong>{comment.name}</strong>
                            <p className="mt-2">{comment.comment}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <button className="btn btn-outline-secondary btn-sm me-2">Beğen</button>
                                    <button
                                        onClick={() => toggleReplyForm(comment.id)}
                                        className="btn btn-outline-secondary btn-sm"
                                    >
                                        {openReplyId === comment.id ? "Gizle" : "Cevapla"}
                                    </button>
                                </div>
                                <small className="text-muted">2 gün önce</small>
                            </div>

                            {openReplyId === comment.id && (
                                <form className="mt-3">
                                    <textarea
                                        className="form-control"
                                        rows="2"
                                        placeholder="Cevabınızı yazın..."
                                    ></textarea>
                                    <button type="submit" className="btn btn-primary mt-2">Gönder</button>
                                </form>
                            )}
                        </div>
                    ))}
                </div>

                {/* Related Posts  */}
                <div style={{ position: "relative", overflow: "hidden" }}>
                    <h3 className="mb-4">İlgili Yazılar</h3>
                    <div className="slider-container" style={{ display: "flex", alignItems: "center" }}>
                        {/* Sol Ok */}
                        <button style={{ position: 'absolute', left: '0%', top: '50%', zIndex: '100', background: 'white', fontSize: '24px', borderRadius: '8px' }} onClick={prev} disabled={currentIndex === 0}>
                            ◀
                        </button>
                        {/* Kartlar */}
                        <div
                            className="card-wrapper px-3"
                            style={{
                                display: "flex",
                                transition: "transform 0.3s ease",
                                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                                width: `${(cards.length * 100) / visibleCount}%`,
                            }}
                        >
                            {cards.map((item) => (
                                <div
                                    key={item}
                                    className=""
                                    style={{
                                        width: `${100 / cards.length}%`,
                                        padding: "0 10px",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <div className="card " style={{ width: "280px", height: "350px", borderRadius: "16px" }}>
                                        <img
                                            src="https://source.unsplash.com/200x200/?technology"
                                            className="card-img-top"
                                            alt="..."
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">İlgili Yazı Başlığı</h5>
                                            <p className="card-text">Kısa bir açıklama burada yer alacak.</p>
                                            <a href="#" className="btn btn-primary">
                                                Devamını Oku
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Sağ Ok */}
                    <button style={{ position: 'absolute', right: '0%', top: '50%', zIndex: '100', fontSize: '24px', borderRadius: '8px' }} onClick={next} disabled={currentIndex >= cards.length - visibleCount}>
                        ▶
                    </button>
                </div>

            </div>
        </>
    );
}

export default BlogDetail;
