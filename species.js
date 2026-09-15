/**
 * Probolinggo Coastal Fishing Guide - Fish Species Dataset
 * Comprehensive verified coastal, estuarine, and marine fish species of Probolinggo (Selat Madura).
 * Source: Ground survey & local angler intelligence with tactical rigging and bait advice.
 */

const FISH_DATA = [
  {
    id: "species_kakap_putih",
    name: "Kakap Putih / Barramundi",
    localName: "Ikan Cukil / Pelak / Siakap Muara",
    scientificName: "Lates calcarifer",
    englishName: "Barramundi / Asian Sea Bass",
    wikiUrl: "https://id.wikipedia.org/wiki/Kakap_putih",
    imageUrl: "images/species/species_kakap_putih.jpg",
    waterLayer: "Dasar",
    feedingTime: "Subuh (04:00 - 05:45 WIB), Senja & Malam Hari (18:00 - 22:30 WIB)",
    optimalTemp: "27°C - 31°C",
    weatherPreference: "Air payau kehijauan dengan arus pasang naik awal; cuaca mendung redup atau malam tenang; hindari air banjir cokelat pekat",
    naturalBaits: [
      "Udang vaname hidup (7-10 cm), ditusuk dari ruas ekor terakhir agar tetap lincah berenang aktif",
      "Anakan ikan belanak hidup (8-12 cm), dikaitkan pada bagian bibir atas atau punggung belakang sirip dorsal",
      "Anakan wader laut atau ikan nila payau hidup untuk memancing babon di muara sungai"
    ],
    artificialLures: [
      "Sinking & Suspending Minnow (8-12 cm, 10-18g, e.g. Rapala Countdown/Storm So-Run) dengan ritme twitch-twitch-pause di tepi struktur",
      "Paddle Tail Soft Plastic (3-4 inci) ber-jighead 7g-14g, dimainkan dengan teknik slow roll menyusuri dasar lumpur",
      "Topwater Pencil & Popper (9-11 cm) yang dimainkan gaya walk-the-dog melintasi kanal bakau saat fajar"
    ],
    tackleRigging: {
      line: "Braided PE 1.5 - PE 2.5 (kekuatan 20 - 35 lb)",
      leader: "100% Fluorocarbon 30 - 40 lb sepanjang 1.5 - 2 meter tahan gesekan operkulum insang tajam",
      hook: "Chinu No. 5 - 7 atau Live Bait Hook No. 1/0 - 2/0 wide gap",
      technique: "Pelampung gantung hanyut di arus atau dasaran glosor (running sinker Carolina rig) dekat tiang dan celah tetrapod"
    },
    productiveSpotIds: [
      "spot_tanjung_tembaga",
      "spot_ppp_mayangan",
      "spot_pantai_duta",
      "spot_pantai_bentar",
      "spot_muara_tongas",
      "spot_kalibuntu_kraksaan",
      "spot_pantai_tambakrejo",
      "spot_dermaga_muara_pajarakan",
      "spot_muara_kali_banger",
      "spot_pantai_curah_dringu"
    ]
  },
  {
    id: "species_kerapu",
    name: "Kerapu Lumpur & Karang",
    localName: "Ikan Kerapu Balong / Kerapu Macan / Kerapu Bintik",
    scientificName: "Epinephelus coioides / Epinephelus merra",
    englishName: "Estuary Grouper / Orange-spotted Grouper",
    wikiUrl: "https://id.wikipedia.org/wiki/Kerapu",
    imageUrl: "images/species/species_kerapu.jpg",
    waterLayer: "Dasar",
    feedingTime: "Senja s/d Subuh (17:30 - 21:00 WIB dan 03:30 - 06:30 WIB); oportunistik saat cuaca berawan",
    optimalTemp: "27°C - 30°C",
    weatherPreference: "Kondisi air laut stabil tidak terlalu keruh; pasang tertinggi saat genangan air memasuki rongga tetrapod dan karang",
    naturalBaits: [
      "Udang tambak hidup ukuran sedang, dikaitkan tembus ruas ekor",
      "Kepiting karang kecil / kepiting soka muda yang dikaitkan di pangkal kaki belakang",
      "Irisan fillet ikan tongkol atau tembang segar berminyak untuk mancing malam dasaran"
    ],
    artificialLures: [
      "Soft Plastic Grub & Ribbed Paddle Tail (3 inci) dengan jighead berat 10g-18g, dibenturkan ke bebatuan dasar",
      "Micro Jig (15g - 25g) slow fall, dimainkan vertikal di sela-sela tetrapod pelabuhan",
      "Deep Diving Crankbait yang sanggup mengetuk struktur batu pemecah ombak"
    ],
    tackleRigging: {
      line: "Braided PE 2.0 - PE 3.0 (reel drag disetel mati/kencang)",
      leader: "Fluorocarbon tebal 30 - 50 lb (1.5 meter) penahan gesekan teritip karang tajam",
      hook: "Heavy wire Chinu No. 6 - 8 atau O'Shaughnessy No. 1/0 - 2/0",
      technique: "Rangkaian dasaran timah bawah (paternoster dropper rig) dengan timah gantung berbeban berat agar tidak mudah hanyut ke celah batu"
    },
    productiveSpotIds: [
      "spot_tanjung_tembaga",
      "spot_ppp_mayangan",
      "spot_pantai_bentar",
      "spot_muara_tongas",
      "spot_kalibuntu_kraksaan",
      "spot_binor_harmony",
      "spot_dermaga_muara_pajarakan"
    ]
  },
  {
    id: "species_kipper",
    name: "Kipper / Ketang-ketang",
    localName: "Ikan Ketang / Kiper Totol / Tembel",
    scientificName: "Scatophagus argus",
    englishName: "Spotted Scat / Butterfish",
    wikiUrl: "https://id.wikipedia.org/wiki/Kipper",
    imageUrl: "images/species/species_kipper.jpg",
    waterLayer: "Tengah",
    feedingTime: "Siang hari visual (07:30 - 16:30 WIB), puncak keaktifan pukul 09:00 - 11:30 dan 14:00 - 16:00 WIB",
    optimalTemp: "27°C - 32°C",
    weatherPreference: "Sangat toleran air payau pelabuhan; aktif saat cuaca cerah hangat dengan riak ombak tenang di sekitar tiang dermaga",
    naturalBaits: [
      "Cacing laut (cacing lur / cacing nipah) dipotong kecil seukuran kail",
      "Udang kupas segar dipotong dadu seukuran butir jagung",
      "Adonan pasta biskuit kelapa kukus dicampur terasi dan vanili aroma wangi gurih"
    ],
    artificialLures: [
      "Micro assist fly berbulu mutiara ukuran No. 14 - 16 yang dihanyutkan dengan pelampung jarum",
      "Micro soft lure (0.8 - 1.2 inci) beraroma udang dengan micro tungsten jighead 0.8g - 1.5g"
    ],
    tackleRigging: {
      line: "Monofilament 4 - 6 lb atau Braided PE 0.4 - 0.8 halus",
      leader: "Fluorocarbon 8 - 12 lb sepanjang 1 meter",
      hook: "Kail halus tajam Chinu No. 0.5 - 1.5 atau Tanago Hook No. 4 - 6",
      technique: "Rangkaian pelampung jarum / pen float sensitif yang disetel mengambang pada kedalaman 1.0 - 2.2 meter di samping tiang dermaga"
    },
    productiveSpotIds: [
      "spot_tanjung_tembaga",
      "spot_ppp_mayangan",
      "spot_pantai_duta",
      "spot_pantai_bentar",
      "spot_pantai_bahak",
      "spot_kalibuntu_kraksaan",
      "spot_pantai_tambakrejo",
      "spot_dermaga_muara_pajarakan",
      "spot_muara_kali_banger",
      "spot_pantai_curah_dringu"
    ]
  },
  {
    id: "species_baronang",
    name: "Baronang / Rabbitfish",
    localName: "Ikan Samadar / Baronang Angin / Baronang Tompel / Jabing",
    scientificName: "Siganus canaliculatus / Siganus javus",
    englishName: "White-spotted Spinefoot / Streaked Rabbitfish",
    wikiUrl: "https://id.wikipedia.org/wiki/Baronang",
    imageUrl: "images/species/species_baronang.jpg",
    waterLayer: "Tengah",
    feedingTime: "Siang hari murni (06:30 - 11:30 WIB dan 14:30 - 17:00 WIB); berhenti makan total saat gelap malam",
    optimalTemp: "28°C - 31°C",
    weatherPreference: "Air laut jernih kehijauan dengan arus pasang naik; hembusan Angin Gending tidak menghalangi nafsu makan selama air tidak keruh banjir",
    naturalBaits: [
      "Lumut laut hijau sutra (lumut jaring halus), dililitkan rapi menutupi mata kail garong",
      "Adonan kukus tepung terigu, pelet udang, dan ebi fermentasi bertekstur kenyal lembut",
      "Daging udang kupas cincang halus dilinting tipis pada mata kail tunggal tandem"
    ],
    artificialLures: [
      "Ikan herbivora/omnivora; tidak menyambar umpan tiruan buatan, ditargetkan eksklusif dengan teknik tradisional"
    ],
    tackleRigging: {
      line: "High tensile monofilament nylon 8 - 14 lb atau PE 0.8 lentur",
      leader: "Fluorocarbon 10 - 15 lb sepanjang 1 meter",
      hook: "Kail Garong (jangkar bintang 6 mata) No. 5, 6, atau 7; alternatif kail tunggal Chinu No. 0.8 - 1 tandem",
      technique: "Teknik 'Mancing Garong' menggunakan joran tegek kaku carbon 4.5m - 6.3m dengan pelampung balsa sensitif berantena panjang (gentak cepat saat pelampung tenggelam 5mm)"
    },
    productiveSpotIds: [
      "spot_tanjung_tembaga",
      "spot_ppp_mayangan",
      "spot_pantai_bentar",
      "spot_binor_harmony"
    ]
  },
  {
    id: "species_cendro",
    name: "Cendro / Needlefish",
    localName: "Ikan Kacang-kacang / Cendro / Ikan Jarum",
    scientificName: "Tylosurus crocodilus",
    englishName: "Houndfish / Crocodile Needlefish",
    wikiUrl: "https://en.wikipedia.org/wiki/Houndfish",
    imageUrl: "images/species/species_cendro.jpg",
    waterLayer: "Permukaan",
    feedingTime: "Siang hari terik (08:00 - 15:30 WIB) saat sinar matahari menyinari lapisan atas air laut",
    optimalTemp: "28°C - 32°C",
    weatherPreference: "Air laut jernih biru/kehijauan dengan riak gelombang permukaan yang memecah bayangan siluet",
    naturalBaits: [
      "Ikan teri segar utuh atau anakan belanak hidup yang dipasang mengambang di permukaan",
      "Irisan memanjang kulit ikan kembung / tembang yang berkilat memantulkan cahaya matahari"
    ],
    artificialLures: [
      "Surface Skipping Needle & Pencil Lure (10-14 cm) yang ditarik kencang melompat-lompat di atas air",
      "Chrome Casting Spoon (15g - 25g) dengan teknik retrieval super cepat di permukaan (skittering)",
      "Lure jeratan benang sutra oranye/merah tanpa kail (gigi tajam cendro terbelit rapat pada serat benang)"
    ],
    tackleRigging: {
      line: "Braided PE 1.0 - PE 1.5 pada joran panjang 7'6\" - 8'6\" untuk lontaran jarak jauh",
      leader: "Kawat nikelin halus 15-20 lb (15 cm) atau Fluorocarbon kaku 30-40 lb penahan gigi paruh tajam",
      hook: "Long shank J-Hook No. 1 - 2 atau treble hook tahan karat No. 4",
      technique: "Pelampung lempar berbobot (torpedo casting float 30-50g) dengan umpan hanyut di kedalaman 20 - 50 cm permukaan"
    },
    productiveSpotIds: [
      "spot_ppp_mayangan",
      "spot_pantai_duta",
      "spot_pantai_bentar",
      "spot_pantai_bahak",
      "spot_binor_harmony"
    ]
  },
  {
    id: "species_talang_talang",
    name: "Talang-talang / Queenfish",
    localName: "Ikan Daun Bambu / Sam-sam / Talang",
    scientificName: "Scomberoides commersonnianus",
    englishName: "Talang Queenfish",
    wikiUrl: "https://id.wikipedia.org/wiki/Talang-talang",
    imageUrl: "images/species/species_talang_talang.jpg",
    waterLayer: "Permukaan",
    feedingTime: "Pagi cerah (05:30 - 08:30 WIB) dan sore hari (15:30 - 17:45 WIB)",
    optimalTemp: "27°C - 30°C",
    weatherPreference: "Arus pasang laut deras di ujung dermaga/breakwater; menyukai air bergelombang aktif dengan kawanan anakan ikan tembang melimpah",
    naturalBaits: [
      "Anakan ikan belanak hidup (8-12 cm) atau tembang hidup, dikaitkan di punggung atas tanpa timah pemberat",
      "Udang vaname hidup ukuran besar dihanyutkan bebas mengikuti arus permukaan"
    ],
    artificialLures: [
      "Loud Chugging Popper (9-12 cm, 25-40g) yang menghasilkan cipratan air dan suara 'bloop' keras penarik perhatian",
      "Metal Casting Jig (20g - 35g) yang ditarik kencang zig-zag di lapisan permukaan (fast sweep & burn)",
      "Chrome Metal Spoon (25-30g) berkilau tinggi yang dimainkan cepat melintasi arus deras"
    ],
    tackleRigging: {
      line: "Braided PE 1.5 - PE 2.5 dengan reel spinning ukuran 3000 - 4000 drag halus",
      leader: "100% Fluorocarbon 30 - 40 lb sepanjang 1.5 meter",
      hook: "Single inline lure hook No. 1/0 - 2/0 atau kail treble 3X strong",
      technique: "Casting topwater dan fast retrieve; pertahankan lengkungan joran stabil karena talang-talang sering melompat akrobatik melepaskan kail"
    },
    productiveSpotIds: [
      "spot_tanjung_tembaga",
      "spot_ppp_mayangan",
      "spot_binor_harmony"
    ]
  },
  {
    id: "species_kuwe",
    name: "Kuwe / Giant Trevally (GT)",
    localName: "Ikan Putihan / Charang / Bebero / Cipa-cipa",
    scientificName: "Caranx ignobilis / Caranx sexfasciatus",
    englishName: "Giant Trevally (GT) / Bigeye Trevally",
    wikiUrl: "https://id.wikipedia.org/wiki/Kuwe_gerong",
    imageUrl: "images/species/species_kuwe.jpg",
    waterLayer: "Tengah",
    feedingTime: "Subuh (04:30 - 06:30 WIB) dan senja hingga malam hari (17:30 - 21:00 WIB)",
    optimalTemp: "27°C - 30°C",
    weatherPreference: "Air laut beroksigen tinggi dengan deburan ombak membentur struktur tetrapod; perairan dalam dengan arus pusaran kuat",
    naturalBaits: [
      "Ikan kembung atau tembang hidup segar (10-14 cm), dikaitkan tembus hidung atau punggung",
      "Cumi-cumi segar utuh dengan mata masih berbinar fosfor untuk target GT malam hari",
      "Udang vaname hidup ukuran super ditusuk tembus ekor"
    ],
    artificialLures: [
      "Heavy Poppers (8-12 cm, 30-50g) dengan tarikan kuat pembuat gelembung air",
      "Fast Shore Jig (25g - 40g) dimainkan fast-pitch vertikal di tubiran batu gajah",
      "Heavy Sinking Minnow (9-11 cm) yang dilempar sejajar dengan garis breakwater"
    ],
    tackleRigging: {
      line: "Braided PE 2.0 - PE 3.0 dengan drag reel disetel padat bertenaga",
      leader: "Heavy Fluorocarbon 40 - 60 lb sepanjang 2 meter penahan gesekan tetrapod",
      hook: "Live Bait Hook heavy wire No. 2/0 - 4/0 atau Treble Hook 4X No. 1",
      technique: "Shore jigging / popping; segera tegakkan joran dan pompa ikan menjauh dari dasar tetrapod saat sambaran pertama"
    },
    productiveSpotIds: [
      "spot_tanjung_tembaga",
      "spot_ppp_mayangan",
      "spot_binor_harmony"
    ]
  },
  {
    id: "species_belanak",
    name: "Belanak / Mullet",
    localName: "Ikan Wadukan / Balanak / Genggehe",
    scientificName: "Mugil cephalus / Liza vaigiensis",
    englishName: "Flathead Grey Mullet / Greenback Mullet",
    wikiUrl: "https://id.wikipedia.org/wiki/Belanak",
    imageUrl: "images/species/species_belanak.jpg",
    waterLayer: "Permukaan",
    feedingTime: "Pagi hingga sore hari (07:00 - 15:30 WIB); pemakan detritus dan alga visual di air tenang",
    optimalTemp: "28°C - 32°C",
    weatherPreference: "Air tenang beriak lembut di muara atau kolam pelabuhan; cuaca panas terik saat kawanan belanak naik ke permukaan mencari makan",
    naturalBaits: [
      "Adonan terigu kukus dicampur susu kental manis, margarin, vanili, dan serbuk terasi (umpan botok/racikan belanak)",
      "Roti tawar halus yang dilumatkan lembut menjadi pasta kenyal",
      "Lumut dasar sutra hijau muda halus"
    ],
    artificialLures: [
      "Tidak menyambar umpan tiruan biasa; ditargetkan menggunakan rangkaian 'Ombak Belanak / Per Pancing' berisi 4-8 mata kail kecil melingkar mengelilingi bola adonan tepung"
    ],
    tackleRigging: {
      line: "Monofilament tipis 4 - 8 lb atau PE 0.4 - 0.8 halus",
      leader: "Monofilament lembut 6 - 10 lb",
      hook: "Kail micro tipis tajam Carbon Chinu No. 1 - 3 atau kail khusus belanak No. 2 - 4",
      technique: "Rangkaian pelampung busa lonjong kecil dengan joran tegek lentur 4.5m - 5.4m; gentak spontan saat pelampung bergetar cepat atau tenggelam miring"
    },
    productiveSpotIds: [
      "spot_tanjung_tembaga",
      "spot_pantai_duta",
      "spot_pantai_bentar",
      "spot_muara_tongas",
      "spot_pantai_bahak",
      "spot_kalibuntu_kraksaan",
      "spot_pantai_tambakrejo",
      "spot_dermaga_muara_pajarakan",
      "spot_muara_kali_banger",
      "spot_pantai_curah_dringu"
    ]
  },
  {
    id: "species_sembilang",
    name: "Sembilang / Gray Eel-catfish",
    localName: "Ikan Balang / Sembilang Lumpur / Ndung",
    scientificName: "Plotosus canius",
    englishName: "Gray Eel-catfish",
    wikiUrl: "https://id.wikipedia.org/wiki/Sembilang",
    imageUrl: "images/species/species_sembilang.jpg",
    waterLayer: "Dasar",
    feedingTime: "Malam hari gelap gulita (19:00 - 02:30 WIB); juga rakus di siang hari bila air muara banjir keruh",
    optimalTemp: "26°C - 30°C",
    weatherPreference: "Air payau berlumpur pekat dengan salinitas rendah; sangat aktif saat awal musim hujan dan pasang malam hari",
    naturalBaits: [
      "Gumpalan cacing laut (cacing lur / cacing tanah merah) dipasang meruah 3-5 ekor dalam satu mata kail",
      "Udang kupas segar beraroma amis tajam",
      "Usus ayam fermentasi atau irisan cumi busuk yang menyebarkan jejak aroma kuat di dasar lumpur"
    ],
    artificialLures: [
      "Ikan penciuman dasar (olfactory forager); tidak efektif dengan lure buatan, murni umpan alami beraroma amis"
    ],
    tackleRigging: {
      line: "Braided PE 1.5 - PE 2.5 atau nylon monofilament 15 - 20 lb",
      leader: "Fluorocarbon 20 - 30 lb (50 cm) penahan gesekan lumpur tajam",
      hook: "Chinu No. 4 - 6 atau Daichi Carbon Bait Hook No. 7 - 9",
      technique: "Dasaran glosor timah bolong (running sinker 20-40g) dengan ujung joran lentur sensitif pendaftar ketukan; selalu bawa tang lip grip panjang karena patil sembilang sangat beracun!"
    },
    productiveSpotIds: [
      "spot_tanjung_tembaga",
      "spot_pantai_duta",
      "spot_pantai_bentar",
      "spot_muara_tongas",
      "spot_pantai_bahak",
      "spot_kalibuntu_kraksaan",
      "spot_pantai_tambakrejo",
      "spot_dermaga_muara_pajarakan",
      "spot_muara_kali_banger",
      "spot_pantai_curah_dringu"
    ]
  },
  {
    id: "species_pari",
    name: "Ikan Pari Pantai / Pari Pasir",
    localName: "Iwak Pe / Pari Pasir / Pari Bintik Biru",
    scientificName: "Himantura gerrardi / Brevitrygon walga",
    englishName: "Whitespotted Whipray / Coastal Stingray",
    wikiUrl: "https://id.wikipedia.org/wiki/Ikan_pari",
    imageUrl: "images/species/species_pari.jpg",
    waterLayer: "Dasar",
    feedingTime: "Malam hari (19:30 - 04:00 WIB) dan sore hari saat pasang tertinggi menggenangi hamparan pasir pantai",
    optimalTemp: "27°C - 31°C",
    weatherPreference: "Dasar pasir landai dengan air laut tenang hingga sedang; aktif meluncur menyusuri tepi deburan ombak saat air pasang puncak",
    naturalBaits: [
      "Irisan fillet ikan tembang atau tongkol segar berminyak berbau tajam",
      "Udang kupas utuh segar ukuran besar",
      "Cumi-cumi segar utuh atau kepiting pasir berkarapas lunak"
    ],
    artificialLures: [
      "Sangat jarang menyambar lure; sesekali tersangkut pada scented soft plastic grub aroma cumi yang diseret amat lambat di atas pasir"
    ],
    tackleRigging: {
      line: "Braided PE 2.5 - PE 4.0 pada joran surf casting panjang 3.9m - 4.5m dengan reel ukuran 5000-6000",
      leader: "Heavy Fluorocarbon 40 - 60 lb sepanjang 2 meter tahan abrasi gesekan pasir dan kulit kasar pari",
      hook: "Circle Hook No. 2/0 - 4/0 (mencegah kail tertelan dalam ke perut, mengunci sempurna di sudut bibir)",
      technique: "Surf casting pasiran dengan timah piramida/jangkar 80-120g penahan arus ombak; waspadai duri sengat beracun di pangkal ekor pari!"
    },
    productiveSpotIds: [
      "spot_tanjung_tembaga",
      "spot_pantai_duta",
      "spot_pantai_bentar",
      "spot_pantai_bahak",
      "spot_kalibuntu_kraksaan",
      "spot_pantai_tambakrejo",
      "spot_pantai_curah_dringu"
    ]
  },
  {
    id: "species_mangrove_jack",
    name: "Mangrove Jack / Kakap Merah Bakau",
    localName: "Ikan Kakap Abang / Jenggotan / Jabing Bakau",
    scientificName: "Lutjanus argentimaculatus",
    englishName: "Mangrove Red Snapper / Mangrove Jack",
    wikiUrl: "https://en.wikipedia.org/wiki/Mangrove_red_snapper",
    imageUrl: "images/species/species_mangrove_jack.jpg",
    waterLayer: "Dasar",
    feedingTime: "Senja hingga malam hari (17:00 - 22:00 WIB) dan subuh fajar (04:00 - 06:30 WIB)",
    optimalTemp: "26°C - 30°C",
    weatherPreference: "Air payau kehijauan dengan struktur rapat (akar mangrove rimbun, tiang dermaga kayu, atau celah tetrapod dalam)",
    naturalBaits: [
      "Udang vaname hidup segar (7-9 cm) dikaitkan di ekor",
      "Kepiting bakau kecil (kepiting soka muda) ditusuk di bagian samping karapas",
      "Anakan ikan belanak hidup atau irisan cumi segar"
    ],
    artificialLures: [
      "Deep Diving Hard Minnow (7-9 cm, bibir lidah panjang e.g. Rapala Shad Rap/Halco Laser Pro) yang ditwitch agresif menabrak kayu terendam",
      "Weedless Soft Plastic Paddle Tail (3-4 inci) dengan kail texas rig tertanam tanpa timah di sela akar bakau",
      "Walking Pencil Lure di permukaan kanal bakau dangkal saat pasang tinggi temaram"
    ],
    tackleRigging: {
      line: "Braided PE 2.0 - PE 3.0 pada joran baitcasting / spinning fast action (drag terkunci kuat)",
      leader: "100% Fluorocarbon 30 - 50 lb sepanjang 1.5 meter tahan gigitan taring dan gesekan kayu",
      hook: "Heavy gauge Chinu No. 6 - 8 atau Live Bait Wide Gap Hook No. 1/0 - 2/0",
      technique: "Pitching & skipping lure presisi ke ceruk akar bakau, atau live bait melayang tanpa timah; segera tarik paksa keluar saat sambaran pertama"
    },
    productiveSpotIds: [
      "spot_tanjung_tembaga",
      "spot_ppp_mayangan",
      "spot_muara_tongas",
      "spot_kalibuntu_kraksaan",
      "spot_binor_harmony",
      "spot_dermaga_muara_pajarakan",
      "spot_muara_kali_banger"
    ]
  },
  {
    id: "species_kedukang",
    name: "Kedukang / Manyung / Marine Catfish",
    localName: "Ikan Manyung / Otek / Jahitan / Kedukang Muara",
    scientificName: "Arius thalassinus / Netuma bilineata",
    englishName: "Giant Marine Catfish / Bronze Catfish",
    wikiUrl: "https://id.wikipedia.org/wiki/Kedukang",
    imageUrl: "images/species/species_kedukang.jpg",
    waterLayer: "Dasar",
    feedingTime: "Aktif 24 jam; puncak makan malam hari (19:00 - 03:00 WIB) dan siang hari saat air muara keruh pasca hujan",
    optimalTemp: "26°C - 31°C",
    weatherPreference: "Sangat menyukai air keruh berlumpur pekat; mengandalkan sungut peraba dan indra penciuman tajam untuk melacak bangkai organik",
    naturalBaits: [
      "Usus ayam fermentasi beraroma menyengat (umpan andalan pemancing muara)",
      "Cacing laut (cacing lur) dipasang bertumpuk pada mata kail",
      "Udang kupas amis atau potongan ikan tongkol/tembang berminyak"
    ],
    artificialLures: [
      "Tidak responsif terhadap umpan buatan; murni pemancingan dasaran umpan alami berbau tajam"
    ],
    tackleRigging: {
      line: "Braided PE 1.5 - PE 2.5 atau nylon monofilament 15 - 25 lb",
      leader: "Fluorocarbon 20 - 30 lb (50 cm)",
      hook: "Chinu No. 4 - 7 atau J-Hook No. 1 - 1/0",
      technique: "Dasaran timah bawah kumis gantung (sinker lonceng 30-50g di bawah dengan 2 cabang kail di atas lumpur); hati-hati 3 patil sirip beracun"
    },
    productiveSpotIds: [
      "spot_muara_tongas",
      "spot_pantai_bahak",
      "spot_kalibuntu_kraksaan",
      "spot_pantai_tambakrejo",
      "spot_dermaga_muara_pajarakan",
      "spot_muara_kali_banger",
      "spot_pantai_curah_dringu"
    ]
  },
  {
    id: "species_gerot_gerot",
    name: "Gerot-gerot / Javelin Terapon",
    localName: "Ikan Grot-grot / Tebal Bibir / Rumbang / Kuweh Lumpur",
    scientificName: "Pomadasys kaakan / Pomadasys argenteus",
    englishName: "Javelin Grunter / Silver Grunter",
    wikiUrl: "https://id.wikipedia.org/wiki/Gerot-gerot",
    imageUrl: "images/species/species_gerot_gerot.jpg",
    waterLayer: "Dasar",
    feedingTime: "Sore menjelang malam hari (16:30 - 22:30 WIB) dan subuh dini hari (04:30 - 06:30 WIB)",
    optimalTemp: "27°C - 30°C",
    weatherPreference: "Teluk terlindung atau kolam pelabuhan berdasar pasir lumpur dan pecahan cangkang kerang; air semi jernih hingga beriak tenang",
    naturalBaits: [
      "Cacing laut (cacing lur / cacing nipah) merupakan umpan nomor satu yang paling disukai gerot-gerot",
      "Daging udang kupas segar dipotong dadu kecil",
      "Daging kerang laut segar dikaitkan rapat"
    ],
    artificialLures: [
      "Micro Metal Jig (7g - 12g) yang diketuk-ketukkan di dasar berpasir menimbulkan kepulan pasir (bottom puffing)",
      "Scented Micro Soft Plastic Worm ber-jighead 3.5g ditarik merayap lambat di dasar"
    ],
    tackleRigging: {
      line: "Braided PE 0.8 - PE 1.5 pada joran Light-Medium lentur",
      leader: "Fluorocarbon 15 - 20 lb sepanjang 1.0 - 1.5 meter",
      hook: "Chinu No. 2 - 4 atau Marusode No. 9 - 11",
      technique: "Dasaran glosor timah lonjong (sliding sinker 20-30g) dengan kumis kail panjang agar cacing melambai alami mengikuti arus bawah"
    },
    productiveSpotIds: [
      "spot_tanjung_tembaga",
      "spot_ppp_mayangan",
      "spot_pantai_duta",
      "spot_kalibuntu_kraksaan"
    ]
  },
  {
    id: "species_kuniran",
    name: "Kuniran / Biji Nangka / Goatfish",
    localName: "Ikan Kuniran / Jenggot / Kambingan",
    scientificName: "Upeneus sulphureus / Upeneus tragula",
    englishName: "Sulphur Goatfish / Yellow Goatfish",
    wikiUrl: "https://id.wikipedia.org/wiki/Kuniran",
    imageUrl: "images/species/species_kuniran.jpg",
    waterLayer: "Dasar",
    feedingTime: "Siang hari terang (08:00 - 16:30 WIB); mencari makan aktif di bawah terik matahari menggunakan sepasang sungut dagu peraba",
    optimalTemp: "28°C - 31°C",
    weatherPreference: "Perairan pantai bersubstrat pasir bersih atau pasir berlumpur; air laut jernih kehijauan dengan arus pasang tenang (perbani)",
    naturalBaits: [
      "Potongan cacing laut kecil (1-2 cm) menutupi kail mikro",
      "Udang kupas dicacah kecil sebutir beras",
      "Irisan daging cumi-cumi putih kenyal ukuran mini"
    ],
    artificialLures: [
      "Micro Metal Jig (7g - 14g) warna silver-gold diketuk-ketuk melompat pendek di atas pasir",
      "Micro Soft Plastic Grub (1.5 inci) warna transparan glitter pada jighead 3.5g"
    ],
    tackleRigging: {
      line: "Braided PE 0.4 - PE 0.8 pada joran Ultralight lentur",
      leader: "Fluorocarbon 8 - 12 lb sepanjang 1 meter",
      hook: "Kail mikro Chinu No. 0.5 - 1.5 atau Maruseigo No. 6 - 8",
      technique: "Paternoster rig 2 kail bertingkat dengan timah tetes 15-20g di ujung bawah; biarkan sungut kuniran mendeteksi umpan di dekat dasar"
    },
    productiveSpotIds: [
      "spot_ppp_mayangan",
      "spot_pantai_duta",
      "spot_pantai_bahak",
      "spot_pantai_curah_dringu"
    ]
  },
  {
    id: "species_kembung",
    name: "Ikan Kembung / Indo-Pacific Mackerel",
    localName: "Ikan Banyar / Kembung Laki / Lemuru Laut",
    scientificName: "Rastrelliger kanagurta / Rastrelliger brachysoma",
    englishName: "Indo-Pacific Mackerel / Indian Mackerel",
    wikiUrl: "https://id.wikipedia.org/wiki/Kembung",
    imageUrl: "images/species/species_kembung.jpg",
    waterLayer: "Tengah",
    feedingTime: "Pagi hari (06:00 - 09:00 WIB) dan sore hari (15:30 - 17:30 WIB)",
    optimalTemp: "27°C - 30°C",
    weatherPreference: "Air laut jernih bersalinitas tinggi dengan arus pasang mengalir masuk membawa kawanan plankton dan udang rebon; benci air tawar banjir muara",
    naturalBaits: [
      "Udang rebon basah segar dipasang 2-3 ekor pada kail kecil",
      "Irisan tipis daging ikan kembung segar berbulu perak",
      "Daging udang kupas halus dicubit kecil"
    ],
    artificialLures: [
      "Rangkaian Sabiki / Kotrek Flasher (mata kail No. 6 - 9 dengan rumbai kulit ikan berkilau warna pelangi/hijau fosfor)",
      "Micro Metal Jig (7g - 15g) warna zebra glow atau pink silver dimainkan micro pitch cepat"
    ],
    tackleRigging: {
      line: "Braided PE 0.6 - PE 1.2 dengan reel spinning ukuran 1000 - 2500",
      leader: "Fluorocarbon 10 - 15 lb",
      hook: "Rangkaian Sabiki isi 5-6 kail bertingkat dengan timah lonjong 15-30g di bawah",
      technique: "Teknik 'Ngotrek Sabiki' vertikal di tepi dermaga pelabuhan atau dilempar jauh lalu ditarik berirama naik turun (lift and fall)"
    },
    productiveSpotIds: [
      "spot_tanjung_tembaga",
      "spot_ppp_mayangan",
      "spot_binor_harmony"
    ]
  },
  {
    id: "species_barakuda",
    name: "Barakuda / Alu-alu",
    localName: "Ikan Alu-alu / Langsar / Kacangan / Tenggiri Pesisir",
    scientificName: "Sphyraena barracuda / Sphyraena jello",
    englishName: "Great Barracuda / Pickhandle Barracuda",
    wikiUrl: "https://id.wikipedia.org/wiki/Alu-alu",
    imageUrl: "images/species/species_barakuda.jpg",
    waterLayer: "Permukaan",
    feedingTime: "Subuh (04:30 - 06:30 WIB), senja, dan malam hari terang bulan di sekitar sorot lampu pelabuhan (18:00 - 22:00 WIB)",
    optimalTemp: "27°C - 31°C",
    weatherPreference: "Perairan laut jernih berombak sedang; berkumpul di tubiran karang dalam dan pertemuan arus pemecah ombak pelabuhan",
    naturalBaits: [
      "Ikan belanak hidup utuh (10-15 cm) atau ikan tembang/banyar hidup",
      "Cumi-cumi segar utuh berfosfor dikaitkan melayang tanpa timah",
      "Irisan panjang daging ikan berminyak yang ditarik meluncur di permukaan"
    ],
    artificialLures: [
      "Slim Minnow Lure panjang (12-17 cm, e.g. Duo Tide Minnow/Rapala MaxRap) ditarik sweeping jerk dengan jeda pause",
      "Chrome Metal Spoon tebal (25-40g) yang ditarik berkecepatan tinggi di lapisan atas",
      "Fast Sinking Metal Jig (20-40g) warna silver biru holografis"
    ],
    tackleRigging: {
      line: "Braided PE 1.5 - PE 2.5 pada joran Medium-Heavy panjang 7'6\" - 8'6\"",
      leader: "Kawat nikelin single strand 15-20 lb (15 cm) atau Fluorocarbon kaku 50 - 60 lb mutlak wajib penahan taring pisau",
      hook: "Kail Treble Hook 3X No. 2 - 1/0 atau rangkaian stinger tanduk ganda",
      technique: "Casting minnow / spoon di mulut pelabuhan; hindari memasukkan jari ke dalam mulut ikan saat melepas kail (gunakan tang cucut panjang)"
    },
    productiveSpotIds: [
      "spot_tanjung_tembaga",
      "spot_ppp_mayangan",
      "spot_binor_harmony"
    ]
  },
  {
    id: "species_senangin",
    name: "Senangin / Kuro / Threadfin",
    localName: "Ikan Kurau / Selangit / Senangin Pantura",
    scientificName: "Eleutheronema tetradactylum",
    englishName: "Fourfinger Threadfin",
    wikiUrl: "https://id.wikipedia.org/wiki/Senangin",
    imageUrl: "images/species/species_senangin.jpg",
    waterLayer: "Tengah",
    feedingTime: "Pagi subuh (05:00 - 08:30 WIB) dan sore hari menjelang senja (16:00 - 18:30 WIB)",
    optimalTemp: "27°C - 31°C",
    weatherPreference: "Zona deburan ombak berbusa putih (surf zone) di atas paparan pasir lumpur pantai; menyukai air berombak aktif yang mengaduk udang dasar",
    naturalBaits: [
      "Udang putih tambak / udang api-api hidup ukuran 4-6 cm (umpan paling jitu)",
      "Cacing laut segar berukuran gemuk",
      "Irisan tipis cumi-cumi segar yang melambai di arus ombak"
    ],
    artificialLures: [
      "Small Sinking Minnow (5-8 cm) warna pearl white / silver glitter ditarik erratic twitches di palung ombak",
      "Soft Plastic Paddle Tail (2.5 - 3.5 inci) dengan jighead 5g-10g diseret di mintakat buih ombak",
      "Small Silver Casting Spoon (10-18g) ditarik zig-zag cepat"
    ],
    tackleRigging: {
      line: "Braided PE 0.8 - PE 1.5 pada joran spinning 7'0\" - 8'0\" lentur",
      leader: "Fluorocarbon 15 - 25 lb sepanjang 1.5 meter",
      hook: "Chinu No. 3 - 5 tajam atau Maruseigo No. 10 - 12",
      technique: "Floating surf rig (dilengkapi busa pelampung kecil di dekat kail agar udang melayang pas di atas dasar berbusa ombak)"
    },
    productiveSpotIds: [
      "spot_pantai_duta",
      "spot_pantai_bentar",
      "spot_pantai_bahak",
      "spot_pantai_tambakrejo",
      "spot_pantai_curah_dringu"
    ]
  },
  {
    id: "species_kerong_kerong",
    name: "Kerong-kerong / Targetfish / Terapon",
    localName: "Ikan Geteh / Keronce / Kerong / Terapon Belang",
    scientificName: "Terapon jarbua",
    englishName: "Jarbua Terapon / Crescent Grunter",
    wikiUrl: "https://id.wikipedia.org/wiki/Kerong-kerong",
    imageUrl: "images/species/species_kerong_kerong.jpg",
    waterLayer: "Dasar",
    feedingTime: "Aktif sepanjang siang dan malam (06:00 - 22:00 WIB); sangat rakus dan agresif menyambar umpan",
    optimalTemp: "26°C - 32°C",
    weatherPreference: "Sangat adaptif di air payau muara hingga air laut jernih pelabuhan; bergerombol banyak di sekitar celah bebatuan dan tiang jembatan",
    naturalBaits: [
      "Cacing laut potongan kecil",
      "Daging udang kupas segar dicubit seukuran mata kail",
      "Potongan daging ikan atau irisan cumi"
    ],
    artificialLures: [
      "Micro Casting Spoon (3g - 7g) warna emas/perak ditarik cepat",
      "Micro Metal Jig (5g - 10g) dimainkan twitching pendek di dekat bebatuan",
      "Micro Soft Plastic Minnow (1.5 - 2 inci) pada jighead 2g - 4g"
    ],
    tackleRigging: {
      line: "Braided PE 0.3 - PE 0.6 atau nylon 2 - 6 lb pada joran Ultralight",
      leader: "Fluorocarbon 6 - 10 lb",
      hook: "Micro Chinu No. 0.5 - 2",
      technique: "Light split-shot rig atau micro dropper rig dilempar merapat di celah batu pelabuhan; sensasi tarikan sangat liar melebihi ukuran fisiknya"
    },
    productiveSpotIds: [
      "spot_tanjung_tembaga",
      "spot_ppp_mayangan",
      "spot_pantai_bentar",
      "spot_kalibuntu_kraksaan",
      "spot_muara_kali_banger"
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FISH_DATA };
}
if (typeof window !== 'undefined') {
  window.FISH_DATA = FISH_DATA;
}
