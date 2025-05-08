import React, { useEffect, useState } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProductsByKeyword = async (keyword) => {
    if (!keyword) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5274/api/Products/get-keyword/${keyword}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Veri alınamadı! HTTP Status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Ürünler alınırken hata oluştu:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Kullanıcı arama yaparken tetiklenir (debounce opsiyonel)
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchProductsByKeyword(value); // Her değişiklikte sorgu atar
  };

  return (
    <div>
      <div className="mb-3">
        <input
          type="search"
          className="form-control"
          placeholder="Ürün ara..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <h2>Ürünler</h2>

      {loading && <div>Yükleniyor...</div>}
      {error && <div>Hata: {error}</div>}

      {!loading && products.length === 0 && <p>Hiç ürün bulunamadı.</p>}

      <div className="d-flex flex-wrap gap-3">
        {products.map((product) => (
          <div className="card" key={product.id} style={{ width: '12rem' }}>
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p>{product.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
