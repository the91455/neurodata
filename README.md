# ✨ NeuroData - AI Training Helper

<div align="center">

![NeuroData Banner](https://img.shields.io/badge/NeuroData-AI%20Training%20Helper-blueviolet?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.8+-blue?style=for-the-badge&logo=python)
![Gemini](https://img.shields.io/badge/Gemini-2.5%20Flash-orange?style=for-the-badge&logo=google)
![License](https://img.shields.io/badge/License-GPL--3.0-blue?style=for-the-badge)

**Gemini AI ile yüksek kaliteli eğitim veri setleri oluşturun**
*Generate high-quality AI training datasets with Gemini*

[Özellikler](#-özellikler) • [Kurulum](#-kurulum) • [Kullanım](#-kullanım) • [API](#-api-dokümantasyonu) • [Katkıda Bulunma](#-katkıda-bulunma)

</div>

<!-- Keywords for Search Engines: AI Train, AI Training, Machine Learning Dataset, Train AI Models, Training Data Generator, Yapay Zeka Eğitimi, Veri Seti Oluşturucu -->

---

## 📖 İçindekiler

- [Hakkında](#-hakkında)
- [Özellikler](#-özellikler)
- [Teknolojiler](#-teknolojiler)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Akıllı İndirme](#-akıllı-indirme-sistemi)
- [API Dokümantasyonu](#-api-dokümantasyonu)
- [Proje Yapısı](#-proje-yapısı)
- [Konfigürasyon](#-konfigürasyon)
- [Sorun Giderme](#-sorun-giderme)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

---

## 🎯 Hakkında

**NeuroData**, Google'ın Gemini AI modelini kullanarak makine öğrenimi ve yapay zeka projeleri için hızlı ve kolay bir şekilde **AI training data** (eğitim verisi) oluşturmanıza olanak sağlayan modern bir web uygulamasıdır. Özellikle LLM fine-tuning, makine öğrenimi modeli eğitimi (ML training) ve veri analizi projeleri için idealdir. "AI train" süreçlerinizi hızlandırmak için tasarlandı.

### 🌟 Neden NeuroData?

- ⚡ **Hızlı ve Kolay**: Birkaç tıklama ile **AI training** için profesyonel veri setleri oluşturun
- 🧠 **Akıllı Format Algılama**: **AI model training** için uygun JSON, CSV, Python, SQL ve daha fazlası
- 🎨 **Modern Arayüz**: Glassmorphism tasarım ve smooth animasyonlar
- 💾 **Zaman Damgalı Kayıt**: Otomatik dosya isimlendirme ve format seçimi
- 🔒 **Güvenli**: API anahtarlarınız yerel .env dosyasında saklanır

---

## ✨ Özellikler

### 🎯 Temel Özellikler

- **Gemini 2.5 Flash Entegrasyonu**: En güncel ve hızlı Gemini modeli
- **Gerçek Zamanlı Oluşturma**: Promptunuzu yazdıktan sonra anında sonuç
- **Kopyala & Paylaş**: Tek tıkla panoya kopyalama
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm

### 💾 Akıllı İndirme Sistemi

NeuroData, prompt'unuza göre **otomatik olarak** doğru dosya formatını algılar ve kaydeder:

| 📝 Prompt İçeriği | 📦 Çıktı Formatı | 📂 Örnek Dosya |
|-------------------|------------------|----------------|
| "Generate **JSON** data" | `.json` | `neurodata_18-59-30.json` |
| "Create **Python** code" | `.py` | `neurodata_18-59-30.py` |
| "Generate **CSV** table" | `.csv` | `neurodata_18-59-30.csv` |
| "Create **HTML** page" | `.html` | `neurodata_18-59-30.html` |
| "Generate **XML** config" | `.xml` | `neurodata_18-59-30.xml` |
| "Create **SQL** queries" | `.sql` | `neurodata_18-59-30.sql` |
| "Generate **Markdown** docs" | `.md` | `neurodata_18-59-30.md` |
| "Create **YAML** config" | `.yaml` | `neurodata_18-59-30.yaml` |
| "Generate **JavaScript**" | `.js` | `neurodata_18-59-30.js` |

#### 🧠 Çift Katmanlı Algılama

1. **Prompt Analizi**: Yazdığınız metinde format anahtar kelimeleri arar
2. **İçerik Analizi**: Oluşturulan çıktıyı analiz eder
   - `def`, `import` tespit edilirse → `.py`
   - `function`, `const`, `let` tespit edilirse → `.js`

---

## 🛠 Teknolojiler

### Frontend
- **HTML5**: Semantic yapı
- **CSS3**: Glassmorphism, animations, modern UI
- **Vanilla JavaScript**: Bağımlılıksız, hızlı
- **Google Fonts**: Outfit font ailesi

### Backend
- **Python 3.8+**: Standard library
- **http.server**: Minimal HTTP server
- **socketserver**: TCP socket handling

### API
- **Google Gemini 2.5 Flash**: En güncel AI modeli
- **REST API**: `/api/generate` endpoint

---

## 📦 Kurulum

### Gereksinimler

- Python 3.8 veya üzeri
- Google Gemini API anahtarı ([buradan alın](https://ai.google.dev/))
- Modern web tarayıcı (Chrome, Firefox, Safari, Edge)

### Adım 1: Projeyi Klonlayın

```bash
git clone https://github.com/kullaniciadi/neurodata.git
cd neurodata
```

### Adım 2: API Anahtarını Yapılandırın

`.env` dosyası oluşturun:

```bash
touch .env
```

`.env` dosyasına API anahtarınızı ekleyin:

```env
GEMINI_API="SIZIN_API_ANAHTARINIZ"
GEMINI_API_KEY="SIZIN_API_ANAHTARINIZ"
```

> 💡 **Not**: Gemini API anahtarınızı [Google AI Studio](https://ai.google.dev/) üzerinden ücretsiz alabilirsiniz.

### Adım 3: Serveri Başlatın

```bash
python3 server.py
```

Sunucu başarıyla başladığında şu mesajı göreceksiniz:
```
Server starting on http://localhost:8003
```

### Adım 4: Uygulamayı Açın

Tarayıcınızda şu adresi açın:
```
http://localhost:8003
```

---

## 🚀 Kullanım

### 1️⃣ Prompt Yazın

Metin kutusuna ne tür veri istediğinizi yazın:

```
Generate 5 examples of Python list comprehensions with explanations
```

### 2️⃣ Oluştur Butonuna Tıklayın

"Generate Training Data" butonuna tıklayın ve AI'ın çalışmasını bekleyin.

### 3️⃣ Sonuçları Kullanın

Oluşturulan içerik için 3 seçeneğiniz var:

- **💾 İndir**: Akıllı format algılama ile dosyayı kaydedin
- **📋 Kopyala**: İçeriği panoya kopyalayın
- **🗑️ Temizle**: Her şeyi sıfırlayın ve yeniden başlayın

### 📝 Örnek Promptlar

#### JSON Veri Seti
```
Generate JSON data for 10 sample users with name, email, age, and city
```

#### Python Kod Örnekleri
```
Create 5 Python functions for data validation with docstrings
```

#### CSV Tablosu
```
Generate CSV data for a product inventory with columns: id, name, price, stock
```

#### SQL Sorguları
```
Create SQL queries for creating and populating a users database table
```

---

## 💾 Akıllı İndirme Sistemi

### Nasıl Çalışır?

1. **Prompt Analizi**: Yazdığınız promptta format anahtar kelimeleri aranır
2. **Format Tespiti**: Uygun dosya uzantısı ve MIME type belirlenir
3. **Zaman Damgası**: Saat-dakika-saniye formatında timestamp eklenir
4. **Otomatik İndirme**: Dosya doğru formatta indirilir

### Desteklenen Formatlar

```javascript
// Format algılama örnekleri
'json'       → .json (application/json)
'csv'        → .csv  (text/csv)
'xml'        → .xml  (application/xml)
'html'       → .html (text/html)
'python'     → .py   (text/x-python)
'javascript' → .js   (text/javascript)
'markdown'   → .md   (text/markdown)
'yaml'       → .yaml (text/yaml)
'sql'        → .sql  (application/sql)
```

### Dosya İsimlendirme

Format: `neurodata_HH-MM-SS.extension`

Örnekler:
- `neurodata_18-59-30.json`
- `neurodata_14-23-45.py`
- `neurodata_09-15-22.csv`

---

## 📚 API Dokümantasyonu

### POST `/api/generate`

Gemini AI ile içerik oluşturur.

#### Request

```http
POST /api/generate HTTP/1.1
Content-Type: application/json

{
  "prompt": "Your generation prompt here"
}
```

#### Request Body

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `prompt` | string | ✅ | Oluşturulacak içerik için talimat |

#### Response (Başarılı)

```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "Generated content here..."
          }
        ]
      }
    }
  ]
}
```

#### Response (Hata)

```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

#### HTTP Durum Kodları

- `200 OK`: İstek başarılı
- `404 Not Found`: Model/endpoint bulunamadı
- `500 Internal Server Error`: Sunucu hatası veya API anahtarı eksik

---

## 📁 Proje Yapısı

```
neurodata/
├── 📄 index.html          # Ana HTML dosyası
├── 🎨 style.css           # Stil ve animasyonlar (glassmorphism, animations)
├── ⚡ app.js              # Frontend JavaScript (akıllı format algılama)
├── 🐍 server.py           # Python HTTP server + Gemini API proxy
├── 🔐 .env                # API anahtarları
├── 📄 LICENSE             # GPL-3.0 Lisansı
└── 📖 README.md           # Proje dokümantasyonu
```

### Dosya Açıklamaları

#### `index.html`
- Semantic HTML5 yapısı
- SEO optimize meta taglar
- Responsive viewport ayarları
- Google Fonts entegrasyonu

#### `style.css`
- Glassmorphism tasarım
- CSS animations ve transitions
- Responsive breakpoints
- Modern gradient backgrounds
- Smooth hover effects

#### `app.js`
- Event handling
- Fetch API ile backend iletişimi
- Akıllı format algılama algoritması
- Blob ve File API ile indirme
- Clipboard API ile kopyalama

#### `server.py`
- Minimal HTTP server
- `.env` dosyası yükleyici
- Gemini API proxy
- Error handling
- CORS desteği

---

## ⚙️ Konfigürasyon

### Port Değiştirme

`server.py` dosyasında portu değiştirebilirsiniz:

```python
PORT = 8003  # İstediğiniz port numarası
```

### Farklı Gemini Modeli Kullanma

`server.py` dosyasında model değiştirme:

```python
# Mevcut: gemini-2.5-flash
url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"

# Alternatif: gemini-2.5-pro (daha güçlü ama yavaş)
url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key={api_key}"
```

### Timeout Ayarları

Python'da HTTP timeout eklemek için:

```python
import socket
socket.setdefaulttimeout(30)  # 30 saniye timeout
```

---

## 🐛 Sorun Giderme

### Problem: "API Key not configured in .env"

**Çözüm**: `.env` dosyasını oluşturun ve API anahtarınızı ekleyin:
```bash
echo 'GEMINI_API="YOUR_API_KEY_HERE"' > .env
```

### Problem: "Address already in use"

**Çözüm**: Portu değiştirin veya çalışan serveri durdurun:
```bash
# Linux/Mac
lsof -ti:8003 | xargs kill -9

# Windows
netstat -ano | findstr :8003
taskkill /PID <PID> /F
```

### Problem: "404 - Model not found"

**Çözüm**: 
- API anahtarınızın geçerli olduğundan emin olun
- Model adının doğru olduğunu kontrol edin (`gemini-2.5-flash`)
- İnternet bağlantınızı kontrol edin

### Problem: İndirme butonu görünmüyor

**Çözüm**: 
- Tarayıcı cache'ini temizleyin (`Ctrl+Shift+R` veya `Cmd+Shift+R`)
- Serveri yeniden başlatın
- Konsol hatalarını kontrol edin (`F12` → Console)

### Problem: CORS hatası

**Çözüm**: Uygulamayı `file://` yerine `http://localhost:8003` üzerinden açın.

---

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Projeye katkıda bulunmak için:

1. 🍴 Fork edin
2. 🌿 Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. 💾 Commit edin (`git commit -m 'Add amazing feature'`)
4. 📤 Push edin (`git push origin feature/amazing-feature`)
5. 🎉 Pull Request açın

### Katkı Kuralları

- ✅ Kod stiline uyun
- ✅ Açıklayıcı commit mesajları yazın
- ✅ Değişikliklerinizi test edin
- ✅ README'yi güncelleyin (gerekirse)

---

## 🎨 Ekran Görüntüleri

### Ana Sayfa
Modern, glassmorphism tasarımlı kullanıcı arayüzü.

### Oluşturma Süreci
Smooth animasyonlar ve gerçek zamanlı geri bildirim.

### Sonuç Ekranı
Akıllı format algılama ile dosya indirme seçenekleri.

---

## 📊 Performans

- ⚡ **İlk Yükleme**: ~500ms
- 🚀 **API Yanıt Süresi**: 1-3 saniye (Gemini 2.5 Flash)
- 💾 **Dosya Boyutu**: ~15KB (minified değil)
- 📱 **Mobil Uyumlu**: %100

---

## 🔒 Güvenlik


- ✅ Client-side form validation
- ✅ Error handling ve sanitization
- ✅ No external dependencies (güvenlik riski minimal)

---

## 🗺️ Yol Haritası

- [ ] Çoklu dil desteği (İngilizce, Türkçe)
- [ ] Özel format şablonları
- [ ] Geçmiş/history özelliği
- [ ] Karanlık/Aydınlık tema toggle
- [ ] Toplu indirme (batch processing)
- [ ] Export to different AI platforms
- [ ] Prompt library ve öneriler

---

## 📄 Lisans

Bu proje **GNU General Public License v3.0 (GPL-3.0)** altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

GPL-3.0, açık kaynak yazılımlar için en güçlü "copyleft" lisansıdır ve şunları garanti eder:
- ✅ Kaynak kodunu özgürce kullanabilir, değiştirebilir ve dağıtabilirsiniz
- ✅ Türev çalışmaların da GPL-3.0 ile lisanslanması zorunludur
- ✅ Patent hakları kullanıcılara açıkça verilir

---

## 👨‍💻 Geliştirici

**A VİBE CODER**
**İsim**: [Glass]  
**GitHub**: [@the91455](https://github.com/the91455)  
**Email**: the91455@tutamail.com

---

## 🙏 Teşekkürler

- [Google Gemini](https://ai.google.dev/) - Güçlü AI modeli için
- [Google Fonts](https://fonts.google.com/) - Outfit font ailesi için
- Tüm katkıda bulunanlara ❤️

---

<div align="center">

### ⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

**Made with ❤️ and 🤖 AI**

[⬆ Başa Dön](#-neurodata---ai-training-helper)

</div>
