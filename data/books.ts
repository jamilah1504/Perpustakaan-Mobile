const books = [
  {
    id: 1,
    title: "Bumi",
    author: "Tere Liye",
    rating: 4.5,
    image: require("@/assets/images/bumi.png"),
    genres: ["Fiksi", "Fantasi", "Petualangan"],
    description:
      "Buku pertama dalam serial 'Bumi' yang mengisahkan petualangan magis Raib, seorang remaja yang menemukan kemampuan khusus dan dunia paralel yang menakjubkan.",
  },
  {
    id: 2,
    title: "Bulan",
    author: "Tere Liye",
    rating: 4.5,
    image: require("@/assets/images/bulan.png"),
    genres: ["Fiksi", "Fantasi", "Drama"],
    description:
      "Sequel dari 'Bumi' yang mengangkat kisah perjalanan Raib dan teman-temannya ke dunia Bulan, penuh dengan konflik emosional dan misteri yang menegangkan.",
  },
  {
    id: 3,
    title: "Matahari",
    author: "Tere Liye",
    rating: 4.2,
    image: require("@/assets/images/matahari.png"),
    genres: ["Fiksi", "Fantasi", "Petualangan"],
    description:
      "Petualangan epik kelanjutan serial 'Bumi' dimana Raib harus menghadapi tantangan terbesarnya di dunia Matahari yang penuh bahaya dan keajaiban.",
  },
  {
    id: 4,
    title: "Pemrograman Dasar",
    author: "Andi",
    rating: 4.0,
    image: require("@/assets/images/pemograman.png"),
    genres: ["Pemrograman", "Teknologi", "Pendidikan"],
    description:
      "Panduan komprehensif untuk pemula yang ingin mempelajari konsep dasar pemrograman dengan contoh-contoh praktis dalam berbagai bahasa populer.",
  },
  {
    id: 5,
    title: "Algoritma Struktur Data",
    author: "Budi",
    rating: 4.3,
    image: require("@/assets/images/strukturD.png"),
    genres: ["Pemrograman", "Algoritma", "Ilmu Komputer"],
    description:
      "Buku wajib bagi mahasiswa ilmu komputer yang menjelaskan struktur data fundamental dan algoritma dengan implementasi dalam kode nyata.",
  },
  {
    id: 6,
    title: "AI dan Machine Learning",
    author: "Citra",
    rating: 4.7,
    image: require("@/assets/images/ai.png"),
    genres: ["Kecerdasan Buatan", "Teknologi", "Data Science"],
    description:
      "Pengantar mendalam tentang kecerdasan buatan dan machine learning dengan studi kasus nyata dan penerapan di industri modern.",
  },
  {
    id: 7,
    title: "Pemrograman Web",
    author: "Citra",
    rating: 4.2,
    image: require("@/assets/images/pemweb.png"),
    genres: ["Web Development", "Pemrograman", "Frontend"],
    description:
      "Buku lengkap tentang pengembangan web modern mencakup HTML5, CSS3, JavaScript, dan framework populer seperti React dan Vue.",
  },
  {
    id: 8,
    title: "Pemrograman Berorientasi Object",
    author: "Citra",
    rating: 4.4,
    image: require("@/assets/images/pbo.png"),
    genres: ["Pemrograman", "OOP", "Ilmu Komputer"],
    description:
      "Penjelasan mendasar tentang konsep OOP (Object-Oriented Programming) dengan contoh implementasi dalam Java, C++, dan Python.",
  },
  {
    id: 9,
    title: "Pengolahan Citra Digital",
    author: "Citra",
    rating: 4.1,
    image: require("@/assets/images/citra.png"),
    genres: ["Computer Vision", "Teknologi", "Gambar Digital"],
    description:
      "Panduan praktis untuk pemrosesan gambar digital dan computer vision menggunakan OpenCV dan teknik-teknik mutakhir.",
  },
  {
    id: 10,
    title: "Sistem Pendukung Keputusan",
    author: "Citra",
    rating: 3.9,
    image: require("@/assets/images/keputusan.png"),
    genres: ["Sistem Informasi", "Manajemen", "Analisis Data"],
    description:
      "Membahas sistem cerdas untuk membantu pengambilan keputusan bisnis dengan studi kasus di berbagai sektor industri.",
  },
  {
    id: 11,
    title: "Data Mining",
    author: "Citra",
    rating: 4.5,
    image: require("@/assets/images/data.png"),
    genres: ["Data Science", "Analisis Data", "Big Data"],
    description:
      "Teknik-teknik canggih dalam mengekstrak pengetahuan dari dataset besar dengan penerapan di bidang bisnis dan penelitian.",
  },
  {
    id: 12,
    title: "Rekayasa Perangkat Lunak",
    author: "Citra",
    rating: 4.0,
    image: require("@/assets/images/rpl.png"),
    genres: ["Software Engineering", "Pemrograman", "Manajemen Proyek"],
    description:
      "Prinsip-prinsip pengembangan perangkat lunak yang mencakup seluruh siklus hidup produk dari analisis hingga maintenance.",
  },
  {
    id: 13,
    title: "Metode Penelitian",
    author: "Citra",
    rating: 3.8,
    image: require("@/assets/images/metodeP.png"),
    genres: ["Pendidikan", "Metodologi", "Penelitian"],
    description:
      "Pedoman lengkap untuk merancang dan melaksanakan penelitian akademis dengan metode kualitatif dan kuantitatif.",
  },
  {
    id: 14,
    title: "Laut Bercerita",
    author: "Leila S. Chudori",
    rating: 4.8,
    image: require("@/assets/images/laut_bercerita.png"),
    genres: ["Fiksi", "Sejarah", "Drama"],
    description:
      "Novel menyentuh tentang masa kelam Indonesia tahun 1998 yang mengisahkan perjuangan seorang aktivis mahasiswa melalui narasi yang memukau.",
  },
  {
    id: 15,
    title: "Clean Code",
    author: "Robert C. Martin",
    rating: 4.9,
    image: require("@/assets/images/clean_code.png"),
    genres: ["Pemrograman", "Software Engineering", "Best Practices"],
    description:
      "Bible-nya programmer untuk menulis kode yang bersih, mudah dipahami, dan dapat dikelola dengan prinsip-prinsip SOLID yang legendaris.",
  },
  {
    id: 16,
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.7,
    image: require("@/assets/images/atomic_habits.png"),
    genres: ["Pengembangan Diri", "Psikologi", "Produktivitas"],
    description:
      "Transformasi hidup melalui pembentukan kebiasaan kecil yang berdampak besar, dengan pendekatan ilmiah yang mudah diaplikasikan.",
  },
  {
    id: 17,
    title: "Dilan 1990",
    author: "Pidi Baiq",
    rating: 4.6,
    image: require("@/assets/images/dilan.png"),
    genres: ["Romance", "Coming of Age", "Fiksi Indonesia"],
    description:
      "Kisah cinta masa SMA di Bandung tahun 90-an yang nostaljik dan mengharu biru, mengangkat karakter Dilan yang ikonis.",
  },
  {
    id: 18,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    rating: 4.5,
    image: require("@/assets/images/psychology_money.png"),
    genres: ["Keuangan", "Psikologi", "Bisnis"],
    description:
      "Eksplorasi mendalam tentang hubungan manusia dengan uang melalui 19 cerita pendek yang penuh wawasan behavioral economics.",
  },
  {
    id: 19,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    rating: 4.8,
    image: require("@/assets/images/laskar_pelangi.png"),
    genres: ["Fiksi", "Drama", "Pendidikan"],
    description:
      "Epik pendidikan Indonesia tentang perjuangan anak-anak Belitung yang penuh inspirasi dan nilai-nilai kemanusiaan.",
  },
  {
    id: 20,
    title: "Belajar Cepat Flutter",
    author: "Eko Kurniawan",
    rating: 4.3,
    image: require("@/assets/images/flutter.png"),
    genres: ["Mobile Development", "Pemrograman", "Flutter"],
    description:
      "Panduan praktis membangun aplikasi cross-platform dengan Flutter dari dasar hingga penerapan state management modern.",
  },
  {
    id: 21,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    rating: 4.9,
    image: require("@/assets/images/sapiens.png"),
    genres: ["Sejarah", "Antropologi", "Filsafat"],
    description:
      "Potret revolusioner tentang sejarah umat manusia dari Zaman Batu hingga era digital dengan analisis yang mengubah paradigma.",
  },
  {
    id: 22,
    title: "Cantik Itu Luka",
    author: "Eka Kurniawan",
    rating: 4.7,
    image: require("@/assets/images/cantik_itu_luka.png"),
    genres: ["Fiksi", "Magical Realism", "Sastra Indonesia"],
    description:
      "Mahakarya sastra Indonesia yang memadukan realisme magis dengan kisah tragis seorang perempuan dalam pusaran sejarah bangsa.",
  },
  {
    id: 23,
    title: "Deep Work",
    author: "Cal Newport",
    rating: 4.6,
    image: require("@/assets/images/deep_work.png"),
    genres: ["Produktivitas", "Psikologi", "Pengembangan Diri"],
    description:
      "Strategi untuk mencapai fokus maksimal di era distraksi digital dan menguasai keterampilan kompleks dengan cepat.",
  },
  {
    id: 24,
    title: "Start With Why",
    author: "Simon Sinek",
    rating: 4.5,
    image: require("@/assets/images/start_with_why.png"),
    genres: ["Bisnis", "Kepemimpinan", "Pengembangan Diri"],
    description:
      "Kerangka kerja Golden Circle yang mengubah cara kita berpikir tentang inspirasi dan kepemimpinan dalam bisnis maupun kehidupan.",
  },
  {
    id: 25,
    title: "Bicara Itu Ada Seninya",
    author: "Oh Su Hyang",
    rating: 4.4,
    image: require("@/assets/images/bicara_itu_ada_seninya.png"),
    genres: ["Komunikasi", "Pengembangan Diri", "Psikologi"],
    description:
      "Seni komunikasi efektif yang diajarkan profesor komunikasi Korea melalui teknik-teknik praktis berbasis penelitian psikologis.",
  },
  {
    id: 26,
    title: "React Native Cookbook",
    author: "Dan Ward",
    rating: 4.2,
    image: require("@/assets/images/react_native.png"),
    genres: ["Mobile Development", "JavaScript", "React"],
    description:
      "Koleksi solusi praktis untuk membangun aplikasi mobile dengan React Native mencakup best practices dan pola arsitektur.",
  },
  {
    id: 27,
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    rating: 4.7,
    image: require("@/assets/images/filosofi_teras.png"),
    genres: ["Filsafat", "Pengembangan Diri", "Stoikisme"],
    description:
      "Adaptasi Stoicisme Yunani-Romawi untuk kehidupan modern Indonesia dengan pendekatan yang relevan dan mudah dipahami.",
  },
  {
    id: 28,
    title: "Kubernetes in Action",
    author: "Marko Luksa",
    rating: 4.8,
    image: require("@/assets/images/kubernetes.png"),
    genres: ["DevOps", "Cloud Computing", "Containerization"],
    description:
      "Panduan definitif untuk menguasai Kubernetes dari konsep dasar hingga penerapan sistem terdistribusi skala produksi.",
  },
];
export default books;
