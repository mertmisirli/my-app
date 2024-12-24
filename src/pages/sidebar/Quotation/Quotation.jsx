import React, { useState } from 'react';
import Header from '../../../components/Header';

const Quotation = () => {
    const quotations = [
        {
            quo: 'Quo/007254',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'Private Tours',
            agent: 'ERAY TAHIRLER',
            region: 'FAR EAST',
            startDate: '23/08/2023',
            endDate: '29/08/2023',
            lastUpdate: '29/08/2023'
        },
        {
            quo: 'Quo/007638',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'Series Tours',
            agent: 'GOKBERK OZTABAK',
            region: 'FAR EAST',
            startDate: '01/01/2024',
            endDate: '01/01/2024',
            lastUpdate: '31/12/2024'
        },
        {
            quo: 'Quo/013567',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'FIT Tours',
            agent: 'MERVE DEMIR',
            region: 'EUROPE',
            startDate: '24/11/2023',
            endDate: '01/12/2023',
            lastUpdate: '15/12/2023'
        },
        {
            quo: 'Quo/015160',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'Private Tours',
            agent: 'MANZOOR ALI MOHAMMED',
            region: 'INDIA',
            startDate: '25/04/2024',
            endDate: '03/06/2024',
            lastUpdate: '07/06/2024'
        },
        {
            quo: 'Quo/015484',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'Series Tours',
            agent: 'OMER YILDIRIM',
            region: 'INDIA',
            startDate: '31/12/2023',
            endDate: '13/12/2023',
            lastUpdate: '05/12/2023'
        },
        {
            quo: 'Quo/007254',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'Private Tours',
            agent: 'ERAY TAHIRLER',
            region: 'FAR EAST',
            startDate: '23/08/2023',
            endDate: '29/08/2023',
            lastUpdate: '29/08/2023'
        },
        {
            quo: 'Quo/007638',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'Series Tours',
            agent: 'GOKBERK OZTABAK',
            region: 'FAR EAST',
            startDate: '01/01/2024',
            endDate: '01/01/2024',
            lastUpdate: '31/12/2024'
        },
        {
            quo: 'Quo/013567',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'FIT Tours',
            agent: 'MERVE DEMIR',
            region: 'EUROPE',
            startDate: '24/11/2023',
            endDate: '01/12/2023',
            lastUpdate: '15/12/2023'
        },
        {
            quo: 'Quo/015160',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'Private Tours',
            agent: 'MANZOOR ALI MOHAMMED',
            region: 'INDIA',
            startDate: '25/04/2024',
            endDate: '03/06/2024',
            lastUpdate: '07/06/2024'
        },
        {
            quo: 'Quo/015484',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'Series Tours',
            agent: 'OMER YILDIRIM',
            region: 'INDIA',
            startDate: '31/12/2023',
            endDate: '13/12/2023',
            lastUpdate: '05/12/2023'
        },
        {
            quo: 'Quo/007254',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'Private Tours',
            agent: 'ERAY TAHIRLER',
            region: 'FAR EAST',
            startDate: '23/08/2023',
            endDate: '29/08/2023',
            lastUpdate: '29/08/2023'
        },
        {
            quo: 'Quo/007638',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'Series Tours',
            agent: 'GOKBERK OZTABAK',
            region: 'FAR EAST',
            startDate: '01/01/2024',
            endDate: '01/01/2024',
            lastUpdate: '31/12/2024'
        },
        {
            quo: 'Quo/013567',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'FIT Tours',
            agent: 'MERVE DEMIR',
            region: 'EUROPE',
            startDate: '24/11/2023',
            endDate: '01/12/2023',
            lastUpdate: '15/12/2023'
        },
        {
            quo: 'Quo/015160',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'Private Tours',
            agent: 'MANZOOR ALI MOHAMMED',
            region: 'INDIA',
            startDate: '25/04/2024',
            endDate: '03/06/2024',
            lastUpdate: '07/06/2024'
        },
        {
            quo: 'Quo/015484',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'Series Tours',
            agent: 'OMER YILDIRIM',
            region: 'INDIA',
            startDate: '31/12/2023',
            endDate: '13/12/2023',
            lastUpdate: '05/12/2023'
        },
        {
            quo: 'Quo/007254',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'Private Tours',
            agent: 'ERAY TAHIRLER',
            region: 'FAR EAST',
            startDate: '23/08/2023',
            endDate: '29/08/2023',
            lastUpdate: '29/08/2023'
        },
        {
            quo: 'Quo/007638',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'Series Tours',
            agent: 'GOKBERK OZTABAK',
            region: 'FAR EAST',
            startDate: '01/01/2024',
            endDate: '01/01/2024',
            lastUpdate: '31/12/2024'
        },
        {
            quo: 'Quo/013567',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'FIT Tours',
            agent: 'MERVE DEMIR',
            region: 'EUROPE',
            startDate: '24/11/2023',
            endDate: '01/12/2023',
            lastUpdate: '15/12/2023'
        },
        {
            quo: 'Quo/015160',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'Private Tours',
            agent: 'MANZOOR ALI MOHAMMED',
            region: 'INDIA',
            startDate: '25/04/2024',
            endDate: '03/06/2024',
            lastUpdate: '07/06/2024'
        },
        {
            quo: 'Quo/015484',
            client: 'ELINA MEHDINASAB (IR-000001)',
            tourType: 'Series Tours',
            agent: 'OMER YILDIRIM',
            region: 'INDIA',
            startDate: '31/12/2023',
            endDate: '13/12/2023',
            lastUpdate: '05/12/2023'
        }
    ];

    const [isDataGrouped, setIsDataGrouped] = useState(false);


    const groupByTourType = (data) => {
        return data.reduce((acc, currentValue) => {
            // Eğer bu grup zaten varsa, yeni elemanı ekle
            if (!acc[currentValue.tourType]) {
                acc[currentValue.tourType] = [];
            }
            acc[currentValue.tourType].push(currentValue);
            return acc;
        }, {});
    };

    const tableCellStyle = {
        padding: '10px 15px', // Hücre içi boşluk
        textAlign: 'left',     // Yazıyı sola hizala
        border: '1px solid #dee2e6',  // Hücre kenarlığı
    };

    const groupedData = groupByTourType(quotations);

    return (
        <>
            <Header />
            <div className="content mt-4 px-4">
                {/* Title and Search */}
                <div className="row mx-2 mb-2">
                    <p className='col-md-6 fs-4 fw-bold'>Tour Quotations</p>
                    <div className="col-md-6">
                        <input
                            className='form-control'
                            type="text"
                            placeholder='Search'
                            style={{ borderRadius: '8px' }}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="row mb-4">
                    <div className='col-md-6'>
                        <button className='btn btn-primary ' style={{ borderRadius: '8px' }}>Create</button>
                        <button className='btn btn-secondary ' style={{ borderRadius: '8px' }}>D</button>
                        <button className='btn btn-primary ' style={{ borderRadius: '8px' }}>R</button>
                    </div>

                    <div className='col-md-6 text-start'>
                        <button className='btn btn-secondary mx-1' style={{ borderRadius: '8px' }}>Filter</button>
                        <button onClick={() => {
                            setIsDataGrouped(!isDataGrouped)
                        }} className='btn btn-info mx-1' style={{ borderRadius: '8px' }}>Group</button>
                        <button className='btn btn-success mx-1' style={{ borderRadius: '8px' }}>Star</button>
                    </div>
                </div>

                {!isDataGrouped &&
                    <div className="container mt-4">
                        <table className="table table-bordered">
                            <thead>
                                <tr className="table-primary">
                                    <th>Quotation No</th>
                                    <th>Client</th>
                                    <th>Tour Type</th>
                                    <th>Agent</th>
                                    <th>Region</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Last Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quotations.map((quotation, index) => (
                                    <tr
                                        key={quotation.quo}
                                        style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#e9ecef' }}
                                    >
                                        <td>{quotation.quo}</td>
                                        <td>{quotation.client}</td>
                                        <td>{quotation.tourType}</td>
                                        <td>{quotation.agent}</td>
                                        <td>{quotation.region}</td>
                                        <td>{quotation.startDate}</td>
                                        <td>{quotation.endDate}</td>
                                        <td>{quotation.lastUpdate}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>}

                {isDataGrouped && (
                    <div>
                        {Object.keys(groupedData).map((tourType) => (
                            <React.Fragment key={tourType}>
                                <div
                                    style={{
                                        backgroundColor: '#007BFF',  // Başlık arka plan rengi
                                        color: '#fff',               // Başlık yazı rengi
                                        padding: '10px 15px',        // Başlık içi padding
                                        fontSize: '18px',            // Başlık font büyüklüğü
                                        fontWeight: 'bold',
                                        borderRadius: '5px',         // Başlık köşe yuvarlama
                                        marginBottom: '10px',        // Başlık altı boşluk
                                    }}
                                >
                                    {tourType} {/* Grup başlığı */}
                                </div>

                                {groupedData[tourType].map((quotation, index) => (
                                    <table
                                        key={quotation.quo}
                                        className="table"
                                        style={{
                                            width: '100%',
                                            marginBottom: '15px',
                                            borderCollapse: 'collapse',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Tablo gölgesi
                                        }}
                                    >
                                        <tbody>
                                            <tr
                                                style={{
                                                    backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#e9ecef', // Alternatif renk
                                                    transition: 'background-color 0.3s ease',                 // Geçiş efekti
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.backgroundColor = '#f1f1f1';          // Hover rengi
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.backgroundColor = index % 2 === 0 ? '#f8f9fa' : '#e9ecef';
                                                }}
                                            >
                                                <td style={tableCellStyle}>{quotation.quo}</td>
                                                <td style={tableCellStyle}>{quotation.client}</td>
                                                <td style={tableCellStyle}>{quotation.tourType}</td>
                                                <td style={tableCellStyle}>{quotation.agent}</td>
                                                <td style={tableCellStyle}>{quotation.region}</td>
                                                <td style={tableCellStyle}>{quotation.startDate}</td>
                                                <td style={tableCellStyle}>{quotation.endDate}</td>
                                                <td style={tableCellStyle}>{quotation.lastUpdate}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                )}



            </div>
        </>
    );
};

export default Quotation;
