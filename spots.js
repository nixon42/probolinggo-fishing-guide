/**
 * Probolinggo Coastal Fishing Guide - Spots Dataset
 * Comprehensive verified coastal, beach, breakwater, jetty, and estuary fishing spots in Probolinggo.
 * Source: Ground survey & local angler intelligence (Selat Madura coastline).
 */

const SPOTS_DATA = [
  {
    id: "spot_tanjung_tembaga",
    name: "Pelabuhan Tanjung Tembaga",
    localName: "Pelabuhan Lama Probolinggo & Terminal Baru DABN",
    subdistrict: "Mayangan",
    category: "Dermaga / Pelabuhan",
    imageUrl: "images/spots/spot_tanjung_tembaga.jpg",
    coordinates: {
      lat: -7.7285,
      lng: 113.2260
    },
    gmapsQuery: "Pelabuhan Tanjung Tembaga, Mayangan, Probolinggo, Jawa Timur",
    access: {
      roadType: "Jalan aspal pelabuhan lebar dan beton",
      vehicle: "Sepeda motor, mobil pribadi, dan truk angkutan",
      fee: "Tiket gerbang pelabuhan Rp 3.000 - Rp 5.000 per orang/kendaraan",
      safety: "Pos penjagaan Syahbandar 24 jam, area dermaga berpagar dan terang benderang"
    },
    terrain: "Dermaga beton komersial, plengsengan batu granit penahan ombak, dan bollard tambat kapal",
    bottomContour: "Lumpur",
    depth: "3.0m - 6.0m (kolam labuh dalam), 8.0m - 12.0m+ (alur pelayaran)",
    targetFish: [
      "species_kakap_putih",
      "species_kerapu",
      "species_kipper",
      "species_baronang",
      "species_belanak",
      "species_sembilang",
      "species_pari",
      "species_talang_talang",
      "species_kuwe",
      "species_mangrove_jack",
      "species_gerot_gerot",
      "species_kembung",
      "species_barakuda",
      "species_kerong_kerong"
    ],
    bestConditions: {
      tide: "Pasang beranjak naik hingga puncak pasang air mati (perbani) atau pasang malam",
      season: "Dapat dipancing sepanjang tahun; sangat terlindung dari terpaan Angin Gending",
      time: "Senja (16:30 - 19:30 WIB) dan malam hari (20:00 - 02:00 WIB) di bawah lampu dermaga"
    },
    hazards: [
      "Tali tambat kapal besar yang dapat menegang mendadak saat manuver kapal",
      "Lumut licin pada plengsengan batu miring dan tangga turun kapal",
      "Teritip tajam pada tiang pancang beton dermaga pemutus senar pancing"
    ]
  },
  {
    id: "spot_ppp_mayangan",
    name: "Breakwater PPP Mayangan",
    localName: "Batu Gajah Mayangan / Tetrapod Pelabuhan Baru",
    subdistrict: "Mayangan",
    category: "Breakwater",
    imageUrl: "images/spots/spot_ppp_mayangan.jpg",
    coordinates: {
      lat: -7.7252,
      lng: 113.2265
    },
    gmapsQuery: "Pelabuhan Perikanan Pantai Mayangan, Probolinggo, Jawa Timur",
    access: {
      roadType: "Jalan beton pelabuhan tembus kawasan TPI Mayangan",
      vehicle: "Sepeda motor dan mobil hingga area parkir dasar breakwater",
      fee: "Retribusi masuk PPP Mayangan Rp 3.000 - Rp 5.000 per orang",
      safety: "Aman di jalur paving; wajib waspada tinggi saat memanjat struktur tetrapod luar"
    },
    terrain: "Tumpukan tetrapod beton masif pemecah ombak dan batu gajah basal hitam menjorok ke laut lepas",
    bottomContour: "Tetrapod",
    depth: "5.0m - 10.0m+ (sisi luar laut lepas drop-off curam), 3.0m - 5.0m (kolam dalam)",
    targetFish: [
      "species_kakap_putih",
      "species_kerapu",
      "species_kipper",
      "species_baronang",
      "species_cendro",
      "species_talang_talang",
      "species_kuwe",
      "species_mangrove_jack",
      "species_gerot_gerot",
      "species_kuniran",
      "species_kembung",
      "species_barakuda",
      "species_kerong_kerong"
    ],
    bestConditions: {
      tide: "Pasang tenang atau pasang perbani saat air laut jernih berkilau",
      season: "Pancaroba dan Musim Barat tenang; hindari puncak Angin Gending saat ombak melimpas tetrapod",
      time: "Subuh (05:00 - 08:30 WIB) dan malam hari saat angin laut reda"
    },
    hazards: [
      "Celah tetrapod curam dan dalam; risiko tergelincir atau terjepit di antara blok beton",
      "Permukaan tetrapod berlumut basah dan cangkang tiram/teritip tajam",
      "Ombak pecah mendadak (rogue wave) saat angin timur kencang melanda"
    ]
  },
  {
    id: "spot_pantai_duta",
    isBeginnerFriendly: true,
    beginnerBadge: "🔰 Ramah Pemula & Wisata",
    beginnerReason: "Wisata alam Pokdarwis resmi berhutan cemara rindang dan pantai landai, cocok untuk mancing dasaran santai bersama keluarga tanpa gangguan.",
    name: "Pantai Duta Randutatah",
    localName: "Wisata Alam Mangrove & Cemara Laut Duta Paiton",
    subdistrict: "Paiton",
    category: "Pantai Pasir",
    imageUrl: "images/spots/spot_pantai_duta.jpg",
    coordinates: {
      lat: -7.7030,
      lng: 113.4793
    },
    gmapsQuery: "Pantai Duta, Randutatah, Paiton, Probolinggo, Jawa Timur",
    access: {
      roadType: "Jalan aspal mulus pedesaan dari Jalur Pantura Randutatah",
      vehicle: "Sepeda motor, mobil pribadi, hingga bus pariwisata",
      fee: "Tiket masuk Pokdarwis Rp 5.000 - Rp 10.000 per orang",
      safety: "Terkelola Pokdarwis resmi, parkir luas beratap pohon cemara dan aman"
    },
    terrain: "Pesisir pasir vulkanik landai dengan deretan pohon cemara laut rindang dan hutan mangrove lebat",
    bottomContour: "Pasir",
    depth: "0.5m - 1.5m (surut), 2.0m - 3.5m (pasang tertinggi jarak surf-casting 80m)",
    targetFish: [
      "species_kakap_putih",
      "species_kipper",
      "species_belanak",
      "species_sembilang",
      "species_pari",
      "species_cendro",
      "species_gerot_gerot",
      "species_kuniran",
      "species_senangin"
    ],
    bestConditions: {
      tide: "Awal pasang naik purnama hingga puncak pasang saat ikan forager masuk ke paparan pantai",
      season: "Sangat produktif saat Musim Timur dan kondisi air laut jernih kehijauan",
      time: "Pagi cerah (05:30 - 09:00 WIB) dan sore menjelang matahari terbenam (15:30 - 18:00 WIB)"
    },
    hazards: [
      "Ikan pari pasir yang berkamuflase di dasar pasir dangkal; wajib menyeret kaki (stingray shuffle)",
      "Akar tunjang mangrove tajam dan tiram bakau yang dapat merobek telapak kaki",
      "Sengatan beracun sirip sembilang di sekitar muara saluran tambak"
    ]
  },
  {
    id: "spot_pantai_bentar",
    isBeginnerFriendly: true,
    beginnerBadge: "🔰 Rekomendasi Pemula #1",
    beginnerReason: "Wisata resmi Pemda, jembatan dermaga kayu panjang menjorok ke laut. Tanpa perlu casting jauh (cukup ulur tali celup samping tiang dermaga). Ramah warga lokal & pasti strike kipper, kerapu cilik, dan belanak.",
    name: "Pantai Bentar Gending",
    localName: "The Bentar Beach / Dermaga Kayu & Wisata Hiu Tutul",
    subdistrict: "Gending",
    category: "Dermaga / Pelabuhan",
    imageUrl: "images/spots/spot_pantai_bentar.jpg",
    coordinates: {
      lat: -7.7800,
      lng: 113.2762
    },
    gmapsQuery: "Wisata Pantai Bentar, Gending, Probolinggo, Jawa Timur",
    access: {
      roadType: "Jalur Utama Pantura Probolinggo - Situbondo, 2 menit dari Exit Tol Gending Paspro",
      vehicle: "Semua jenis kendaraan (motor, mobil, bus besar)",
      fee: "Tiket masuk kawasan wisata Rp 10.000 - Rp 20.000 per orang",
      safety: "Kawasan wisata resmi pemda, pos keamanan 24 jam, area parkir aspal luas berpagar"
    },
    terrain: "Dermaga jembatan kayu dan beton panjang menjorok ke laut melintasi paparan pasang surut lumpur mangrove",
    bottomContour: "Lumpur",
    depth: "0.5m - 1.0m (surut), 2.5m - 4.5m (ujung dermaga saat pasang puncak)",
    targetFish: [
      "species_kakap_putih",
      "species_kerapu",
      "species_kipper",
      "species_baronang",
      "species_cendro",
      "species_belanak",
      "species_sembilang",
      "species_pari",
      "species_senangin",
      "species_kerong_kerong"
    ],
    bestConditions: {
      tide: "Pasang tinggi purnama wajib agar kedalaman air di bawah tiang jembatan memadai",
      season: "Januari - Maret saat musim ruaya rebon dan kemunculan hiu tutul non-target",
      time: "Pagi hari (06:00 - 10:00 WIB) dan sore hari teduh (15:00 - 18:00 WIB)"
    },
    hazards: [
      "Papan lantai dermaga kayu yang licin saat terkena embun pagi atau air laut",
      "Tepian dermaga tinggi tanpa pagar pengaman penuh di beberapa titik",
      "Senar tersangkut dan melilit tiram pada tiang pancang jembatan saat ikan melawan"
    ]
  },
  {
    id: "spot_muara_tongas",
    name: "Muara Sungai Tongas",
    localName: "Estuari Kali Tongas / Muara Pajurangan",
    subdistrict: "Tongas",
    category: "Muara / Estuari",
    imageUrl: "images/spots/spot_muara_tongas.jpg",
    coordinates: {
      lat: -7.7208,
      lng: 113.1090
    },
    gmapsQuery: "Muara Sungai Tongas, Tongas, Probolinggo, Jawa Timur",
    access: {
      roadType: "Jalan aspal pedesaan berlanjut makadam tanggul tambak",
      vehicle: "Paling optimal dengan sepeda motor; mobil dapat parkir di pemukiman tepi tambak",
      fee: "Akses publik gratis; parkir sukarela warga Rp 2.000 - Rp 5.000",
      safety: "Lingkungan pedesaan nelayan ramah; minim penerangan umum saat malam hari"
    },
    terrain: "Bantaran tanah tanggul tambak udang, delta muara bervegetasi bakau, dan palung sungai estuari",
    bottomContour: "Lumpur",
    depth: "1.0m - 2.0m (aliran sungai), 2.5m - 4.0m (palung tikungan dan pintu muara saat pasang)",
    targetFish: [
      "species_kakap_putih",
      "species_kerapu",
      "species_belanak",
      "species_sembilang",
      "species_mangrove_jack",
      "species_kedukang"
    ],
    bestConditions: {
      tide: "Arus pasang naik awal (air mulai bergerak masuk) hingga 1 jam setelah pasang puncak",
      season: "Air hijau payau stabil; hindari saat banjir kiriman lahar dingin/lumpur dari hulu pegunungan",
      time: "Subuh (05:00 - 08:30 WIB) dan malam hari gelap (18:00 - 22:30 WIB)"
    },
    hazards: [
      "Endapan lumpur hisap pekat di tepi aliran muara yang dapat menenggelamkan kaki hingga lutut",
      "Kayu hanyut dan ranting bakau terendam pemutus lure casting",
      "Sengatan mematikan bisa ikan sembilang dan kedukang berukuran besar"
    ]
  },
  {
    id: "spot_pantai_bahak",
    isBeginnerFriendly: true,
    beginnerBadge: "🔰 Wisata Pantai & Pemula",
    beginnerReason: "Pantai wisata desa dengan groyne batu pemecah ombak dan anjungan menara pandang, parkir resmi, teduh cemara, cocok untuk santai pasiran.",
    name: "Pantai Bahak Indah Tongas",
    localName: "Bahak Beach / Wisata Anjungan Curahdringu",
    subdistrict: "Tongas",
    category: "Pantai Pasir",
    imageUrl: "images/spots/spot_pantai_bahak.jpg",
    coordinates: {
      lat: -7.7250,
      lng: 113.1175
    },
    gmapsQuery: "Pantai Bahak Indah, Tongas, Probolinggo, Jawa Timur",
    access: {
      roadType: "Jalan aspal hotmix pedesaan Curahdringu dari Pantura Tongas",
      vehicle: "Sepeda motor, mobil pribadi, hingga minibus elf",
      fee: "Retribusi tiket wisata desa Rp 5.000 - Rp 10.000 per orang",
      safety: "Area parkir resmi wisata dekat menara pandang, terpantau pengelola desa"
    },
    terrain: "Pantai pasir besi hitam berombak tenang, groyne pemecah gelombang batu, dan kanopi pohon cemara udang",
    bottomContour: "Pasir",
    depth: "0.5m - 1.2m (paparan dekat), 2.0m - 3.5m (jarak lempar pasiran 60-100m saat pasang)",
    targetFish: [
      "species_kipper",
      "species_cendro",
      "species_belanak",
      "species_sembilang",
      "species_pari",
      "species_kedukang",
      "species_kuniran",
      "species_senangin"
    ],
    bestConditions: {
      tide: "Pasang naik beranjak 2 jam setelah air surut terendah hingga menjelang puncak",
      season: "Musim peralihan atau Musim Timur saat pagi hari tanpa terpaan angin badai",
      time: "Fajar pagi (05:00 - 08:30 WIB) dengan air laut kaca tenang sebelum angin laut bertiup"
    },
    hazards: [
      "Ikan pari pasir yang bersembunyi di mintakat deburan ombak pantai",
      "Hembusan pasir halus terbawa angin kencang yang dapat mengotori bearing reel pancing",
      "Sengatan terik sinar matahari terbuka tanpa peneduh di tepi deburan ombak"
    ]
  },
  {
    id: "spot_kalibuntu_kraksaan",
    name: "Dermaga & Muara Kalibuntu",
    localName: "TPI Kalibuntu / Pelabuhan Perahu Slerek Kraksaan",
    subdistrict: "Kraksaan",
    category: "Dermaga / Pelabuhan",
    imageUrl: "images/spots/spot_kalibuntu_kraksaan.jpg",
    coordinates: {
      lat: -7.7335,
      lng: 113.4185
    },
    gmapsQuery: "Dermaga TPI Kalibuntu, Kraksaan, Probolinggo, Jawa Timur",
    access: {
      roadType: "Jalan raya beraspal 2 lajur dari pusat Kota Kraksaan (3 km ke utara)",
      vehicle: "Sepeda motor, mobil pribadi, dan truk engkel pengangkut ikan",
      fee: "Parkir TPI Rp 2.000 - Rp 5.000; spot mancing bebas retribusi khusus",
      safety: "Aktivitas bongkar muat nelayan 24 jam nonstop; sangat ramai dan aman untuk mancing malam"
    },
    terrain: "Dermaga tambat perahu kayu nelayan bertembok beton, tanggul plengsengan muara, dan hamparan mangrove",
    bottomContour: "Lumpur",
    depth: "1.2m - 2.0m (surut), 2.5m - 4.5m (kolam dermaga saat pasang naik)",
    targetFish: [
      "species_kakap_putih",
      "species_kerapu",
      "species_kipper",
      "species_belanak",
      "species_sembilang",
      "species_pari",
      "species_mangrove_jack",
      "species_kedukang",
      "species_gerot_gerot",
      "species_kerong_kerong"
    ],
    bestConditions: {
      tide: "Arus pasang masuk dari Selat Madura malam hari yang membawa kawanan udang rebon dan anakan belanak",
      season: "Sangat potensial sepanjang musim; melimpah pakan alami sisa rucahan ikan nelayan",
      time: "Malam hari (20:00 - 03:00 WIB) dan subuh (04:30 - 07:00 WIB) di sela tambatan perahu"
    },
    hazards: [
      "Lantai beton dermaga licin akibat tumpahan solar perahu, lendir ikan, dan lumut basah",
      "Tali tambat jukung yang melintang dan perahu nelayan yang bermanuver sandar",
      "Tiram tajam pada lambung perahu kayu dan tiang pancang dermaga"
    ]
  },
  {
    id: "spot_binor_harmony",
    isBeginnerFriendly: true,
    beginnerBadge: "🔰 Sangat Ramah Pemula",
    beginnerReason: "Area wisata Resto Bohay & pantai berpagar groyne batu tertib, air jernih, sarang ikan karang & pelagis kecil, fasilitas restoran/toilet lengkap, sangat aman & nyaman.",
    name: "Pantai Binor Harmony",
    localName: "Pantai Bohay Paiton / Karang Kanal PLTU Paiton",
    subdistrict: "Paiton",
    category: "Breakwater",
    imageUrl: "images/spots/spot_binor_harmony.jpg",
    coordinates: {
      lat: -7.7052,
      lng: 113.5255
    },
    gmapsQuery: "Pantai Bohay Binor Harmony, Paiton, Probolinggo, Jawa Timur",
    access: {
      roadType: "Gerbang resmi tepi Jalan Raya Pantura Paiton dekat kompleks PLTU",
      vehicle: "Semua jenis kendaraan (motor, mobil, bus pariwisata)",
      fee: "Tiket masuk wisata pantai Rp 10.000 per orang; parkir Rp 3.000 - Rp 5.000",
      safety: "Kawasan wisata privat Resto Bohay aman berpagar; patuhi batas larangan masuk zona vital PLTU"
    },
    terrain: "Tebing karang alami, groyne pemecah ombak batu granit, dan pantai pasir berbatu menghadap perairan dalam",
    bottomContour: "Karang / Bebatuan",
    depth: "3.0m - 8.0m (tepian groyne karang), 12.0m - 18.0m+ (alur luar Selat Madura)",
    targetFish: [
      "species_kerapu",
      "species_baronang",
      "species_cendro",
      "species_talang_talang",
      "species_kuwe",
      "species_mangrove_jack",
      "species_kembung",
      "species_barakuda"
    ],
    bestConditions: {
      tide: "Pasang mati (perbani) atau pasang tenang saat kejernihan air optimal untuk micro jigging & casting",
      season: "Air hangat akibat outfall kondensor PLTU menarik gerombolan ikan pelagis sepanjang tahun",
      time: "Fajar subuh (05:00 - 08:00 WIB) untuk casting dan malam (18:30 - 23:00 WIB) untuk mancing cumi"
    },
    hazards: [
      "Celah karang terjal rawan tersangkut timah pemberat dan lure minnow",
      "Arus deras di ujung bebatuan luar menuju alur pelayaran kapal tongkang batubara",
      "Larangan tegas melintasi batas keamanan instalasi pipa pendingin objek vital nasional PLTU Paiton"
    ]
  },
  {
    id: "spot_pantai_tambakrejo",
    name: "Pantai Tambakrejo Tongas",
    localName: "Tongas Beach / Pesisir Tambak Bayeman",
    subdistrict: "Tongas",
    category: "Pantai Pasir",
    imageUrl: "images/spots/spot_pantai_tambakrejo.jpg",
    coordinates: {
      lat: -7.7034,
      lng: 113.0881
    },
    gmapsQuery: "Pantai Tambakrejo, Tongas, Probolinggo, Jawa Timur",
    access: {
      roadType: "Jalan desa paving beralih ke jalan tanah padat tanggul tambak dari Bayeman",
      vehicle: "Sepeda motor sangat disarankan; mobil berjarak parkir 300m dari bibir air",
      fee: "Gratis akses publik; parkir swadaya warga Rp 2.000 - Rp 3.000",
      safety: "Kawasan pesisir tambak hening; disarankan datang berkelompok saat malam"
    },
    terrain: "Pesisir pasir pantai bercampur lumpur organik di depan saluran pembuangan tambak udang intensif",
    bottomContour: "Lumpur",
    depth: "0.5m - 1.5m (surut rata), 2.0m - 2.8m (pasang penuh)",
    targetFish: [
      "species_kakap_putih",
      "species_kipper",
      "species_belanak",
      "species_sembilang",
      "species_pari",
      "species_kedukang",
      "species_senangin"
    ],
    bestConditions: {
      tide: "Pasang naik malam hari bertepatan dengan jadwal pembuangan air sirkulasi tambak udang",
      season: "Puncak musim kemarau dan awal musim hujan saat biota dasar berkembang biak",
      time: "Malam hari (19:00 - 01:00 WIB) dan pagi teduh (05:00 - 07:30 WIB)"
    },
    hazards: [
      "Populasi ikan sembilang dan keting berkepala duri beracun sangat padat; wajib membawa tang penjepit",
      "Minim penerangan lampu pantai; wajib membawa senter kepala cadangan",
      "Kubangan lumpur lembek di dekat pintu klep pembuangan air tambak"
    ]
  },
  {
    id: "spot_dermaga_muara_pajarakan",
    name: "Dermaga & Muara Pajarakan",
    localName: "Muara Kali Pajarakan / Pesisir Penambangan",
    subdistrict: "Pajarakan",
    category: "Muara / Estuari",
    imageUrl: "images/spots/spot_dermaga_muara_pajarakan.jpg",
    coordinates: {
      lat: -7.7460,
      lng: 113.3895
    },
    gmapsQuery: "Muara Penambangan, Pajarakan, Probolinggo, Jawa Timur",
    access: {
      roadType: "Jalan beton desa Penambangan belok utara dari Jalur Pantura Pajarakan",
      vehicle: "Sepeda motor dan mobil pribadi dengan ruang papasan di bahu jalan",
      fee: "Akses bebas tanpa tiket gerbang; parkir sukarela Rp 2.000 - Rp 3.000",
      safety: "Pemukiman nelayan tradisional tenang dengan tambatan perahu jukung"
    },
    terrain: "Pertemuan muara Sungai Pajarakan dengan Selat Madura, diapit plengsengan batu dan rimbun bakau",
    bottomContour: "Lumpur",
    depth: "0.6m - 1.2m (surut pasir timbul), 1.8m - 3.2m (alur perahu saat pasang)",
    targetFish: [
      "species_kakap_putih",
      "species_kerapu",
      "species_kipper",
      "species_belanak",
      "species_sembilang",
      "species_mangrove_jack",
      "species_kedukang"
    ],
    bestConditions: {
      tide: "Pasang naik sedang saat air laut asin jernih mendesak masuk ke mulut muara",
      season: "Musim kemarau saat debit air sungai jernih kehijauan tidak keruh cokelat",
      time: "Pagi hari (05:00 - 08:30 WIB) dan sore menjelang isya (16:30 - 19:30 WIB)"
    },
    hazards: [
      "Beting pasir dan lumpur yang berpindah-pindah akibat sedimentasi muara sungai",
      "Arus surut yang cukup kencang pada celah sempit mulut muara",
      "Duri beracun sembilang muara dan lele laut kedukang"
    ]
  },
  {
    id: "spot_muara_kali_banger",
    name: "Muara Sungai Banger",
    localName: "Muara Kali Banger / Pesisir Mangrove BJBR Mayangan",
    subdistrict: "Mayangan",
    category: "Muara / Estuari",
    imageUrl: "images/spots/spot_muara_kali_banger.jpg",
    coordinates: {
      lat: -7.7340,
      lng: 113.2205
    },
    gmapsQuery: "Muara Kali Banger BJBR, Mayangan, Probolinggo, Jawa Timur",
    access: {
      roadType: "Jalan perkotaan aspal mulus Jl. Lingkar Utara dan Jl. Suroyo Kota Probolinggo",
      vehicle: "Semua kendaraan pribadi motor dan mobil dengan parkir pinggir jalan",
      fee: "Akses publik gratis di sepanjang tanggul plengsengan muara",
      safety: "Kawasan perkotaan dekat pelabuhan dengan penerangan lampu jalan memadai"
    },
    terrain: "Tanggul plengsengan beton kanal perkotaan, pintu air pengendali rob, dan sabuk mangrove BJBR",
    bottomContour: "Lumpur",
    depth: "0.5m - 1.2m (surut), 1.5m - 2.8m (pintu kanal saat air laut pasang puncak)",
    targetFish: [
      "species_kakap_putih",
      "species_kipper",
      "species_belanak",
      "species_sembilang",
      "species_mangrove_jack",
      "species_kedukang",
      "species_kerong_kerong"
    ],
    bestConditions: {
      tide: "Pasang besar (spring tide) yang mendorong gerombolan belanak masuk ke mulut kanal perkotaan",
      season: "Paling produktif saat air payau tenang; hindari sesaat pasca hujan deras badai kota",
      time: "Sore menuju malam hari (16:30 - 21:00 WIB) memanfaatkan pendaran lampu perkotaan"
    },
    hazards: [
      "Sampah hanyut dan potongan jaring bekas nelayan yang berpotensi menyangkutkan mata kail",
      "Dinding miring beton plengsengan yang berlumut licin",
      "Debit air mendadak meninggi bila pintu pengendali banjir dibuka dari hulu"
    ]
  },
  {
    id: "spot_pantai_curah_dringu",
    name: "Pantai Curah Dringu",
    localName: "Pantai Pesisir Dringu / Muara Kali Bauk Pabean",
    subdistrict: "Dringu",
    category: "Pantai Pasir",
    imageUrl: "images/spots/spot_pantai_curah_dringu.jpg",
    coordinates: {
      lat: -7.7445,
      lng: 113.2548
    },
    gmapsQuery: "Pantai Dringu, Dringu, Probolinggo, Jawa Timur",
    access: {
      roadType: "Jalan pedesaan aspal dan paving melintasi sentra persawahan bawang merah Dringu",
      vehicle: "Sepeda motor dan mobil pribadi dengan ruang parkir teduh tepi pantai",
      fee: "Gratis akses publik; retribusi parkir lokal Rp 2.000 - Rp 3.000",
      safety: "Pesisir agraris pedesaan yang tenang, asri, dan aman untuk pemancing harian"
    },
    terrain: "Hamparan pasir vulkanik kelabu luas, muara parit pesisir, dan rumpun mangrove alami",
    bottomContour: "Pasir",
    depth: "0.6m - 1.5m (surut), 2.0m - 2.8m (pasang purnama jarak surf casting)",
    targetFish: [
      "species_kakap_putih",
      "species_kipper",
      "species_belanak",
      "species_sembilang",
      "species_pari",
      "species_kedukang",
      "species_kuniran",
      "species_senangin"
    ],
    bestConditions: {
      tide: "Pasang purnama naik saat air laut menggenangi paparan pasir kaya cacing laut dan kerang",
      season: "Musim peralihan dan Musim Timur saat angin darat-laut bersahabat",
      time: "Pagi hari (05:30 - 08:30 WIB) dan sore santai (15:30 - 18:00 WIB)"
    },
    hazards: [
      "Endapan lumpur lunak di sekitar muara parit Kali Bauk",
      "Ikan pari pasir yang berkamuflase di ceruk pasir dekat deburan ombak",
      "Duri beracun sembilang pasir dan keting laut"
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SPOTS_DATA };
}
if (typeof window !== 'undefined') {
  window.SPOTS_DATA = SPOTS_DATA;
}
