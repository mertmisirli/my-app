// src/pages/Portfolio/Ereader.jsx

import React, { useState, useRef } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Header from '../../components/Header';

const Ereader = () => {
    // PDF dosyasının durumunu ve yükleme durumunu yönet
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [annotations, setAnnotations] = useState([]);
    const [highlightedText, setHighlightedText] = useState('');
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState('');

    // PDF dosyasını yükleme işlevi
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            const fileUrl = URL.createObjectURL(file);
            setPdfUrl(fileUrl);
            setLoading(false);
        }
    };

    // Vurgu ekleme işlevi
    const addHighlight = () => {
        if (highlightedText.trim() !== '') {
            setAnnotations((prevAnnotations) => [
                ...prevAnnotations,
                { type: 'highlight', text: highlightedText },
            ]);
            setHighlightedText('');
        }
    };

    // Not ekleme işlevi
    const addNote = () => {
        if (currentNote.trim() !== '') {
            setNotes((prevNotes) => [
                ...prevNotes,
                { note: currentNote },
            ]);
            setCurrentNote('');
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col items-center mt-4 h-screen bg-gray-100 overflow-auto p-4">
                <h1 className="text-4xl font-bold mb-4">E-Reader</h1>

                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="mb-4"
                />

                {loading && (
                    <div className="text-xl text-gray-600 mb-4">Yükleniyor...</div>
                )}

                {pdfUrl && !loading && (
                    <div style={{ height: '80vh', width: '100%', border: '1px solid #ddd' }}>
                        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                            <Viewer fileUrl={pdfUrl} />
                        </Worker>
                    </div>
                )}

                {!pdfUrl && !loading && (
                    <div className="text-gray-600 mt-4">Bir PDF dosyası seçin...</div>
                )}

                {/* Vurgu ve Not Ekleme Alanları */}
                <div className="mt-6 w-full">
                    <div className="flex mb-4">
                        <textarea
                            placeholder="Vurgulamak istediğiniz metni yazın..."
                            value={highlightedText}
                            onChange={(e) => setHighlightedText(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                            onClick={addHighlight}
                            className="ml-2 p-2 bg-blue-500 text-white rounded"
                        >
                            Vurgula
                        </button>
                    </div>
                    <div className="flex mb-4">
                        <textarea
                            placeholder="Not eklemek için buraya yazın..."
                            value={currentNote}
                            onChange={(e) => setCurrentNote(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                            onClick={addNote}
                            className="ml-2 p-2 bg-green-500 text-white rounded"
                        >
                            Not Ekle
                        </button>
                    </div>

                    <div className="mt-4">
                        <h2 className="font-bold text-lg">Vurgulanan Metinler:</h2>
                        <ul>
                            {annotations.map((annotation, index) => (
                                <li key={index} className="text-blue-600">
                                    {annotation.text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4">
                        <h2 className="font-bold text-lg">Notlar:</h2>
                        <ul>
                            {notes.map((note, index) => (
                                <li key={index} className="text-gray-600">
                                    {note.note}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Ereader;
