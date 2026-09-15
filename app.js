/**
 * Probolinggo Coastal Fishing Guide - Main Application Logic
 * Mobile-first client application with instant multi-criteria filtering,
 * bidirectional cross-referencing, bottom sheet drawer, and offline resilience.
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // GLOBAL STATE
  // --------------------------------------------------------------------------
  const state = {
    activeTab: 'spots', // 'spots' | 'map' | 'species' | 'tactics'
    searchQuery: '',
    selectedLayer: 'all', // 'all' | 'Dasar' | 'Tengah' | 'Permukaan'
    selectedCategory: 'all', // 'all' | 'favorite' | 'beginner' | 'Breakwater' | 'Pantai Pasir' | 'Muara' | 'Dermaga'
    selectedBait: 'all', // 'all' | 'udang' | 'cacing' | 'irisan' | 'lure' | 'lumut'
    activeEntityDetail: null, // { type: 'spot'|'species', id: string } | null
    favorites: {
      spots: new Set(),
      species: new Set()
    }
  };

  // --------------------------------------------------------------------------
  // DATA REFERENCES & LOOKUP MAPS
  // --------------------------------------------------------------------------
  let spots = [];
  let species = [];
  const spotsById = new Map();
  const speciesById = new Map();

  // Map variables
  let mapInstance = null;
  const mapMarkers = new Map();
  let activeMapPillId = null;
  let coastalPolyline = null;

  function initData() {
    if (typeof window !== 'undefined' && Array.isArray(window.SPOTS_DATA)) {
      spots = window.SPOTS_DATA;
    } else if (typeof SPOTS_DATA !== 'undefined' && Array.isArray(SPOTS_DATA)) {
      spots = SPOTS_DATA;
    }

    if (typeof window !== 'undefined' && Array.isArray(window.FISH_DATA)) {
      species = window.FISH_DATA;
    } else if (typeof FISH_DATA !== 'undefined' && Array.isArray(FISH_DATA)) {
      species = FISH_DATA;
    }

    spots.forEach(function (spot) {
      spotsById.set(spot.id, spot);
    });

    species.forEach(function (fish) {
      speciesById.set(fish.id, fish);
    });
  }

  // --------------------------------------------------------------------------
  // FAVORITES & LOCALSTORAGE PERSISTENCE
  // --------------------------------------------------------------------------
  const FAV_STORAGE_KEY = 'probolinggo_angler_favs_v1';

  function loadFavorites() {
    try {
      const stored = localStorage.getItem(FAV_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed.spots)) {
          state.favorites.spots = new Set(parsed.spots);
        }
        if (Array.isArray(parsed.species)) {
          state.favorites.species = new Set(parsed.species);
        }
      }
    } catch (e) {
      console.warn('Could not load favorites from localStorage', e);
    }
    updateFavoriteCounters();
  }

  function saveFavorites() {
    try {
      const payload = {
        spots: Array.from(state.favorites.spots),
        species: Array.from(state.favorites.species)
      };
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Could not save favorites to localStorage', e);
    }
    updateFavoriteCounters();
  }

  function isFavorite(type, id) {
    if (type === 'spot') return state.favorites.spots.has(id);
    if (type === 'species') return state.favorites.species.has(id);
    return false;
  }

  function toggleFavorite(type, id) {
    let nowFav = false;
    let label = '';
    if (type === 'spot') {
      const spot = spotsById.get(id);
      label = spot ? spot.name : 'Spot';
      if (state.favorites.spots.has(id)) {
        state.favorites.spots.delete(id);
        nowFav = false;
      } else {
        state.favorites.spots.add(id);
        nowFav = true;
      }
    } else if (type === 'species') {
      const fish = speciesById.get(id);
      label = fish ? fish.name.split('/')[0].trim() : 'Ikan';
      if (state.favorites.species.has(id)) {
        state.favorites.species.delete(id);
        nowFav = false;
      } else {
        state.favorites.species.add(id);
        nowFav = true;
      }
    }
    saveFavorites();

    // Re-render current lists
    renderSpots();
    renderSpecies();

    updateModalFavButton(type, id);

    if (nowFav) {
      showToast(`⭐ "${label}" disimpan ke Favorit Saya`);
    } else {
      showToast(`Dihapus dari Favorit: "${label}"`);
    }
  }

  function updateFavoriteCounters() {
    const favCountElem = document.getElementById('fav-count');
    if (favCountElem) {
      const count = state.activeTab === 'species'
        ? state.favorites.species.size
        : state.favorites.spots.size;
      favCountElem.textContent = count;
    }
  }

  function updateModalFavButton(type, id) {
    const favBtn = document.getElementById('btn-drawer-fav');
    if (!favBtn) return;
    const fav = isFavorite(type, id);
    favBtn.className = 'btn-fav-toggle' + (fav ? ' active' : '');
    favBtn.title = fav ? 'Hapus dari Favorit' : 'Simpan ke Favorit';
    favBtn.innerHTML = `<svg width="20" height="20"><use href="${fav ? '#icon-star-filled' : '#icon-star'}"></use></svg>`;
    favBtn.onclick = function () {
      toggleFavorite(type, id);
    };
  }

  // --------------------------------------------------------------------------
  // LIVE SOLUNAR & FEEDING STATUS WIDGET (WIB)
  // --------------------------------------------------------------------------
  function updateLiveSolunarWidget() {
    const clockElem = document.getElementById('solunar-clock');
    const iconElem = document.getElementById('solunar-phase-icon');
    const titleElem = document.getElementById('solunar-phase-title');
    const descElem = document.getElementById('solunar-desc');

    if (!clockElem || !iconElem || !titleElem || !descElem) return;

    // Local WIB time (UTC+7)
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const wibHours = (utcHours + 7) % 24;
    const wibMinutes = utcMinutes;

    const timeStr = `${String(wibHours).padStart(2, '0')}:${String(wibMinutes).padStart(2, '0')} WIB`;
    clockElem.textContent = timeStr;

    const totalMin = wibHours * 60 + wibMinutes;

    let icon = '☀️';
    let title = 'Siang Hari (Teduh / Palung)';
    let desc = 'Suhu air permukaan hangat. Ikan cenderung bersembunyi di bawah bayangan tiang dermaga atau ceruk batu dalam.';

    if (totalMin >= 270 && totalMin < 405) { // 04:30 - 06:45
      icon = '🌅';
      title = 'Puncak Makan Fajar (Peak Sunrise)';
      desc = 'Aktivitas predator puncak! Udang liar naik ke paparan. Rekomendasi casting minnow & topwater di Mayangan & Bentar.';
    } else if (totalMin >= 405 && totalMin < 630) { // 06:45 - 10:30
      icon = '🌤️';
      title = 'Pasang Pagi (Aktivitas Sedang)';
      desc = 'Air pasang beranjak naik. Ikan kipper, belanak, dan kerapu aktif menyambar umpan udang di tiang dermaga & pantai pasiran.';
    } else if (totalMin >= 630 && totalMin < 930) { // 10:30 - 15:30
      icon = '☀️';
      title = 'Siang Terik (Fase Teduh & Palung)';
      desc = 'Suhu permukaan naik. Ikan berlindung di kolong jembatan dermaga atau palung dalam. Gunakan teknik dasaran timah bawah.';
    } else if (totalMin >= 930 && totalMin < 1110) { // 15:30 - 18:30
      icon = '🌇';
      title = 'Puncak Makan Senja (Peak Sunset)';
      desc = 'Visibilitas menurun, predator malam (Kakap Putih, MJ, Kerapu) mulai aktif berburu di mulut muara & bibir dermaga!';
    } else if (totalMin >= 1110 || totalMin < 150) { // 18:30 - 02:30
      icon = '🌙';
      title = 'Malam Hari (Pesta Lampu Dermaga)';
      desc = 'Lampu dermaga Tanjung Tembaga & Binor memikat kawanan rebon & cumi. Sangat produktif untuk talang-talang, cendro, dan sembilang.';
    } else { // 02:30 - 04:30
      icon = '🌌';
      title = 'Dini Hari (Fase Rehat Tenang)';
      desc = 'Aktivitas makan melambat sebelum puncak fajar. Siapkan rangkaian pancing dan umpan hidup menjelang adzan subuh.';
    }

    iconElem.textContent = icon;
    titleElem.textContent = title;
    descElem.textContent = desc;
  }

  // --------------------------------------------------------------------------
  // COLLAPSIBLE ADVANCED FILTERS (LAPISAN & UMPAN)
  // --------------------------------------------------------------------------
  function initCollapsibleFilters() {
    const toggleBtn = document.getElementById('btn-toggle-advanced-filters');
    const wrapper = document.getElementById('advanced-filters-wrapper');

    if (!toggleBtn || !wrapper) return;

    toggleBtn.addEventListener('click', function () {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        wrapper.style.display = 'none';
        toggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        wrapper.style.display = 'flex';
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });

    updateAdvancedFilterBadge();
  }

  function updateAdvancedFilterBadge() {
    const badge = document.getElementById('advanced-filter-badge');
    if (!badge) return;

    let activeCount = 0;
    if (state.selectedLayer !== 'all') activeCount++;
    if (state.selectedBait !== 'all') activeCount++;

    if (activeCount > 0) {
      badge.textContent = activeCount;
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  }

  // --------------------------------------------------------------------------
  // FILTERING LOGIC
  // --------------------------------------------------------------------------

  /**
   * Evaluates whether a species matches a specific bait category
   */
  function speciesMatchesBait(fish, baitType) {
    if (!fish) return false;
    if (baitType === 'all') return true;

    const baitsText = (fish.naturalBaits || []).join(' ').toLowerCase();
    const luresText = (fish.artificialLures || []).join(' ').toLowerCase();

    switch (baitType) {
      case 'udang':
        return /udang|shrimp|rebon|vaname/i.test(baitsText);
      case 'cacing':
        return /cacing|lur|nipah/i.test(baitsText);
      case 'irisan':
        return /irisan|fillet|potongan|tongkol|tembang|daging/i.test(baitsText);
      case 'lure':
        return fish.artificialLures &&
          fish.artificialLures.length > 0 &&
          !/tidak efektif|kurang direkomendasikan/i.test(luresText) &&
          /minnow|jig|popper|crankbait|soft plastic|spoon|metal|pencil|walk-the-dog/i.test(luresText);
      case 'lumut':
        return /lumut|sayur|ganggang|alga|rumput laut|nasi/i.test(baitsText);
      default:
        return true;
    }
  }

  /**
   * Evaluates whether a spot matches a specific bait category based on its target fish
   */
  function spotMatchesBait(spot, baitType) {
    if (baitType === 'all') return true;
    if (!spot || !Array.isArray(spot.targetFish)) return false;
    return spot.targetFish.some(function (fishId) {
      const fish = speciesById.get(fishId);
      return speciesMatchesBait(fish, baitType);
    });
  }

  /**
   * Evaluates whether a spot matches a category
   */
  function spotMatchesCategory(spot, category) {
    if (category === 'all') return true;
    if (category === 'favorite') return isFavorite('spot', spot.id);
    if (category === 'beginner') return !!(spot && spot.isBeginnerFriendly);
    if (!spot || !spot.category) return false;
    const cat = spot.category.toLowerCase();
    const target = category.toLowerCase();
    if (target === 'breakwater') return cat.includes('breakwater');
    if (target === 'pantai pasir') return cat.includes('pantai');
    if (target === 'muara') return cat.includes('muara');
    if (target === 'dermaga') return cat.includes('dermaga') || cat.includes('pelabuhan');
    return cat.includes(target);
  }

  /**
   * Evaluates whether a species matches a spot category (caught at that type of spot)
   */
  function speciesMatchesCategory(fish, category) {
    if (category === 'all') return true;
    if (category === 'favorite') return isFavorite('species', fish.id);
    if (category === 'beginner') {
      return Array.isArray(fish.productiveSpotIds) && fish.productiveSpotIds.some(function (spotId) {
        const spot = spotsById.get(spotId);
        return spot && spot.isBeginnerFriendly;
      });
    }
    if (!fish || !Array.isArray(fish.productiveSpotIds)) return false;
    return fish.productiveSpotIds.some(function (spotId) {
      const spot = spotsById.get(spotId);
      return spotMatchesCategory(spot, category);
    });
  }

  /**
   * Evaluates whether a spot matches a water column layer (target fish inhabit that layer)
   */
  function spotMatchesLayer(spot, layer) {
    if (layer === 'all') return true;
    if (!spot || !Array.isArray(spot.targetFish)) return false;
    return spot.targetFish.some(function (fishId) {
      const fish = speciesById.get(fishId);
      return fish && fish.waterLayer && fish.waterLayer.toLowerCase() === layer.toLowerCase();
    });
  }

  /**
   * Evaluates whether a species matches a water column layer
   */
  function speciesMatchesLayer(fish, layer) {
    if (layer === 'all') return true;
    return fish && fish.waterLayer && fish.waterLayer.toLowerCase() === layer.toLowerCase();
  }

  /**
   * Evaluates whether a spot matches text search query
   */
  function spotMatchesSearch(spot, query) {
    if (!query) return true;
    const q = query.toLowerCase();

    // Check direct fields
    if (spot.name && spot.name.toLowerCase().includes(q)) return true;
    if (spot.localName && spot.localName.toLowerCase().includes(q)) return true;
    if (spot.subdistrict && spot.subdistrict.toLowerCase().includes(q)) return true;
    if (spot.category && spot.category.toLowerCase().includes(q)) return true;
    if (spot.terrain && spot.terrain.toLowerCase().includes(q)) return true;
    if (spot.bottomContour && spot.bottomContour.toLowerCase().includes(q)) return true;

    // Check favorite & beginner attributes
    if ((q === 'favorit' || q === 'fav' || q.includes('favorit')) && isFavorite('spot', spot.id)) return true;
    if (q.includes('pemula') && spot.isBeginnerFriendly) return true;
    if (spot.beginnerBadge && spot.beginnerBadge.toLowerCase().includes(q)) return true;
    if (spot.beginnerReason && spot.beginnerReason.toLowerCase().includes(q)) return true;

    // Check target fish names
    if (Array.isArray(spot.targetFish)) {
      const matchesFish = spot.targetFish.some(function (fishId) {
        const fish = speciesById.get(fishId);
        if (!fish) return false;
        return (fish.name && fish.name.toLowerCase().includes(q)) ||
               (fish.localName && fish.localName.toLowerCase().includes(q)) ||
               (fish.scientificName && fish.scientificName.toLowerCase().includes(q));
      });
      if (matchesFish) return true;
    }

    return false;
  }

  /**
   * Evaluates whether a species matches text search query
   */
  function speciesMatchesSearch(fish, query) {
    if (!query) return true;
    const q = query.toLowerCase();

    if (fish.name && fish.name.toLowerCase().includes(q)) return true;
    if (fish.localName && fish.localName.toLowerCase().includes(q)) return true;
    if (fish.scientificName && fish.scientificName.toLowerCase().includes(q)) return true;
    if (fish.englishName && fish.englishName.toLowerCase().includes(q)) return true;
    if ((q === 'favorit' || q === 'fav' || q.includes('favorit')) && isFavorite('species', fish.id)) return true;
    if (fish.waterLayer && fish.waterLayer.toLowerCase().includes(q)) return true;
    if (fish.weatherPreference && fish.weatherPreference.toLowerCase().includes(q)) return true;

    // Check baits
    if (Array.isArray(fish.naturalBaits)) {
      if (fish.naturalBaits.some(function (b) { return b.toLowerCase().includes(q); })) return true;
    }
    // Check lures
    if (Array.isArray(fish.artificialLures)) {
      if (fish.artificialLures.some(function (l) { return l.toLowerCase().includes(q); })) return true;
    }
    // Check tackle technique
    if (fish.tackleRigging && fish.tackleRigging.technique) {
      if (fish.tackleRigging.technique.toLowerCase().includes(q)) return true;
    }
    // Check productive spots
    if (Array.isArray(fish.productiveSpotIds)) {
      const matchesSpot = fish.productiveSpotIds.some(function (spotId) {
        const spot = spotsById.get(spotId);
        if (!spot) return false;
        return (spot.name && spot.name.toLowerCase().includes(q)) ||
               (spot.subdistrict && spot.subdistrict.toLowerCase().includes(q));
      });
      if (matchesSpot) return true;
    }

    return false;
  }

  /**
   * Filtered list of spots
   */
  function getFilteredSpots() {
    return spots.filter(function (spot) {
      return spotMatchesSearch(spot, state.searchQuery) &&
             spotMatchesLayer(spot, state.selectedLayer) &&
             spotMatchesCategory(spot, state.selectedCategory) &&
             spotMatchesBait(spot, state.selectedBait);
    });
  }

  /**
   * Filtered list of species
   */
  function getFilteredSpecies() {
    return species.filter(function (fish) {
      return speciesMatchesSearch(fish, state.searchQuery) &&
             speciesMatchesLayer(fish, state.selectedLayer) &&
             speciesMatchesCategory(fish, state.selectedCategory) &&
             speciesMatchesBait(fish, state.selectedBait);
    });
  }

  /**
   * Helper to construct verified Google Maps search and directions URLs.
   * Prioritizes full qualified place name (spot.gmapsQuery) so Google Maps resolves
   * the exact destination card in Probolinggo, preventing confusion with same-named spots
   * in other regencies/provinces (e.g. Pantai Tambakrejo in Blitar).
   */
  function getSpotGmapsSearchUrl(spot) {
    if (!spot) return '#';
    const query = spot.gmapsQuery || `${spot.name}, Kec. ${spot.subdistrict}, Probolinggo, Jawa Timur`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  function getSpotGmapsDirUrl(spot) {
    if (!spot) return '#';
    const destination = spot.gmapsQuery || `${spot.name}, Kec. ${spot.subdistrict}, Probolinggo, Jawa Timur`;
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
  }

  // --------------------------------------------------------------------------
  // UI RENDERING HELPERS
  // --------------------------------------------------------------------------

  function getLayerBadgeHtml(layer) {
    if (!layer) return '';
    const l = layer.toLowerCase();
    if (l === 'dasar') {
      return '<span class="badge badge-layer-dasar" title="Lapisan Dasar (Benthic)"><svg width="12" height="12"><use href="#icon-layer-dasar"></use></svg> Dasar</span>';
    } else if (l === 'tengah') {
      return '<span class="badge badge-layer-tengah" title="Lapisan Tengah (Pelagic mid)"><svg width="12" height="12"><use href="#icon-layer-tengah"></use></svg> Tengah</span>';
    } else if (l === 'permukaan') {
      return '<span class="badge badge-layer-permukaan" title="Lapisan Permukaan (Surface)"><svg width="12" height="12"><use href="#icon-layer-permukaan"></use></svg> Permukaan</span>';
    }
    return `<span class="badge">${escapeHtml(layer)}</span>`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeQuotes(str) {
    if (!str) return '';
    return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  // --------------------------------------------------------------------------
  // DOM RENDERING: SPOTS
  // --------------------------------------------------------------------------
  function renderSpots() {
    const container = document.getElementById('spots-grid');
    const emptyState = document.getElementById('spots-empty');
    const countLabel = document.getElementById('spots-count-label');
    if (!container) return;

    const filtered = getFilteredSpots();
    if (countLabel) {
      countLabel.textContent = `Menampilkan ${filtered.length} dari ${spots.length} Spot Pesisir`;
    }

    if (filtered.length === 0) {
      container.innerHTML = '';
      if (emptyState) {
        emptyState.style.display = 'flex';
        const emptyTitle = emptyState.querySelector('.empty-title');
        const emptyDesc = emptyState.querySelector('.empty-description');
        if (state.selectedCategory === 'favorite') {
          if (emptyTitle) emptyTitle.textContent = 'Belum Ada Spot Favorit';
          if (emptyDesc) emptyDesc.textContent = 'Anda belum menandai spot favorit. Ketuk ikon bintang ⭐ pada kartu spot mancing mana saja untuk menyimpannya.';
        } else {
          if (emptyTitle) emptyTitle.textContent = 'Tidak Ada Spot yang Sesuai';
          if (emptyDesc) emptyDesc.textContent = 'Tidak ditemukan spot mancing dengan kata kunci dan filter yang dipilih. Coba atur ulang filter pencarian Anda.';
        }
      }
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    let html = '';
    filtered.forEach(function (spot) {
      // Build target fish chips
      let fishChipsHtml = '';
      if (Array.isArray(spot.targetFish)) {
        spot.targetFish.forEach(function (fishId) {
          const fish = speciesById.get(fishId);
          const fishName = fish ? fish.name.split('/')[0].trim() : fishId;
          fishChipsHtml += `
            <button type="button" class="clickable-chip" onclick="event.stopPropagation(); app.navigateToSpecies('${fishId}')" title="Buka profil taktis ${escapeHtml(fishName)}">
              <svg><use href="#icon-fish"></use></svg>
              <span>${escapeHtml(fishName)}</span>
            </button>
          `;
        });
      }

      const beginnerTagHtml = spot.beginnerBadge ? `
        <div class="beginner-banner-tag" title="${escapeHtml(spot.beginnerReason || 'Ramah pemula & gear seadanya')}">
          <span>${escapeHtml(spot.beginnerBadge)}</span>
        </div>
      ` : '';

      const imageBannerHtml = spot.imageUrl ? `
        <div class="card-media-wrapper">
          ${beginnerTagHtml}
          <img src="${escapeHtml(spot.imageUrl)}" alt="${escapeHtml(spot.name)}" class="card-species-thumb" loading="lazy" onerror="this.parentElement.style.display='none'">
        </div>
      ` : (spot.beginnerBadge ? `<div style="margin-bottom: 8px;">${beginnerTagHtml}</div>` : '');

      html += `
        <article class="guide-card" id="card-spot-${spot.id}" onclick="app.openSpotModal('${spot.id}')">
          ${imageBannerHtml}
          <div class="card-header">
            <div class="card-title-group">
              <h3 class="card-title">${escapeHtml(spot.name)}</h3>
              <div class="card-subtitle">${escapeHtml(spot.localName || '')}</div>
            </div>
            <button type="button" class="btn-fav-toggle ${isFavorite('spot', spot.id) ? 'active' : ''}" onclick="event.stopPropagation(); app.toggleFavorite('spot', '${spot.id}')" title="${isFavorite('spot', spot.id) ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}">
              <svg><use href="${isFavorite('spot', spot.id) ? '#icon-star-filled' : '#icon-star'}"></use></svg>
            </button>
          </div>
          <div class="card-badges">
              ${spot.beginnerBadge ? `<span class="badge badge-beginner">${escapeHtml(spot.beginnerBadge)}</span>` : ''}
              <span class="badge badge-subdistrict">${escapeHtml(spot.subdistrict)}</span>
              <span class="badge badge-category">${escapeHtml(spot.category)}</span>
            </div>
          </div>

          <div class="card-meta-row">
            <div class="meta-item">
              <svg><use href="#icon-layer-dasar"></use></svg>
              <span>Kedalaman: <strong class="meta-highlight">${escapeHtml(spot.depth)}</strong></span>
            </div>
            <div class="meta-item">
              <svg><use href="#icon-pin"></use></svg>
              <span>Kontur: <strong class="meta-highlight">${escapeHtml(spot.bottomContour)}</strong></span>
            </div>
          </div>

          <div class="meta-item" style="font-size: 0.78rem; color: var(--color-text-secondary);">
            <svg><use href="#icon-clock"></use></svg>
            <span>Waktu terbaik: ${escapeHtml(spot.bestConditions ? spot.bestConditions.time : '-')}</span>
          </div>

          <div class="card-chips-section">
            <div class="chips-title">Ikan Target Utama (${spot.targetFish ? spot.targetFish.length : 0}):</div>
            <div class="interactive-chips-row">
              ${fishChipsHtml}
            </div>
          </div>

          <div class="card-actions" onclick="event.stopPropagation();">
            <button type="button" class="btn-card-action btn-copy-coords" onclick="app.copyCoordinates(${spot.coordinates.lat}, ${spot.coordinates.lng}, '${escapeQuotes(spot.name)}')" title="Salin koordinat GPS">
              <svg><use href="#icon-copy"></use></svg>
              <span>Salin</span>
            </button>
            <button type="button" class="btn-card-action btn-map-jump" onclick="app.focusSpotOnMap('${spot.id}')" title="Buka dan lihat titik spot di peta interaktif">
              <svg><use href="#icon-map"></use></svg>
              <span>Peta</span>
            </button>
            <a href="${getSpotGmapsSearchUrl(spot)}" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-gmaps-card" title="Buka lokasi '${escapeQuotes(spot.name)}' di Google Maps">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              <span>Maps</span>
            </a>
            <button type="button" class="btn-card-action btn-detail" onclick="app.openSpotModal('${spot.id}')">
              <span>Detail</span>
              <span>&rarr;</span>
            </button>
          </div>
        </article>
      `;
    });

    container.innerHTML = html;
  }

  // --------------------------------------------------------------------------
  // DOM RENDERING: SPECIES
  // --------------------------------------------------------------------------
  function renderSpecies() {
    const container = document.getElementById('species-grid');
    const emptyState = document.getElementById('species-empty');
    const countLabel = document.getElementById('species-count-label');
    if (!container) return;

    const filtered = getFilteredSpecies();
    if (countLabel) {
      countLabel.textContent = `Menampilkan ${filtered.length} dari ${species.length} Spesies Ikan`;
    }

    if (filtered.length === 0) {
      container.innerHTML = '';
      if (emptyState) {
        emptyState.style.display = 'flex';
        const emptyTitle = emptyState.querySelector('.empty-title');
        const emptyDesc = emptyState.querySelector('.empty-description');
        if (state.selectedCategory === 'favorite') {
          if (emptyTitle) emptyTitle.textContent = 'Belum Ada Spesies Favorit';
          if (emptyDesc) emptyDesc.textContent = 'Anda belum menandai jenis ikan favorit. Ketuk ikon bintang ⭐ pada kartu jenis ikan untuk menyimpannya.';
        } else {
          if (emptyTitle) emptyTitle.textContent = 'Tidak Ada Jenis Ikan yang Sesuai';
          if (emptyDesc) emptyDesc.textContent = 'Tidak ditemukan jenis ikan dengan kriteria pencarian yang aktif. Coba ubah kata kunci atau hapus filter lapisan/umpan.';
        }
      }
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    let html = '';
    filtered.forEach(function (fish) {
      // Build productive spots chips
      let spotsChipsHtml = '';
      if (Array.isArray(fish.productiveSpotIds)) {
        fish.productiveSpotIds.forEach(function (spotId) {
          const spot = spotsById.get(spotId);
          const spotName = spot ? spot.name : spotId;
          spotsChipsHtml += `
            <button type="button" class="clickable-chip" onclick="event.stopPropagation(); app.navigateToSpot('${spotId}')" title="Buka spot ${escapeHtml(spotName)}">
              <svg><use href="#icon-pin"></use></svg>
              <span>${escapeHtml(spotName)}</span>
            </button>
          `;
        });
      }

      // Quick bait snippet
      const baitPreview = fish.naturalBaits && fish.naturalBaits[0]
        ? fish.naturalBaits[0].split(',')[0]
        : '-';

      const imageBannerHtml = fish.imageUrl ? `
        <div class="card-media-wrapper">
          <img src="${escapeHtml(fish.imageUrl)}" alt="${escapeHtml(fish.name)}" class="card-species-thumb" loading="lazy" onerror="this.parentElement.style.display='none'">
        </div>
      ` : '';

      const wikiButtonHtml = fish.wikiUrl ? `
        <a href="${escapeHtml(fish.wikiUrl)}" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-wiki-link" title="Buka artikel Wikipedia tentang ${escapeHtml(fish.name)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <span>Wiki</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      ` : '';

      html += `
        <article class="guide-card" id="card-species-${fish.id}" onclick="app.openSpeciesModal('${fish.id}')">
          ${imageBannerHtml}
          <div class="card-header">
            <div class="card-title-group">
              <h3 class="card-title">${escapeHtml(fish.name)}</h3>
              <div class="card-subtitle">${escapeHtml(fish.localName)}</div>
              <div class="card-scientific">${escapeHtml(fish.scientificName)}</div>
            </div>
            <button type="button" class="btn-fav-toggle ${isFavorite('species', fish.id) ? 'active' : ''}" onclick="event.stopPropagation(); app.toggleFavorite('species', '${fish.id}')" title="${isFavorite('species', fish.id) ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}">
              <svg><use href="${isFavorite('species', fish.id) ? '#icon-star-filled' : '#icon-star'}"></use></svg>
            </button>
          </div>
          <div class="card-badges">
              ${getLayerBadgeHtml(fish.waterLayer)}
            </div>
          </div>

          <div class="card-meta-row">
            <div class="meta-item">
              <svg><use href="#icon-temp"></use></svg>
              <span>Suhu: <strong class="meta-highlight">${escapeHtml(fish.optimalTemp)}</strong></span>
            </div>
            <div class="meta-item">
              <svg><use href="#icon-clock"></use></svg>
              <span>Makan: <strong class="meta-highlight">${escapeHtml(fish.feedingTime.split('(')[0].trim())}</strong></span>
            </div>
          </div>

          <div class="meta-item" style="font-size: 0.78rem; color: var(--color-text-secondary);">
            <svg><use href="#icon-rig"></use></svg>
            <span>Umpan Utama: ${escapeHtml(baitPreview)}</span>
          </div>

          <div class="card-chips-section">
            <div class="chips-title">Spot Produktif (${fish.productiveSpotIds ? fish.productiveSpotIds.length : 0}):</div>
            <div class="interactive-chips-row">
              ${spotsChipsHtml}
            </div>
          </div>

          <div class="card-actions" onclick="event.stopPropagation();">
            ${wikiButtonHtml}
            <button type="button" class="btn-card-action btn-detail" onclick="app.openSpeciesModal('${fish.id}')">
              <span>Detail Taktis</span>
              <span>&rarr;</span>
            </button>
          </div>
        </article>
      `;
    });

    container.innerHTML = html;
  }

  // --------------------------------------------------------------------------
  // ACTIVE FILTER BAR & INDICATOR
  // --------------------------------------------------------------------------
  function updateFilterStatusBar() {
    const bar = document.getElementById('filter-status-bar');
    const textElem = document.getElementById('active-filter-text');
    const clearBtn = document.getElementById('clear-search-btn');

    // Toggle clear search button
    if (clearBtn) {
      if (state.searchQuery.length > 0) {
        clearBtn.classList.add('active');
      } else {
        clearBtn.classList.remove('active');
      }
    }

    let activeCount = 0;
    const descriptions = [];

    if (state.searchQuery.trim().length > 0) {
      activeCount++;
      descriptions.push(`"${state.searchQuery.trim()}"`);
    }
    if (state.selectedLayer !== 'all') {
      activeCount++;
      descriptions.push(`Lapisan: ${state.selectedLayer}`);
    }
    if (state.selectedCategory !== 'all') {
      activeCount++;
      descriptions.push(`Kategori: ${state.selectedCategory}`);
    }
    if (state.selectedBait !== 'all') {
      activeCount++;
      const baitMap = {
        udang: 'Udang Hidup',
        cacing: 'Cacing Laut',
        irisan: 'Ikan Irisan',
        lure: 'Lure/Jig/Minnow',
        lumut: 'Lumut'
      };
      descriptions.push(`Umpan: ${baitMap[state.selectedBait] || state.selectedBait}`);
    }

    if (bar && textElem) {
      if (activeCount > 0) {
        bar.classList.add('has-active-filters');
        textElem.textContent = `${activeCount} Filter Aktif (${descriptions.join(', ')})`;
      } else {
        bar.classList.remove('has-active-filters');
        textElem.textContent = '0 Filter Aktif';
      }
    }
  }

  function reRenderCurrentTab() {
    updateFilterStatusBar();
    updateAdvancedFilterBadge();
    updateFavoriteCounters();
    if (state.activeTab === 'spots') {
      renderSpots();
    } else if (state.activeTab === 'map') {
      updateMapMarkers();
    } else if (state.activeTab === 'species') {
      renderSpecies();
    }
  }

  // --------------------------------------------------------------------------
  // INTERACTIVE MAP CONTROLLER (GIS SELAT MADURA)
  // --------------------------------------------------------------------------
  function getCategoryColor(category) {
    const cat = (category || '').toLowerCase();
    if (cat.includes('breakwater')) return '#06b6d4'; // Cyan
    if (cat.includes('dermaga') || cat.includes('pelabuhan')) return '#3b82f6'; // Blue
    if (cat.includes('muara')) return '#10b981'; // Emerald
    if (cat.includes('pantai pasir')) return '#f59e0b'; // Amber
    if (cat.includes('tebing') || cat.includes('pltu') || cat.includes('harmony')) return '#8b5cf6'; // Purple
    return '#38bdf8';
  }

  function getCategoryEmoji(category) {
    const cat = (category || '').toLowerCase();
    if (cat.includes('breakwater')) return '🪨';
    if (cat.includes('dermaga') || cat.includes('pelabuhan')) return '⚓';
    if (cat.includes('muara')) return '🎣';
    if (cat.includes('pantai pasir')) return '🏖️';
    if (cat.includes('tebing') || cat.includes('pltu') || cat.includes('harmony')) return '⚡';
    return '📍';
  }

  function createMarkerIcon(category, isSelected) {
    if (typeof L === 'undefined') return null;
    const color = getCategoryColor(category);
    const emoji = getCategoryEmoji(category);

    return L.divIcon({
      className: 'custom-spot-marker' + (isSelected ? ' selected' : ''),
      html: `
        <div class="marker-pin" style="--pin-color: ${color};">
          <span class="marker-pulse"></span>
          <div class="marker-core">
            <span class="marker-emoji">${emoji}</span>
          </div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -18]
    });
  }

  function createSpotPopupContent(spot) {
    const gmapsUrl = getSpotGmapsSearchUrl(spot);

    let fishNames = [];
    if (Array.isArray(spot.targetFish)) {
      fishNames = spot.targetFish.slice(0, 4).map(function (fishId) {
        const fish = speciesById.get(fishId);
        return fish ? fish.name.split('/')[0].trim() : fishId;
      });
    }
    const fishSummary = fishNames.join(', ') + (spot.targetFish && spot.targetFish.length > 4 ? ', dll.' : '');

    return `
      <div class="map-popup-card">
        ${spot.imageUrl ? `
          <div style="width: 100%; height: 100px; border-radius: 6px; overflow: hidden; margin-bottom: 8px; background: #0c121e;">
            <img src="${escapeHtml(spot.imageUrl)}" alt="${escapeHtml(spot.name)}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.parentElement.style.display='none'">
          </div>
        ` : ''}
        <div class="map-popup-header">
          ${spot.beginnerBadge ? `<span class="popup-badge badge-beginner">${escapeHtml(spot.beginnerBadge)}</span>` : ''}
          <span class="popup-badge">${escapeHtml(spot.category)}</span>
          <span class="popup-subdistrict">Kec. ${escapeHtml(spot.subdistrict)}</span>
        </div>
        <h4 class="popup-title">${escapeHtml(spot.name)}</h4>
        <div class="popup-subtitle">${escapeHtml(spot.localName || '')}</div>
        <div class="popup-meta-row">
          <div class="popup-meta-item">
            <strong>Kedalaman:</strong> ${escapeHtml(spot.depth)}
          </div>
          <div class="popup-meta-item">
            <strong>Dasar:</strong> ${escapeHtml(spot.bottomContour)}
          </div>
        </div>
        <div class="popup-fish-info">
          <strong>🎯 Target Utama:</strong> ${escapeHtml(fishSummary)}
        </div>
        <div class="popup-actions">
          <a href="${gmapsUrl}" target="_blank" rel="noopener noreferrer" class="btn-gmaps" title="Buka rute navigasi di Google Maps">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
            </svg>
            <span>Buka Google Maps &rarr;</span>
          </a>
          <button type="button" class="btn-popup-detail" onclick="app.openSpotModal('${spot.id}')">
            <span>Lihat Detail &amp; Taktik Spot</span>
          </button>
        </div>
      </div>
    `;
  }

  function initMap() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (typeof L === 'undefined') return;
    const mapContainer = document.getElementById('fishing-map');
    if (!mapContainer) return;

    if (!mapInstance) {
      try {
        mapInstance = L.map('fishing-map', {
          center: [-7.735, 113.315],
          zoom: 11,
          minZoom: 9,
          maxZoom: 18,
          zoomControl: true
        });

        // Completely open, zero API-key, zero watermark tile layers
        const darkBase = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 16,
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
        });
        const darkRef = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 16,
          attribution: ''
        });
        const darkLayer = L.layerGroup([darkBase, darkRef]);

        // Esri Satellite Imagery (high-resolution reefs, breakwaters, coastal formations)
        const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 19,
          attribution: 'Tiles &copy; Esri &mdash; DigitalGlobe, GeoEye, Earthstar Geographics'
        });

        // Esri Ocean & Bathymetry Base (shows marine depths and coastal shelves)
        const oceanLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 13,
          attribution: 'Tiles &copy; Esri &mdash; GEBCO, NOAA, National Geographic'
        });

        // OpenStreetMap Humanitarian (community-run open OSM tiles, no API key, no 403)
        const osmHotLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
          maxZoom: 19,
          subdomains: 'abc',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
        });

        // Set Dark Canvas as default
        darkLayer.addTo(mapInstance);

        // Multi-layer control for anglers (all 100% open, zero API keys)
        L.control.layers({
          "🌙 Peta Gelap (Outdoor)": darkLayer,
          "🛰️ Citra Satelit (Reef & Pesisir)": satelliteLayer,
          "🌊 Peta Laut & Batimetri": oceanLayer,
          "🗺️ Peta Pesisir OpenStreetMap": osmHotLayer
        }, null, { position: 'topright' }).addTo(mapInstance);

        // Add coastal fishing route polyline (ordered West to East by longitude)
        const sortedByLng = spots.slice().sort(function (a, b) {
          return a.coordinates.lng - b.coordinates.lng;
        });
        const routePoints = sortedByLng.map(function (s) {
          return [s.coordinates.lat, s.coordinates.lng];
        });
        const currentAccent = (typeof getComputedStyle !== 'undefined'
          ? getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim()
          : '') || '#ff6224';

        coastalPolyline = L.polyline(routePoints, {
          color: currentAccent,
          weight: 2.5,
          opacity: 0.75,
          dashArray: '6, 8',
          lineCap: 'round',
          lineJoin: 'round'
        }).addTo(mapInstance);

        // Create markers for all spots
        spots.forEach(function (spot) {
          const icon = createMarkerIcon(spot.category, false);
          const marker = L.marker([spot.coordinates.lat, spot.coordinates.lng], { icon: icon });
          marker.bindPopup(createSpotPopupContent(spot), {
            className: 'angler-popup',
            maxWidth: 290,
            autoPanPadding: [15, 15]
          });

          marker.on('click', function () {
            highlightMapPill(spot.id);
          });

          marker.addTo(mapInstance);
          mapMarkers.set(spot.id, marker);
        });

        const bounds = spots.map(function (s) {
          return [s.coordinates.lat, s.coordinates.lng];
        });
        if (bounds.length > 0) {
          mapInstance.fitBounds(bounds, { padding: [30, 30] });
        }
      } catch (err) {
        console.warn('Map initialization:', err);
      }
    }

    renderMapPills();
    updateMapMarkers();
  }

  function renderMapPills() {
    const pillsContainer = document.getElementById('map-spot-pills');
    if (!pillsContainer) return;

    const filtered = getFilteredSpots();
    let html = '';

    filtered.forEach(function (spot) {
      const color = getCategoryColor(spot.category);
      const emoji = getCategoryEmoji(spot.category);
      const isActive = activeMapPillId === spot.id;

      html += `
        <button type="button" class="map-pill-btn ${isActive ? 'active' : ''} ${spot.isBeginnerFriendly ? 'pill-beginner' : ''}" id="pill-${spot.id}" onclick="app.focusSpotOnMap('${spot.id}')" role="tab" aria-selected="${isActive}">
          <span class="pill-dot" style="background-color: ${color};"></span>
          <span>${spot.isBeginnerFriendly ? '🔰 ' : ''}${escapeHtml(spot.name)}</span>
        </button>
      `;
    });

    pillsContainer.innerHTML = html;
  }

  function updateMapMarkers() {
    if (!mapInstance || typeof L === 'undefined') return;

    const filtered = getFilteredSpots();
    const countLabel = document.getElementById('map-spots-count-label');
    if (countLabel) {
      countLabel.textContent = `Menampilkan ${filtered.length} dari ${spots.length} Titik Spot di Peta`;
    }

    const filteredIds = new Set(filtered.map(function (s) { return s.id; }));

    spots.forEach(function (spot) {
      const marker = mapMarkers.get(spot.id);
      if (!marker) return;

      if (filteredIds.has(spot.id)) {
        if (!mapInstance.hasLayer(marker)) {
          marker.addTo(mapInstance);
        }
      } else {
        if (mapInstance.hasLayer(marker)) {
          marker.remove();
        }
      }
    });

    renderMapPills();

    setTimeout(function () {
      if (mapInstance) {
        mapInstance.invalidateSize();
      }
    }, 100);
  }

  function focusSpotOnMap(spotId) {
    if (state.activeTab !== 'map') {
      switchTab('map');
    }

    initMap();

    const spot = spotsById.get(spotId);
    const marker = mapMarkers.get(spotId);

    if (spot && mapInstance) {
      if (marker && !mapInstance.hasLayer(marker)) {
        marker.addTo(mapInstance);
      }

      mapInstance.flyTo([spot.coordinates.lat, spot.coordinates.lng], 14, {
        duration: 0.9
      });

      setTimeout(function () {
        if (marker) {
          marker.openPopup();
        }
      }, 500);

      highlightMapPill(spotId);
    }
  }

  function highlightMapPill(spotId) {
    activeMapPillId = spotId;
    const allPills = document.querySelectorAll('.map-pill-btn');
    allPills.forEach(function (p) {
      p.classList.remove('active');
      p.setAttribute('aria-selected', 'false');
    });

    const targetPill = document.getElementById(`pill-${spotId}`);
    if (targetPill) {
      targetPill.classList.add('active');
      targetPill.setAttribute('aria-selected', 'true');
      targetPill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  function resetMapBounds() {
    if (!mapInstance || typeof L === 'undefined') return;

    activeMapPillId = null;
    const allPills = document.querySelectorAll('.map-pill-btn');
    allPills.forEach(function (p) {
      p.classList.remove('active');
      p.setAttribute('aria-selected', 'false');
    });

    mapInstance.closePopup();

    const filtered = getFilteredSpots();
    const bounds = filtered.map(function (s) {
      return [s.coordinates.lat, s.coordinates.lng];
    });

    if (bounds.length > 0) {
      mapInstance.fitBounds(bounds, { padding: [30, 30] });
    } else {
      mapInstance.setView([-7.735, 113.315], 11);
    }

    showToast('Pandangan peta diatur ulang ke seluruh pesisir Probolinggo.');
  }

  // --------------------------------------------------------------------------
  // MODAL / DRAWER CONTROLLER
  // --------------------------------------------------------------------------
  function openSpotModal(spotId) {
    const spot = spotsById.get(spotId);
    if (!spot) return;

    state.activeEntityDetail = { type: 'spot', id: spotId };
    updateModalFavButton('spot', spotId);

    const titleElem = document.getElementById('drawer-title');
    const subtitleElem = document.getElementById('drawer-subtitle');
    const bodyElem = document.getElementById('drawer-body');
    const sheetElem = document.getElementById('drawer-sheet');
    const backdropElem = document.getElementById('drawer-backdrop');

    if (titleElem) titleElem.textContent = spot.name;
    if (subtitleElem) subtitleElem.textContent = `${spot.localName || ''} • ${spot.category} (${spot.subdistrict})`;

    // Generate target fish interactive chips
    let fishChipsHtml = '';
    if (Array.isArray(spot.targetFish)) {
      spot.targetFish.forEach(function (fishId) {
        const fish = speciesById.get(fishId);
        const name = fish ? fish.name : fishId;
        const layerBadge = fish ? getLayerBadgeHtml(fish.waterLayer) : '';
        fishChipsHtml += `
          <button type="button" class="clickable-chip" onclick="app.navigateToSpecies('${fishId}')" style="margin-bottom: 4px;">
            <svg><use href="#icon-fish"></use></svg>
            <span>${escapeHtml(name)}</span>
            ${layerBadge}
          </button>
        `;
      });
    }

    // Generate hazards list
    let hazardsHtml = '';
    if (Array.isArray(spot.hazards)) {
      spot.hazards.forEach(function (hazard) {
        hazardsHtml += `<li class="detail-bullet-item hazard-item">${escapeHtml(hazard)}</li>`;
      });
    }

    const mapsSearchUrl = getSpotGmapsSearchUrl(spot);
    const mapsDirUrl = getSpotGmapsDirUrl(spot);

    const contentHtml = `
      <!-- Media Banner Image -->
      ${spot.imageUrl ? `
        <div class="drawer-media-wrapper">
          <img src="${escapeHtml(spot.imageUrl)}" alt="${escapeHtml(spot.name)}" class="drawer-species-banner-img" onerror="this.parentElement.style.display='none'">
        </div>
      ` : ''}

      ${spot.beginnerBadge ? `
        <!-- Beginner Friendly Spotlight -->
        <div class="beginner-callout-box">
          <div class="beginner-callout-header">
            <span class="badge badge-beginner">${escapeHtml(spot.beginnerBadge)}</span>
            <span class="beginner-callout-title">Sangat Ramah Pemula &amp; Gear Seadanya</span>
          </div>
          <p class="beginner-callout-desc">${escapeHtml(spot.beginnerReason || '')}</p>
        </div>
      ` : ''}

      <!-- GPS & Quick Actions -->
      <div class="detail-section">
        <div class="gps-box">
          <div>
            <div style="font-size: 0.72rem; color: var(--color-text-muted); text-transform: uppercase;">Koordinat GPS:</div>
            <div class="gps-coords-text">${spot.coordinates.lat.toFixed(4)}, ${spot.coordinates.lng.toFixed(4)}</div>
          </div>
          <div class="gps-actions">
            <button type="button" class="btn-gps-action" onclick="app.copyCoordinates(${spot.coordinates.lat}, ${spot.coordinates.lng}, '${escapeQuotes(spot.name)}')" title="Salin koordinat GPS">
              <svg width="14" height="14"><use href="#icon-copy"></use></svg>
              <span>Salin</span>
            </button>
            <a href="${mapsSearchUrl}" target="_blank" rel="noopener noreferrer" class="btn-gps-action" title="Buka titik koordinat di Google Maps">
              <svg width="14" height="14"><use href="#icon-map-ext"></use></svg>
              <span>Maps</span>
            </a>
            <a href="${mapsDirUrl}" target="_blank" rel="noopener noreferrer" class="btn-gps-action btn-gps-dir" title="Buka petunjuk rute ke spot ini">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
              <span>Rute</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Overview Badges & Parameter Fisik -->
      <div class="detail-section">
        <div class="detail-card-box">
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 4px;">
            ${spot.beginnerBadge ? `<span class="badge badge-beginner">${escapeHtml(spot.beginnerBadge)}</span>` : ''}
            <span class="badge badge-category">${escapeHtml(spot.category)}</span>
            <span class="badge badge-subdistrict">Kecamatan ${escapeHtml(spot.subdistrict)}</span>
          </div>

          <div class="spot-param-stack">
            <div class="spot-param-card" style="border-left: 3px solid var(--color-tengah);">
              <div class="spot-param-label" style="color: #38bdf8;">
                <svg width="13" height="13"><use href="#icon-layer-dasar"></use></svg>
                <span>Kedalaman Air:</span>
              </div>
              <div class="spot-param-value">${escapeHtml(spot.depth)}</div>
            </div>

            <div class="spot-param-card" style="border-left: 3px solid var(--color-dasar);">
              <div class="spot-param-label" style="color: #fbbf24;">
                <svg width="13" height="13"><use href="#icon-pin"></use></svg>
                <span>Kontur Dasar:</span>
              </div>
              <div class="spot-param-value">${escapeHtml(spot.bottomContour)}</div>
            </div>

            <div class="spot-param-card" style="border-left: 3px solid #94a3b8;">
              <div class="spot-param-label" style="color: #cbd5e1;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17l6-6 4 4 8-8"></path><path d="M14 7h7v7"></path></svg>
                <span>Karakteristik Medan:</span>
              </div>
              <div class="spot-param-value">${escapeHtml(spot.terrain)}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Akses & Retribusi -->
      <div class="detail-section">
        <div class="detail-section-title">
          <svg><use href="#icon-pin"></use></svg>
          <span>Aksesibilitas &amp; Logistik</span>
        </div>
        <div class="detail-card-box">
          <div><strong>Akses Jalan:</strong> ${escapeHtml(spot.access ? spot.access.roadType : '-')}</div>
          <div><strong>Kendaraan:</strong> ${escapeHtml(spot.access ? spot.access.vehicle : '-')}</div>
          <div><strong>Retribusi / Tiket:</strong> ${escapeHtml(spot.access ? spot.access.fee : '-')}</div>
          <div><strong>Keamanan Parkir:</strong> ${escapeHtml(spot.access ? spot.access.safety : '-')}</div>
        </div>
      </div>

      <!-- Kondisi Terbaik -->
      <div class="detail-section">
        <div class="detail-section-title">
          <svg><use href="#icon-clock"></use></svg>
          <span>Kondisi Paling Produktif</span>
        </div>
        <div class="detail-card-box">
          <div><strong>Fase Pasang:</strong> ${escapeHtml(spot.bestConditions ? spot.bestConditions.tide : '-')}</div>
          <div><strong>Waktu Emas:</strong> ${escapeHtml(spot.bestConditions ? spot.bestConditions.time : '-')}</div>
          <div><strong>Musim &amp; Cuaca:</strong> ${escapeHtml(spot.bestConditions ? spot.bestConditions.season : '-')}</div>
        </div>
      </div>

      <!-- Target Ikan -->
      <div class="detail-section">
        <div class="detail-section-title">
          <svg><use href="#icon-fish"></use></svg>
          <span>Target Spesies Ikan (${spot.targetFish ? spot.targetFish.length : 0})</span>
        </div>
        <p style="font-size: 0.78rem; color: var(--color-text-muted); margin-bottom: 6px;">
          Klik spesies ikan di bawah ini untuk melihat taktik umpan, kedalaman air, dan rangkaian rigging-nya:
        </p>
        <div class="interactive-chips-row">
          ${fishChipsHtml}
        </div>
      </div>

      <!-- Peringatan Bahaya & Keselamatan -->
      <div class="detail-section">
        <div class="detail-section-title" style="color: var(--color-danger);">
          <svg><use href="#icon-warning"></use></svg>
          <span>Peringatan Bahaya &amp; Keselamatan Angler</span>
        </div>
        <div class="detail-card-box" style="border-color: rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.08);">
          <ul class="detail-bullet-list">
            ${hazardsHtml}
          </ul>
        </div>
      </div>
    `;

    if (bodyElem) {
      bodyElem.innerHTML = contentHtml;
      bodyElem.scrollTop = 0;
    }

    if (sheetElem) sheetElem.classList.add('active');
    if (backdropElem) backdropElem.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function openSpeciesModal(speciesId) {
    const fish = speciesById.get(speciesId);
    if (!fish) return;

    state.activeEntityDetail = { type: 'species', id: speciesId };
    updateModalFavButton('species', speciesId);

    const titleElem = document.getElementById('drawer-title');
    const subtitleElem = document.getElementById('drawer-subtitle');
    const bodyElem = document.getElementById('drawer-body');
    const sheetElem = document.getElementById('drawer-sheet');
    const backdropElem = document.getElementById('drawer-backdrop');

    if (titleElem) titleElem.textContent = fish.name;
    if (subtitleElem) subtitleElem.textContent = `${fish.localName} • ${fish.scientificName}`;

    // Natural baits list
    let naturalBaitsHtml = '';
    if (Array.isArray(fish.naturalBaits)) {
      fish.naturalBaits.forEach(function (bait) {
        naturalBaitsHtml += `<li class="detail-bullet-item">${escapeHtml(bait)}</li>`;
      });
    }

    // Artificial lures list
    let luresHtml = '';
    if (Array.isArray(fish.artificialLures)) {
      fish.artificialLures.forEach(function (lure) {
        luresHtml += `<li class="detail-bullet-item">${escapeHtml(lure)}</li>`;
      });
    }

    // Productive spots interactive chips
    let spotsChipsHtml = '';
    if (Array.isArray(fish.productiveSpotIds)) {
      fish.productiveSpotIds.forEach(function (spotId) {
        const spot = spotsById.get(spotId);
        const name = spot ? spot.name : spotId;
        const sub = spot ? spot.subdistrict : '';
        spotsChipsHtml += `
          <button type="button" class="clickable-chip" onclick="app.navigateToSpot('${spotId}')" style="margin-bottom: 4px;">
            <svg><use href="#icon-pin"></use></svg>
            <span>${escapeHtml(name)}</span>
            <span style="font-size: 0.68rem; color: var(--color-text-muted);">(${escapeHtml(sub)})</span>
          </button>
        `;
      });
    }

    const contentHtml = `
      <!-- Media Banner Image -->
      ${fish.imageUrl ? `
        <div class="drawer-media-wrapper">
          <img src="${escapeHtml(fish.imageUrl)}" alt="${escapeHtml(fish.name)}" class="drawer-species-banner-img" onerror="this.parentElement.style.display='none'">
        </div>
      ` : ''}

      <!-- Glanceable Badges & Taxonomy -->
      <div class="detail-section">
        <div class="detail-card-box">
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 6px;">
            ${getLayerBadgeHtml(fish.waterLayer)}
            <span class="badge" style="background: rgba(14, 165, 233, 0.15); border: 1px solid var(--color-tengah); color: #38bdf8;">
              <svg width="12" height="12"><use href="#icon-temp"></use></svg> Suhu: ${escapeHtml(fish.optimalTemp)}
            </span>
            <span class="badge" style="background: rgba(168, 85, 247, 0.15); border: 1px solid #a855f7; color: #c084fc;">
              <svg width="12" height="12"><use href="#icon-clock"></use></svg> Makan: ${escapeHtml(fish.feedingTime.split('(')[0].trim())}
            </span>
          </div>
          <div class="detail-grid-2">
            <div><strong>Nama Lokal:</strong> ${escapeHtml(fish.localName)}</div>
            <div><strong>Nama Inggris:</strong> ${escapeHtml(fish.englishName)}</div>
            <div style="grid-column: 1 / -1;"><strong>Nama Ilmiah:</strong> <em>${escapeHtml(fish.scientificName)}</em></div>
          </div>
        </div>
      </div>

      <!-- Kondisi Air & Cuaca -->
      <div class="detail-section">
        <div class="detail-section-title">
          <svg><use href="#icon-tide"></use></svg>
          <span>Preferensi Perairan &amp; Cuaca</span>
        </div>
        <div class="detail-card-box">
          <div><strong>Waktu Makan Puncak:</strong> ${escapeHtml(fish.feedingTime)}</div>
          <div style="margin-top: 4px;"><strong>Preferensi Cuaca &amp; Arus:</strong> ${escapeHtml(fish.weatherPreference)}</div>
        </div>
      </div>

      <!-- Umpan Alami -->
      <div class="detail-section">
        <div class="detail-section-title">
          <svg><use href="#icon-rig"></use></svg>
          <span>Umpan Alami &amp; Cara Memasang</span>
        </div>
        <div class="detail-card-box">
          <ul class="detail-bullet-list">
            ${naturalBaitsHtml}
          </ul>
        </div>
      </div>

      <!-- Umpan Tiruan / Lure -->
      <div class="detail-section">
        <div class="detail-section-title">
          <svg><use href="#icon-fish"></use></svg>
          <span>Umpan Tiruan (Lure) &amp; Teknik Retrieve</span>
        </div>
        <div class="detail-card-box">
          <ul class="detail-bullet-list">
            ${luresHtml}
          </ul>
        </div>
      </div>

      <!-- Tackle Rigging -->
      <div class="detail-section">
        <div class="detail-section-title">
          <svg><use href="#icon-rig"></use></svg>
          <span>Spesifikasi Piranti &amp; Rigging (Tackle)</span>
        </div>
        <div class="detail-card-box">
          <div><strong>Senar Utama:</strong> ${escapeHtml(fish.tackleRigging ? fish.tackleRigging.line : '-')}</div>
          <div><strong>Leader:</strong> ${escapeHtml(fish.tackleRigging ? fish.tackleRigging.leader : '-')}</div>
          <div><strong>Mata Kail:</strong> ${escapeHtml(fish.tackleRigging ? fish.tackleRigging.hook : '-')}</div>
          <div style="margin-top: 4px; padding-top: 4px; border-top: 1px dashed var(--color-card-border);">
            <strong>Teknik Rangkaian:</strong> ${escapeHtml(fish.tackleRigging ? fish.tackleRigging.technique : '-')}
          </div>
        </div>
      </div>

      <!-- Spot Produktif -->
      <div class="detail-section">
        <div class="detail-section-title">
          <svg><use href="#icon-pin"></use></svg>
          <span>Spot Paling Produktif di Probolinggo (${fish.productiveSpotIds ? fish.productiveSpotIds.length : 0})</span>
        </div>
        <p style="font-size: 0.78rem; color: var(--color-text-muted); margin-bottom: 6px;">
          Klik spot di bawah untuk melihat akses, koordinat GPS, dan medan pesisirnya:
        </p>
        <div class="interactive-chips-row">
          ${spotsChipsHtml}
        </div>
      </div>

      <!-- Sumber Ensiklopedia Wikipedia -->
      ${fish.wikiUrl ? `
        <div class="detail-section" style="margin-top: 14px;">
          <a href="${escapeHtml(fish.wikiUrl)}" target="_blank" rel="noopener noreferrer" class="btn-wiki-banner" title="Buka artikel Wikipedia tentang ${escapeHtml(fish.name)}">
            <div class="wiki-banner-left">
              <span class="wiki-banner-icon">📖</span>
              <div class="wiki-banner-text">
                <strong>Baca Artikel Wikipedia: ${escapeHtml(fish.name.split('/')[0].trim())}</strong>
                <span>Taksonomi, morfologi, habitat laut, &amp; referensi ilmiah lengkap</span>
              </div>
            </div>
            <div class="wiki-banner-arrow">&rarr;</div>
          </a>
        </div>
      ` : ''}
    `;

    if (bodyElem) {
      bodyElem.innerHTML = contentHtml;
      bodyElem.scrollTop = 0;
    }

    if (sheetElem) sheetElem.classList.add('active');
    if (backdropElem) backdropElem.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    const sheetElem = document.getElementById('drawer-sheet');
    const backdropElem = document.getElementById('drawer-backdrop');

    if (sheetElem) sheetElem.classList.remove('active');
    if (backdropElem) backdropElem.classList.remove('active');
    document.body.classList.remove('modal-open');
    state.activeEntityDetail = null;
  }

  // --------------------------------------------------------------------------
  // BIDIRECTIONAL CROSS-REFERENCING
  // --------------------------------------------------------------------------

  /**
   * Switches to Species tab, opens the species drawer modal, and pulses the species card
   */
  function navigateToSpecies(speciesId) {
    switchTab('species');
    openSpeciesModal(speciesId);

    // After slight delay, highlight the card in the list
    setTimeout(function () {
      const card = document.getElementById(`card-species-${speciesId}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.remove('card-pulse');
        // Force reflow
        void card.offsetWidth;
        card.classList.add('card-pulse');
        setTimeout(function () {
          card.classList.remove('card-pulse');
        }, 3200);
      }
    }, 150);
  }

  /**
   * Switches to Spots tab, opens the spot drawer modal, and pulses the spot card
   */
  function navigateToSpot(spotId) {
    switchTab('spots');
    openSpotModal(spotId);

    // After slight delay, highlight the card in the list
    setTimeout(function () {
      const card = document.getElementById(`card-spot-${spotId}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.remove('card-pulse');
        // Force reflow
        void card.offsetWidth;
        card.classList.add('card-pulse');
        setTimeout(function () {
          card.classList.remove('card-pulse');
        }, 3200);
      }
    }, 150);
  }

  // --------------------------------------------------------------------------
  // CLIPBOARD COPY & TOAST NOTIFICATION
  // --------------------------------------------------------------------------
  let toastTimeout = null;

  function showToast(message, duration) {
    const toast = document.getElementById('toast-container');
    const msgElem = document.getElementById('toast-message');
    if (!toast || !msgElem) return;

    msgElem.textContent = message;
    toast.classList.add('active');

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toastTimeout = setTimeout(function () {
      toast.classList.remove('active');
    }, duration || 2600);
  }

  function copyCoordinates(lat, lng, spotName) {
    const text = `${lat}, ${lng}`;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () {
        showToast(`Koordinat ${spotName || ''} (${text}) berhasil disalin!`);
      }).catch(function () {
        fallbackCopy(text, spotName);
      });
    } else {
      fallbackCopy(text, spotName);
    }
  }

  function fallbackCopy(text, spotName) {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (success) {
        showToast(`Koordinat ${spotName || ''} (${text}) berhasil disalin!`);
      } else {
        showToast(`Koordinat: ${text}`);
      }
    } catch (e) {
      showToast(`Koordinat: ${text}`);
    }
  }

  // --------------------------------------------------------------------------
  // TAB NAVIGATION
  // --------------------------------------------------------------------------
  function switchTab(tabId) {
    if (!tabId || (tabId !== 'spots' && tabId !== 'map' && tabId !== 'species' && tabId !== 'tactics')) {
      tabId = 'spots';
    }

    state.activeTab = tabId;

    // Update bottom nav buttons
    const navButtons = document.querySelectorAll('.nav-tab-btn');
    navButtons.forEach(function (btn) {
      const target = btn.getAttribute('data-tab');
      if (target === tabId) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // Update tab content visibility
    const views = document.querySelectorAll('.tab-content');
    views.forEach(function (view) {
      if (view.id === `view-${tabId}`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    updateFavoriteCounters();
    // Re-render data for the newly activated tab
    if (tabId === 'spots') {
      renderSpots();
    } else if (tabId === 'map') {
      initMap();
      setTimeout(function () {
        if (mapInstance) {
          mapInstance.invalidateSize();
        }
      }, 150);
    } else if (tabId === 'species') {
      renderSpecies();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --------------------------------------------------------------------------
  // RESET ALL FILTERS
  // --------------------------------------------------------------------------
  function resetAllFilters() {
    state.searchQuery = '';
    state.selectedLayer = 'all';
    state.selectedCategory = 'all';
    state.selectedBait = 'all';

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.value = '';
    }

    // Reset active chip classes
    const allChips = document.querySelectorAll('.filter-chip');
    allChips.forEach(function (chip) {
      const val = chip.getAttribute('data-value');
      if (val === 'all') {
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');
      } else {
        chip.classList.remove('active');
        chip.setAttribute('aria-pressed', 'false');
      }
    });

    reRenderCurrentTab();
    showToast('Semua filter berhasil direset.');
  }

  // --------------------------------------------------------------------------
  // EVENT LISTENERS SETUP
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    // 1. Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        state.searchQuery = e.target.value;
        reRenderCurrentTab();
      });
    }

    // 2. Clear search button
    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        state.searchQuery = '';
        reRenderCurrentTab();
      });
    }

    // 3. Filter chips
    const filterRows = document.querySelectorAll('.filter-row');
    filterRows.forEach(function (row) {
      row.addEventListener('click', function (e) {
        const chip = e.target.closest('.filter-chip');
        if (!chip) return;

        const filterType = chip.getAttribute('data-filter');
        const filterVal = chip.getAttribute('data-value');

        // Toggle or set
        if (filterType === 'layer') {
          state.selectedLayer = filterVal;
        } else if (filterType === 'category') {
          state.selectedCategory = filterVal;
        } else if (filterType === 'bait') {
          state.selectedBait = filterVal;
        }

        // Update active class in this row
        const siblings = row.querySelectorAll('.filter-chip');
        siblings.forEach(function (sibling) {
          if (sibling === chip) {
            sibling.classList.add('active');
            sibling.setAttribute('aria-pressed', 'true');
          } else {
            sibling.classList.remove('active');
            sibling.setAttribute('aria-pressed', 'false');
          }
        });

        reRenderCurrentTab();
      });
    });

    // 4. Reset filters button
    const resetBtn = document.getElementById('btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetAllFilters);
    }

    // 5. Bottom nav tabs
    const navButtons = document.querySelectorAll('.nav-tab-btn');
    navButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const targetTab = btn.getAttribute('data-tab');
        switchTab(targetTab);
      });
    });

    // 6. Modal close button
    const closeBtn = document.getElementById('btn-drawer-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // 7. Modal backdrop click
    const backdrop = document.getElementById('drawer-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', closeModal);
    }

    // 8. ESC key listener
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && state.activeEntityDetail !== null) {
        closeModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // THEME SYSTEM
  // --------------------------------------------------------------------------
  const THEMES = [
    { id: 'sunset', name: 'Senja Karang', icon: '🌅', color: '#ff6224', themeColor: '#0e0d12' },
    { id: 'emerald', name: 'Samudera Hijau', icon: '🌿', color: '#10b981', themeColor: '#071211' },
    { id: 'daylight', name: 'Terik Siang', icon: '☀️', color: '#ea580c', themeColor: '#f4f5f7' },
    { id: 'navy', name: 'Malam Navy', icon: '🌙', color: '#06b6d4', themeColor: '#090e17' }
  ];

  function initTheme() {
    let saved = 'sunset';
    try {
      saved = localStorage.getItem('pbg_fishing_theme') || 'sunset';
    } catch (e) {}
    setTheme(saved, false);
  }

  function setTheme(themeId, notify) {
    const theme = THEMES.find(function (t) { return t.id === themeId; }) || THEMES[0];
    document.documentElement.setAttribute('data-theme', theme.id);

    // Update meta theme-color for mobile status bar
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme.themeColor);
    }

    // Update switcher pill UI
    const label = document.getElementById('theme-name-label');
    const icon = document.getElementById('theme-icon');
    if (label) label.textContent = theme.name.split(' ')[0];
    if (icon) icon.textContent = theme.icon;

    // Save to localStorage
    try {
      localStorage.setItem('pbg_fishing_theme', theme.id);
    } catch (e) {}

    // Update coastal polyline color if map is initialized
    if (coastalPolyline) {
      try {
        const accent = (typeof getComputedStyle !== 'undefined'
          ? getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim()
          : '') || theme.color;
        coastalPolyline.setStyle({ color: accent });
      } catch (err) {}
    }

    if (notify) {
      showToast(`${theme.icon} Tema diaktifkan: ${theme.name}`);
    }
  }

  function cycleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'sunset';
    let idx = THEMES.findIndex(function (t) { return t.id === current; });
    if (idx === -1) idx = 0;
    const nextIdx = (idx + 1) % THEMES.length;
    const nextTheme = THEMES[nextIdx];
    setTheme(nextTheme.id, true);
  }

  // --------------------------------------------------------------------------
  // INITIALIZATION
  // --------------------------------------------------------------------------
  function init() {
    initTheme();
    initData();
    loadFavorites();
    updateLiveSolunarWidget();
    setInterval(updateLiveSolunarWidget, 60000);
    initCollapsibleFilters();
    setupEventListeners();
    renderSpots();
    renderSpecies();
    updateFilterStatusBar();
  }

  // Run on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose public API for inline onclick handlers
  window.app = {
    openSpotModal: openSpotModal,
    openSpeciesModal: openSpeciesModal,
    closeModal: closeModal,
    navigateToSpecies: navigateToSpecies,
    navigateToSpot: navigateToSpot,
    focusSpotOnMap: focusSpotOnMap,
    resetMapBounds: resetMapBounds,
    copyCoordinates: copyCoordinates,
    switchTab: switchTab,
    resetAllFilters: resetAllFilters,
    cycleTheme: cycleTheme,
    setTheme: setTheme,
    toggleFavorite: toggleFavorite,
    isFavorite: isFavorite
  };

})();
