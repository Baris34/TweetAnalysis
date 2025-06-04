import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [tweetUrl, setTweetUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tweetUrl) {
      setMessage('Lütfen bir Tweet URL girin.');
      return;
    }
    setIsLoading(true);
    setMessage('');
    try {

      const response = await axios.post('http://localhost:3001/api/analyze-tweet', { // Backend post isteği
        url: tweetUrl,
      });
      setMessage(response.data.message || 'Analiz başarıyla eklendi!');
      setTweetUrl(''); // Input'u temizle
    } catch (error) {
      setMessage(
        `Hata: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>AI Tweet Analiz Otomatı</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="url"
            value={tweetUrl}
            onChange={(e) => setTweetUrl(e.target.value)}
            placeholder="Tweet URL'sini buraya yapıştırın"
            style={{ width: '300px', padding: '8px', marginRight: '10px' }}
            required
          />
          <button type="submit" disabled={isLoading} style={{ padding: '8px' }}>
            {isLoading ? 'Analiz Ediliyor...' : 'Analiz Et'}
          </button>
        </div>
      </form>
      {message && <p style={{ marginTop: '15px' }}>{message}</p>}
    </div>
  );
}
export default App;