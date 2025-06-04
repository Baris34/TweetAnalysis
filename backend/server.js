require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Airtable = require('airtable');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const PORT = process.env.PORT || 3001;

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
const tableName = process.env.AIRTABLE_TABLE_NAME;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


app.use(cors());
app.use(express.json());

app.post('/api/analyze-tweet', async (req, res) => {
  const { url } = req.body;
  console.log('Alınan Tweet URL:', url);

  if (!url) {
    return res.status(400).json({ message: 'Tweet URL gerekli.' }); // URL Check
  }

  try {
    //Sahte veriler
    const mockTweetData = {
      username: 'barisss34',
      textContent: `Benim can güvenliğimi koruyacakmış o yüzden hatalı park cezası %40 zamlanmış.. Benim can güvenliğim için yapay zekalı radar sistemi bile yapmışlar !`,
      postTime: new Date().toISOString(),
    };
    const mockTweetData2 = {
      username: 'alii123',
      textContent: 'Lüks aracıyla karpuz almaya giden vatandaş tanımadığı biri ile danaya girer gibi karpuz aldılar... Adam, "Ekonomi nereye gidiyor, az önce iki kişi karpuzu bölüştük ya!" diyerek isyan etti',
      postTime: new Date().toISOString(),
    }
    const mockTweetData3 = {
      username: 'mastir111',
      textContent: 'Euro 44,74 lirayı vurdu. Bu gördüğünüz kağıt parçası 22.370 TL ediyor. Bu kâğıt parçasını bir #Emekli ye verdiğiniz zaman size 7.901 TL iade etmesi gerekiyor. İşte size “Yeni Türkiye!” #enflasyon ',
      postTime: new Date().toISOString(),
    }
    const mockTweetData4 = {
      username: 'deneme',
      textContent: 'Herkes çok mutlu, insanlar refah içinde',
      postTime: new Date().toISOString(),
    }

    let summary = 'Özet alınamadı.';
    let sentiment = 'nötr'; // Varsayılan duygu

    const currentMockData = mockTweetData4; // Local data

    // Özet için prompt
    const summaryPrompt = `Aşağıdaki metni en fazla 2 cümle ile özetle:\n\nMetin: "${currentMockData.textContent}"\n\nÖzet:`;
    try {
      const summaryResult = await geminiModel.generateContent(summaryPrompt);
      const summaryResponse = await summaryResult.response;
      summary = summaryResponse.text().trim();
    } catch (geminiError) {
      console.error('Gemini özet alınırken hata:', geminiError);
      summary = 'Gemini API özet hatası.';
    }
    
    // Duygu analizi için prompt
    const sentimentPrompt = `Aşağıdaki metnin duygusunu analiz et ve sadece şu kelimelerden birini kullanarak cevap ver: 'olumlu', 'olumsuz', 'nötr'.\n\nMetin: "${currentMockData.textContent}"\n\nDuygu:`;
    try {
      const sentimentResult = await geminiModel.generateContent(sentimentPrompt);
      const sentimentResponse = await sentimentResult.response;
      let rawSentiment = sentimentResponse.text().trim().toLowerCase();
      
      //Format kontrolü
      if (['olumlu', 'olumsuz', 'nötr'].includes(rawSentiment)) {
        sentiment = rawSentiment;
      } else {
        console.warn(`Gemini'den beklenmedik duygu cevabı: "${rawSentiment}". 'nötr' olarak ayarlandı.`);
        sentiment = 'nötr'; // Beklenmedik cevap gelirse varsayılana dön
      }

    } catch (geminiError) {
      console.error('Gemini duygu analizi sırasında hata:', geminiError);
      sentiment = 'nötr'; // varsayılan
    }

    const recordToCreate = { // Airtable üzerine kaydetme
      fields: {
        'Username': currentMockData.username,
        'Tweet İçeriği': currentMockData.textContent,
        'Duygu': sentiment,
        'Özet': summary,
        'Tarih ve Saat': currentMockData.postTime,
        'Tweet Link': url
      },
    };

    await base(tableName).create([recordToCreate]);

    res.json({
      analysis: { summary, sentiment }
    });

  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server http://localhost:${PORT} adresinde çalışıyor`);
});