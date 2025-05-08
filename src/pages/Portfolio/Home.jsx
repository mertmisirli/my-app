import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
// import '../styles/News.css';
import { Link, Route } from 'react-router-dom';
import Footer from '../../components/Footer';
import { getWorkoutBanners } from '../../redux/workoutSlice';
import { useTranslation } from 'react-i18next';
import jsPDF from "jspdf";
import WheelOfFortune from '../../components/Other/WheelOfFortune';

const Home = () => {
    const dispatch = useDispatch();
    const workoutBanners = useSelector(state => state.workout.workoutBanners)
    const workoutCategories = useSelector(state => state.workout.workoutCategories)
    const plans = useSelector(state => state.plans.plans)
    const questions = useSelector(state => state.questions.questions)
    const workoutStatus = useSelector((state) => state.workout.status);
    const [projects, setProjects] = useState([]);

    const [workExperiences, setWorkExperiences] = useState([
        {
            company: 'Dorak Holding',
            position: 'Software Engineer',
            duration: '11.2024 – 03.2025',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCdl9H_O_Y4k28qD9PAcnKhgPe9yNBUCXXkA&s',
            description: [
                { id: 1, text: 'ERP dokümantasyonu ve UML diyagramları geliştirildi' },
                { id: 2, text: 'Hazırlık kontrolleri ve performans testleri gerçekleştirildi' },
                { id: 3, text: 'Test sonuçları ve geri bildirimlere dayalı iyileştirmeler uygulandı' },
                { id: 4, text: 'ERP iş ihtiyaçlarını karşılamak için son kullanıcı testleri yapıldı' },
                { id: 5, text: 'Geliştirme ve test standartlarına uygun teslimat sağlandı' }
            ]
        },
        {
            company: 'Favori Kuyumculuk',
            position: 'Software Engineer',
            duration: '05.2022 - 03.2024',
            imageUrl: 'https://www.logovector.org/wp-content/uploads/logos/png/f/favori_logo.png',
            description: [
                { id: 1, text: 'İş süreçleri analiz edilerek organizasyonel verimlilik artırıldı' },
                { id: 2, text: 'Projeler, Agile metodolojisi ile etkin bir şekilde yönetildi' },
                { id: 3, text: 'Müşteri gereksinimleri toplanarak fonksiyonel spesifikasyonlar oluşturuldu' },
                { id: 4, text: 'Geliştirme ekipleriyle API entegrasyonları ve veri akışlarında iş birliği yapıldı' },
                { id: 5, text: 'İş süreçleri otomatikleştirilerek sistem verimliliği artırıldı' },
                { id: 6, text: 'SQL kullanılarak satış, stok ve kullanıcı verileri analiz edilerek raporlandı' }
            ]
        },
        {
            company: 'Yurtiçi Kargo',
            position: 'Software Engineer',
            duration: '06.2023 - 08.2023',
            imageUrl: 'https://documentserver.infinityyazilim.com/Documents/Logo/30032020090831.png',
            description: [
                { id: 1, text: 'Muhasebe işlem web sitesi geliştirildi' },
                { id: 2, text: 'Frontend geliştirme için Vue.js framework\'ü ve Bootstrap 5 kullanıldı' },
                { id: 3, text: 'Kimlik doğrulama işlemleri için Firebase entegrasyonu sağlandı' },
                { id: 4, text: 'Veri kaydı ve yayınlama işlemleri Postgresql ve Docker kullanarak uygulandı' }
            ]
        },
        {
            company: 'YetGen',
            position: 'Stajyer',
            duration: '02.2022 - 05.2022',
            imageUrl: 'https://egitim.yetkingencler.com/pluginfile.php/1/theme_space/customlogo/1726474926/YetGen%20Circle.png',
            description: [
                { id: 1, text: 'Excel modelleme, sunum teknikleri ve takım çalışmaları yapıldı' },
                { id: 2, text: 'Veri analizi yapıldı ve karar verme süreçleri için içgörüler sağlandı' },
                { id: 3, text: 'Takımlarla birlikte küresel sürdürülebilir hedeflere yönelik çalışmalar yapıldı' }
            ]
        }
    ]);

    const [articles, setArticles] = useState([
        {
            title: 'Makale 1',
            description: 'Makale 1 açıklaması',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            title: 'Makale 2',
            description: 'Makale 2 açıklaması',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            title: 'Makale 2',
            description: 'Makale 2 açıklaması',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            title: 'Makale 2',
            description: 'Makale 2 açıklaması',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            title: 'Makale 2',
            description: 'Makale 2 açıklaması',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            title: 'Makale 2',
            description: 'Makale 2 açıklaması',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            title: 'Makale 2',
            description: 'Makale 2 açıklaması',
            imageUrl: 'https://via.placeholder.com/150'
        },
    ]);
    const projectsScrollRef = useRef();
    const articlesScrollRef = useRef();
    const [size, setSize] = useState(20);
    const [page, setPage] = useState(1);

    const fetchArticles = async () => {
        try {
            console.log("api url", process.env.REACT_APP_BLOG_API_URL);

            const response = await fetch(`${process.env.REACT_APP_BLOG_API_URL}/Blogs?Page=${page}&Size=${size}`);

            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log('Articles:', data); // Burada state'e set edebilirsin

            setArticles(data.articles);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BLOG_API_URL}/Projects`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setProjects(data); // State'e veri set etme işlemi
            console.log('Projects:', data); // Burada state'e set edebilirsin

        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const scroll = (direction, ref) => {
        const { current } = ref;
        if (current) {
            const scrollAmount = 300;
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };
    const { t } = useTranslation();

    const [slideIndex, setSlideIndex] = useState(0);

    const prevSlide = () => { setSlideIndex((prevIndex) => (prevIndex === 0 ? workoutBanners.length - 1 : prevIndex - 1)); };
    const nextSlide = () => { setSlideIndex((prevIndex) => (prevIndex === workoutBanners.length - 1 ? 0 : prevIndex + 1)); };



    const downloadPDF = (workExperiences) => {
        const doc = new jsPDF();

        let y = 20;

        // Başlık: Hakkımda
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Hakkımda", 10, y);

        y += 10;
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        const aboutText = `Teknik ve analitik altyapıya sahip bir İş Analisti olarak veri görselleştirme, süreç optimizasyonu ve SQL tabanlı analiz konularında bilgi birikimine sahibim. İş kararlarını destekleyecek etkili ve kapsamlı dokümantasyonlar hazırlama konusunda deneyimliyim. Veri bilimi ve yapay zekaya olan ilgim, problem çözme becerilerim ve etkili iletişim yeteneklerimle ekip çalışmalarına ve organizasyonel süreçlerin iyileştirilmesine katkı sağlıyorum.`;
        const aboutLines = doc.splitTextToSize(aboutText, 180);
        doc.text(aboutLines, 10, y);
        y += aboutLines.length * 6 + 10;

        // Başlık: Deneyimler
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Deneyimler", 10, y);
        y += 10;

        // Deneyimleri döngüyle yaz
        workExperiences.map((work) => {
            if (y > 270) {
                doc.addPage();
                y = 20;
            }

            // Şirket adı
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text(work.company, 10, y);

            // Süre bilgisi
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(work.duration, 160, y);

            y += 6;

            // Açıklamalar
            work.description.forEach((desc) => {
                const descLines = doc.splitTextToSize(`• ${desc.text}`, 180);
                doc.text(descLines, 12, y);
                y += descLines.length * 6;
            });

            y += 6;
        });

        doc.save("cv.pdf");
    };


    useEffect(() => {
        fetchArticles();
        fetchProjects();
    }, []);

    // useEffect(() => {
    //     if (workoutStatus === 'idle') {
    //         dispatch(getWorkoutBanners());
    //     }
    // }, [dispatch, workoutStatus]);

    return (
        <>
            <Header />
            <div className="max-w-6xl mx-auto px-4 py-10">
                {/* Başlık */}
                {/* <h1 className="text-4xl font-bold text-center mb-8">Portfolyo Site</h1> */}

                {/* Özet */}
                <div className="row">
                    <div className="d-flex justify-content-end">
                        <button onClick={downloadPDF}>Pdf</button>
                    </div>
                </div>
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-2">Hakkımda</h2>
                    <p className="text-gray-700">
                        Teknik ve analitik altyapıya sahip bir İş Analisti olarak veri görselleştirme, süreç optimizasyonu ve SQL tabanlı
                        analiz konularında bilgi birikimine sahibim. İş kararlarını destekleyecek etkili ve kapsamlı dokümantasyonlar
                        hazırlama konusunda deneyimliyim. Veri bilimi ve yapay zekaya olan ilgim, problem çözme becerilerim ve
                        etkili iletişim yeteneklerimle ekip çalışmalarına ve organizasyonel süreçlerin iyileştirilmesine katkı sağlıyorum.
                    </p>
                </section>

                {/* Deneyim */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Deneyimler</h2>

                    <div className="flex flex-col gap-6 bg-warning" >
                        {workExperiences.map((workexperience, idx) => (
                            <div
                                key={idx}
                                className="row  bg-white shadow-md rounded-xl hover:shadow-lg transition">

                                <div className='col-md-1 justify-content-center align-items-center d-flex'>
                                    <img
                                        src={workexperience.imageUrl}
                                        alt="company logo"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                </div>
                                <div className='col-md-11'>
                                    <div className="row  p-4 rounded-xl">
                                        <div className="col-md-10">
                                            <p className="text-lg font-semibold">{workexperience.company}</p>
                                            <p className="text-gray-600 text-sm mt-1">
                                                {workexperience.description.map((desc) => (
                                                    <span key={desc.id} className="block text-gray-500 text-sm">
                                                        {desc.text}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>

                                        <div className="col-md-2 " style={{ alignItems: 'end', justifyContent: 'end' }}>
                                            <p className="text-gray-500 text-sm">{workexperience.duration}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Eğitim */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Eğitim</h2>
                    <div className="bg-white d-flex shadow-md rounded-xl p-5 w-full justify-content-between ">
                        <div className="col-auto ">
                            <p className="font-medium">MEF University</p>
                            <p>Bilgisayar Mühendisliği</p>
                        </div>

                        <div className="col-auto mx-5">
                            <p className="text-gray-500 text-sm">2019 - 2024</p>
                        </div>
                    </div>
                </section>

                {/* Yetenekler */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Yetenekler</h2>
                    <div className="flex flex-wrap gap-4">
                        {["React", "Tailwind", ".NET", "SQL", "Python"].map((skill, idx) => (
                            <div key={idx} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full shadow-sm text-sm">
                                {skill}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Makaleler */}
                <section className="mb-12 ">
                    <h2 className="text-2xl font-semibold mb-4">Makaleler</h2>
                    <div className="flex justify-end">
                        <Link to="/blog"><p className="text-gray-600 text-right">
                            Devamını Oku
                        </p></Link>
                    </div>

                    {/* Scrollable container with buttons */}
                    <div className="relative mt-1">
                        {/* Left Button */}
                        <button
                            onClick={() => scroll('left', articlesScrollRef)}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
                        >
                            ◀
                        </button>

                        {/* Scrollable project list */}
                        <div
                            ref={articlesScrollRef}
                            className="flex py-6 space-x-4 overflow-x-auto scrollbar-hide px-10 scroll-smooth overflow-x-hidden"
                        >
                            {articles.map((article, idx) => (
                                <Link to={`blog-detail/${article.slug}`}>
                                    <div
                                        key={idx}
                                        className="min-w-[280px] min-h-[320px] max-w-xs bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition flex-shrink-0">
                                        {/* <img
                                        src={article.imageUrl}
                                        alt={article.name}
                                        className="w-full h-32 object-cover rounded-t-xl mb-2"
                                    /> */}
                                        <h3 className="text-lg font-semibold">{article.title}</h3>
                                        <p className="text-gray-600 text-sm mt-2">
                                            {articles && article?.content?.length > 300
                                                ? `${article.content.substring(0, 300)}...`
                                                : article?.content}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Right Button */}
                        <button
                            onClick={() => scroll('right', articlesScrollRef)}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
                        >
                            ▶
                        </button>
                    </div>
                </section>

                {/* Projeler */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Projeler</h2>

                    {/* Scrollable container with buttons */}
                    <div className="relative">
                        {/* Left Button */}
                        <button
                            onClick={() => scroll('left', projectsScrollRef)}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
                        >
                            ◀
                        </button>

                        <div
                            ref={projectsScrollRef}
                            className="flex space-x-4 overflow-x-auto scrollbar-hide px-10 scroll-smooth overflow-x-hidden">
                            {projects.map((project, idx) => (
                                <Link to={`projects/${project.slug}`}>
                                    <div
                                        key={idx}
                                        className="min-w-[280px] min-h-[320px] max-w-xs bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition flex-shrink-0">
                                        {/* <img
                                            src={project.imageUrl}
                                            alt={project.name}
                                            className="w-full h-32 object-cover rounded-t-xl mb-2"
                                        /> */}
                                        <h3 className="text-lg font-semibold">{project.title}</h3>
                                        <div
                                            className="project-description"
                                            dangerouslySetInnerHTML={{ __html: project.description }}
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>


                        {/* Right Button */}
                        <button
                            onClick={() => scroll('right', projectsScrollRef)}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
                        >
                            ▶
                        </button>
                    </div>
                </section>

                <section>
                    <WheelOfFortune />
                </section>



            </div>
            <Footer />
        </>

        // <div>
        //     <Header />

        //     {/* Banner */}
        //     <div className="d-flex " style={{ width: '100%', position: 'relative' }}>
        //         {workoutBanners && workoutBanners.length > 0 && workoutBanners.filter((_, index) => index === slideIndex).map((item) => (
        //             <div className="card" key={item} style={{ flex: '0 0 100%', height: '290px', padding: '10px' }}>
        //                 <div style={{ width: '100%', height: '100%', backgroundColor: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px' }}>
        //                     <p>{item}</p>
        //                     <button onClick={prevSlide} style={{ cursor: 'pointer', position: 'absolute', left: '2%', top: '35%', fontSize: '30px' }}>&lt;</button>
        //                     <button onClick={nextSlide} style={{ cursor: 'pointer', position: 'absolute', right: '2%', top: '35%', fontSize: '30px' }}>&gt;</button>
        //                 </div>
        //             </div>))}
        //     </div>


        //     {/* Categories */}
        //     <div className="row mt-2">
        //         <h2>{t('categories')}</h2>
        //         <div className="d-flex justify-content-between mx-2 flex-wrap">
        //             {workoutCategories && workoutCategories.length > 0 && workoutCategories.map(c => {
        //                 return (
        //                     <>
        //                         <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        //                             <Link to={`/category-detail/${c.name}`} key={c.name} className="text-decoration-none">
        //                                 <div className="card workout-card position-relative mx-2" style={{ height: '125px' }}>
        //                                     <img
        //                                         src={c.imgUrl}
        //                                         alt="description"
        //                                         className="card-img-top w-100 h-100 object-fit-cover rounded-5 px-2"
        //                                     />
        //                                     <div className="card-img-overlay d-flex justify-content-center align-items-start ">
        //                                         <p className="text-start  fw-bold" style={{color:'orange',fontSize:'35px'}}>{c.name}</p>
        //                                     </div>
        //                                 </div>
        //                             </Link>
        //                         </div>
        //                     </>
        //                 );
        //             })}
        //         </div>
        //     </div>


        //     {/* Workout Plans */}
        //     <div style={{ padding: '20px', marginTop: '50px' }}>
        //         <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#333', textAlign: 'center', marginBottom: '30px' }}>
        //             {t('workoutPlans')}
        //         </h2>
        //         <div className="row">
        //             {plans && plans.map((p) => (
        //                 <div className="col-md-4 col-sm-6 mb-4" key={p.id}>
        //                     <div
        //                         style={{
        //                             borderRadius: '8px',
        //                             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        //                             transition: 'transform 0.3s, box-shadow 0.3s',
        //                             padding: '20px',
        //                             cursor: 'pointer'
        //                         }}
        //                         onMouseEnter={(e) => {
        //                             e.currentTarget.style.transform = 'translateY(-10px)';
        //                             e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)';
        //                         }}
        //                         onMouseLeave={(e) => {
        //                             e.currentTarget.style.transform = 'translateY(0)';
        //                             e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        //                         }}
        //                     >
        //                         <div style={{ padding: '20px' }}>
        //                             <h5 style={{ fontSize: '1.2rem', fontWeight: 500, color: '#333', marginBottom: '10px' }}>
        //                                 {p.name}
        //                             </h5>
        //                             <p style={{ fontSize: '1rem', color: '#555', marginBottom: '15px' }}>
        //                                 {p.description}
        //                             </p>
        //                             <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '20px' }}>
        //                                 {t('planId')}: {p.id}
        //                             </p>
        //                             <button
        //                                 style={{
        //                                     backgroundColor: '#007bff',
        //                                     border: 'none',
        //                                     padding: '8px 16px',
        //                                     fontSize: '1rem',
        //                                     borderRadius: '5px',
        //                                     color: 'white',
        //                                     cursor: 'pointer'
        //                                 }}
        //                                 onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
        //                                 onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
        //                             >
        //                                 {t('viewPlan')}
        //                             </button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //     </div>

        //     {/* Tips & Questions */}
        //     <div className='mx-4' style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', marginTop: '20px' }}>
        //         <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
        //             {t('tipsQuestions')}
        //         </h2>

        //         {questions && questions.map((q) => {
        //             return (
        //                 <div key={q.id} style={{ backgroundColor: '#fff', borderRadius: '8px', marginBottom: '15px', padding: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        //                     <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
        //                         {q.questionText}
        //                     </p>
        //                     <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.6' }}>
        //                         {q.answer}
        //                     </p>
        //                 </div>
        //             );
        //         })}
        //     </div>



        //     {/*  */}
        //     <div className='d-flex' style={{ marginTop: '150px' }}>
        //         <p className='text-center mx-auto mb-5' style={{ fontSize: '25px' }}>Text</p>
        //     </div>


        //     <Footer />

        // </div>
    )
}

export default Home
