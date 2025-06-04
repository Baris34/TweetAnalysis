# TweetAnalysis

# Swipeline AI Studio - AI Tweet Analiz Otomatı (Mini App)

Bu proje, Swipeline AI Studio için geliştirilmiş bir Developer Intern Teknik Görevidir. Kullanıcı tarafından sağlanan bir Tweet URL'si (şimdilik mock data ile temsil edilmektedir) alınır, içeriği mock olarak oluşturulur ve bu içerik Google Gemini API kullanılarak analiz edilir. Analiz sonuçları (özet, duygu) ve mock tweet özellikleri bir Airtable tablosuna kaydedilir.

## Özellikler

*   Kullanıcı arayüzünden Tweet URL'si girişi yapılır ve backende gönderilir.
*   Google Gemini API kullanarak:
    *   Tweet içeriği için 1-2 cümlelik özet oluşturulur.
    *   Tweet içeriği için duygu analizi yapılır. (olumlu, olumsuz, nötr).
*   Analiz sonuçlarını ve tweet bilgilerini Airtable tablosuna kaydedilir.
*   Her yeni analiz isteğinde Airtable tablosuna yeni bir satır eklenir.

## Kullanılan Teknolojiler

*   **Frontend:** React
*   **Backend:** Node.js, Express.js
*   **Veritabanı/Spreadsheet:** Airtable
*   **AI Analiz:** Google Gemini API
*   **Diğer:** Axios, dotenv, cors

## Ön Gereksinimler

*   Node.js ve npm (veya yarn) yüklü olmalıdır.
*   Bir Airtable hesabı.
*   Google AI Studio'dan alınmış bir Gemini API anahtarı.

## Ortam Değişkenleri (`.env`)

Projenin backend kısmı, API anahtarları ve diğer yapılandırma bilgileri için bir `.env` dosyası kullanır. Backend ana dizininde (`backend/`) aşağıdaki gibi bir `.env` dosyası oluşturmanız gerekmektedir:

*   `AIRTABLE_API_KEY`: Airtable Kişisel Erişim Belirteciniz (Personal Access Token - PAT). Airtable hesabınızdan alabilirsiniz.
*   `AIRTABLE_BASE_ID`: Verilerin kaydedileceği Airtable Base'inizin ID'si. Airtable API dokümantasyonundan veya Base URL'sinden bulabilirsiniz.
*   `AIRTABLE_TABLE_NAME`: Airtable Base'iniz içinde verilerin kaydedileceği tablonun adı (Örneğin: `Tweet`).
*   `GEMINI_API_KEY`: Google AI Studio'dan aldığınız Gemini API anahtarınız.

## Airtable Kurulumu

Airtable'da bir Base oluşturun ve aşağıdaki sütunları içeren bir tablo oluşturun:

*   `Username` (Single line text)
*   `Tweet İçeriği` (Long text)
*   `Duygu` (Single select: olumlu, olumsuz, nötr)
*   `Özet` (Long text)
*   `Tarih ve Saat` (Date - ISO formatını destekler)
*   `Tweet Link` (URL)

## Kurulum

1.  Projeyi klonlayın:
    ```bash
    git clone https://github.com/Baris34/TweetAnalysis.git
    cd TweetAnalysis
    ```

2.  Backend bağımlılıklarını yükleyin:
    ```bash
    cd backend
    npm install
    # .env dosyasını yukarıdaki "Ortam Değişkenleri" bölümüne göre oluşturun.
    cd ..
    ```

3.  Frontend bağımlılıklarını yükleyin:
    ```bash
    cd frontend
    npm install
    cd ..
    ```

## Uygulamayı Çalıştırma

1.  **Backend'i Başlatma:**
    Yeni bir terminal açın ve backend dizinine gidin:
    ```bash
    cd backend
    npm start  # veya npx nodemon server.js (geliştirme için)
    ```
    Backend varsayılan olarak `http://localhost:3001` adresinde çalışacaktır.

2.  **Frontend'i Başlatma:**
    Yeni bir terminal açın ve frontend dizinine gidin:
    ```bash
    cd frontend
    npm start
    ```

## Örnek Airtable Tablo Linki

Analiz sonuçlarının kaydedildiği örnek Airtable tablosuna aşağıdaki linkten ulaşabilirsiniz:

https://airtable.com/appuPBCIiM6I6h5cA/shrwhFrrEgwcUn2vG

---
