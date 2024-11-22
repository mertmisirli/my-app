import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { useSelector } from 'react-redux'
import Modal from '../components/Modal';

const NewsDetail = () => {
    const [newsDetail, setNewsDetail] = useState({})
    const { id } = useParams();

    const [loadingDetail, setLoadingDetail] = useState(false)
    const { modal } = useSelector(state => state.modal)

    useEffect(() => {

        console.log("ID : ", id);

        // API çağrısı
        const fetchNews = async () => {
            setLoadingDetail(true)
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`) // API URL'nizi buraya koyun
                if (!response.ok) {
                    throw new Error('Veri çekme hatası!')
                }
                const data = await response.json()
                console.log("Detail Data : ", data);

                setNewsDetail(data)  // Redux'a veriyi set et

            } catch (err) {
                //setError(err.message)  // Hata durumunda error state'ini güncelle
            } finally {
                setLoadingDetail(false)  // Veri çekme işlemi tamamlandı
            }
        }

        fetchNews()
    }, [])

    return (
        <>
            <div>
                <Header />
                <div className="content">
                    <div className="container">
                        <div className='row mx-auto my-auto'>
                            <div className='justify-content-center'>
                                <h4>News Detail</h4>
                                {loadingDetail ? (
                                    <div className='card p-4'>
                                        <div className="card-body">
                                            <p>Loading...</p> </div> </div>)
                                    : (<div className='card p-4'>
                                        <div className="card-body">
                                            <p>Title : {newsDetail.title}
                                            </p>
                                            <p>User ID : {newsDetail.userId}</p>
                                            <p>ID : {newsDetail.id}</p>
                                            <input type="checkbox" checked={newsDetail.checked} readOnly />
                                        </div>
                                    </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {modal && <Modal title={"Ürün Ekle"} />}
            </div>


        </>
    )
}

export default NewsDetail