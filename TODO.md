# NeuroData Geliştirme Yol Haritası (TODO)

## 1. AI & Model Yetenekleri
- [x] **Multi-modal Veri Üretimi**: Görsel (Image) desteği eklendi. (server.py + app.js)
- [x] **Fine-tuning Sihirbazı**: OpenAI, Gemini ve Instruction formatları eklendi.
- [x] **Bağlam Duyarlı Üretim**: Referans döküman (.txt, .md, .csv) desteği eklendi.
- [x] **Iterative Refinement (Chat)**: Üretilen veriyi sohbet ile güncelleme eklendi.
- [x] **Model Karşılaştırma**: Dual-pane karşılaştırma modu eklendi.

## 2. Kullanıcı Deneyimi (UI/UX) & Erişilebilirlik
- [x] **Sesli Komut Entegrasyonu**: Web Speech API ile sesli kontrol eklendi.
- [x] **Tam Klavye Navigasyonu**: Ctrl+Enter ve ? kısayolları eklendi.
- [x] **Etkileşimli Eğitim (Onboarding)**: Guided tour sistemi eklendi.
- [x] **Sürükle-Bırak Seed Veri**: Dosya bırakarak veri üretme eklendi.
- [x] **Şablon Kütüphanesi**: Kategorize edilmiş prompt şablonları eklendi.

## 3. Gelişmiş Formatlar & Dışa Aktarımı
- [x] **SQL Workbench Desteği**: PostgreSQL, MySQL, SQLite dialect desteği eklendi.
- [x] **GitHub Direct Push**: Doğrudan repository'ye commit desteği eklendi.
- [x] **Parquet & Avro Desteği**: Büyük veri formatları eklendi.
- [x] **XML & PDF Raporlama**: Kurumsal formatlar ve PDF raporlama eklendi.
- [x] **JSON Prettify**: Çıktıyı güzelleştirme ve auto-highlight eklendi.

## 4. Geliştirici Ekosistemi & Entegrasyonlar
- [x] **Yerel LLM Desteği**: Ollama entegrasyonu backend'e eklendi.
- [x] **VS Code Snippet Export**: VS Code uyumlu snippet dışa aktarma eklendi.
- [x] **Dockerize Deployment**: Proje Dockerize edildi.
- [x] **Webhook Desteği**: Veriyi dış URL'e POST etme eklendi.
- [x] **CLI Aracı**: Terminal üzerinden veri üretimi (cli.py) eklendi.

## 5. Analitik & Kalite Kontrol
- [x] **PII Maskeleme**: Kişisel verileri gizleme özelliği eklendi.
- [x] **Mükerrer Veri Kontrolü**: Deduplication (🧹) butonu eklendi.
- [x] **Visual Insights**: Chart.js ile veri görselleştirme modalı eklendi.
- [x] **Data Drift Simülatörü**: Evolve (📈) butonu ile veri evrimi eklendi.
- [x] **Regex Validasyon Paneli**: Çıktı formatı doğrulama sistemi eklendi.

---
**Durum:** %100 Tamamlandı ✅
**Sürüm:** 2.0.0 (NeuroData Enterprise)
