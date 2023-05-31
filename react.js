import React, { useState } from 'react';

function Hesap() {
  const [sayi1, setSayi1] = useState('');
  const [sayi2, setSayi2] = useState('');
  const [islem, setIslem] = useState('toplama');
  const [sonuc, setSonuc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/hesapla', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sayi1: sayi1,
        sayi2: sayi2,
        islem: islem
      })
    })
      .then(response => response.json())
      .then(data => {
        setSonuc(data.sonuc);
        loglama(sayi1, sayi2, islem, data.sonuc);
      })
      .catch(error => console.error(error));
  };

  const loglama = (sayi1, sayi2, islem, sonuc) => {
    fetch('/api/loglama', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sayi1: sayi1,
        sayi2: sayi2,
        islem: islem,
        sonuc: sonuc
      })
    })
      .then(response => response.json())
      .catch(error => console.error(error));
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="sayi1">Sayı 1:</label>
          <input type="number" id="sayi1" name="sayi1" className="form-control" value={sayi1} onChange={(e) => setSayi1(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="sayi2">Sayı 2:</label>
          <input type="number" id="sayi2" name="sayi2" className="form-control" value={sayi2} onChange={(e) => setSayi2(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="islem">İşlem:</label>
          <select id="islem" name="islem" className="form-control" value={islem} onChange={(e) => setIslem(e.target.value)}>
            <option value="toplama">Toplama</option>
            <option value="cikarma">Çıkarma</option>
            <option value="carpma">Çarpma</option>
            <option value="bolme">Bölme</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Hesapla</button>
      </form>

      {sonuc && <div id="sonuc" className="mt-5"><p>Sonuç: {sonuc}</p></div>}
    </div>
  );
}

export default Hesap;
