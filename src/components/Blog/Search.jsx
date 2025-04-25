import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');

    const checkAndRedirect = () => {
        const currentPath = window.location.pathname;

        if (currentPath.includes('/blog/filter/')) {
            // Eğer URL'de '/blog/filter/' varsa, sadece searchTerm ekleyerek yönlendir
            window.location.href = `${searchTerm}`;
        } else {
            // Eğer yoksa, tam URL ile yönlendir
            window.location.href = `/blog/filter/${searchTerm}`;
        }
    };
    return (
        <>
            {/* Arama */}
            <div className="text-center mb-6">
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Bloglarda ara..."
                        className="px-4 py-2 border border-gray-300 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e => {
                            if (e.key === 'Enter') {
                                checkAndRedirect();
                            }
                        })
                        }
                    />
                    {/* Arama butonuna tıklanarak yönlendirme */}
                    <button
                        onClick={checkAndRedirect}
                        style={{
                            position: 'absolute',
                            top: '22%',
                            right: '28%',
                            cursor: 'pointer',
                        }}>
                        Ara
                    </button>
                </div>
            </div>
        </>
    );
}

export default Search;
