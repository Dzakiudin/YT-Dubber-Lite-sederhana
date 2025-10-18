#YT Dubber Lite  sederhana
Ekstensi Chrome sederhana untuk memberikan dubbing (sulih suara) secara real-time pada video YouTube dengan membaca dan menerjemahkan subtitle yang tersedia. Proyek ini sepenuhnya gratis, open-source, dan menggunakan API bawaan peramban.

Demo Singkat
(Sangat disarankan untuk menambahkan GIF singkat yang menunjukkan cara kerja ekstensi di sini. Ini akan sangat meningkatkan daya tarik proyek Anda.)

✨ Fitur Utama
-Dubbing Real-Time: Mendengarkan sulih suara dari subtitle video secara langsung saat video diputar.
-Penerjemah Otomatis: Menerjemahkan teks subtitle dari bahasa apa pun ke bahasa pilihan Anda secara otomatis.
-Dukungan Multi-Bahasa: Pilih bahasa target dubbing Anda dari daftar yang tersedia.
-Gratis & Tanpa Server: Berjalan sepenuhnya di peramban Anda menggunakan Web Speech API dan API terjemahan publik, tanpa memerlukan biaya server atau kunci API.
-Kontrol Sederhana: UI yang minimalis untuk mengaktifkan, menonaktifkan, dan mengatur bahasa dubbing dengan mudah.

⚙️ Cara Kerja
Ekstensi ini bekerja dengan alur yang cerdas dan efisien di dalam peramban Anda:
1. Mengamati Subtitle: Saat diaktifkan, ekstensi akan memonitor jendela subtitle YouTube untuk setiap perubahan teks.
2. Mendeteksi Kata Baru: Logika cerdasnya hanya mengambil kata-kata baru yang muncul, menghindari pengulangan kalimat yang sama.
3. Menerjemahkan Teks: Potongan teks baru dikirim ke API terjemahan publik untuk diubah ke bahasa target.
4. Mengucapkan Teks: Teks yang sudah diterjemahkan dimasukkan ke dalam antrian dan diucapkan oleh narator menggunakan Text-to-Speech (TTS) API bawaan peramban.
5. Membisukan Video Asli: Untuk pengalaman yang imersif, suara video asli akan otomatis dibisukan saat dubbing aktif.

🛠️ Instalasi (dari Kode Sumber)
Karena ekstensi ini belum dipublikasikan di Chrome Web Store, Anda perlu memuatnya secara manual:
1. Unduh atau Clone Repositori:
   git clone [URL_REPOSITORI_ANDA_DI_SINI]
   Atau unduh file ZIP dan ekstrak ke sebuah folder.
2. Buka Halaman Ekstensi Chrome: Buka chrome://extensions di peramban Chrome Anda.
3. Aktifkan Mode Developer: Di pojok kanan atas, aktifkan saklar "Mode Developer".
4. Muat Ekstensi: Klik tombol "Muat yang belum dibuka" (Load unpacked).
5. Pilih Folder Proyek: Arahkan ke folder tempat Anda menyimpan kode ekstensi ini, lalu klik "Pilih Folder".
6. Selesai! Ikon ekstensi akan muncul di bilah alat Chrome Anda.

🚀 Cara Penggunaan
1. hidupin ekstensi dub-nya
2. refresh halaman youtube
3. matikan dan hidupin lagi ekstensi dub-nya
4. aktifkan subtitle
done

💻 Teknologi yang Digunakan
-JavaScript (ES6+)
-HTML5 & CSS3
-Chrome Extension Manifest V3 API
-Web Speech API (SpeechSynthesis)
-Google Translate API (Public)

🙌 Kontribusi
Kontribusi sangat diterima! Jika Anda punya ide untuk fitur baru, perbaikan bug, atau peningkatan lainnya, jangan ragu untuk membuka issue atau mengirimkan pull request.

📄 Lisensi
Proyek ini dilisensikan di bawah Lisensi MIT.
