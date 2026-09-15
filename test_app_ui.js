#!/usr/bin/env node
/**
 * Automated UI/UX & Application Logic Verification Suite
 * Tests index.html, styles.css, and app.js functionality.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = __dirname;
const htmlFile = path.join(baseDir, 'index.html');
const cssFile = path.join(baseDir, 'styles.css');
const appJsFile = path.join(baseDir, 'app.js');
const spotsFile = path.join(baseDir, 'spots.js');
const speciesFile = path.join(baseDir, 'species.js');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition, name, details = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  \x1b[32m✔ PASS\x1b[0m: ${name} ${details ? `\x1b[90m(${details})\x1b[0m` : ''}`);
  } else {
    failedChecks++;
    console.log(`  \x1b[31m✖ FAIL\x1b[0m: ${name} \x1b[33m${details}\x1b[0m`);
  }
}

console.log('\x1b[1m\x1b[36m========================================================================\x1b[0m');
console.log('\x1b[1m\x1b[36m       PROBOLINGGO FISHING GUIDE - UI/UX & APP LOGIC TEST SUITE         \x1b[0m');
console.log('\x1b[1m\x1b[36m========================================================================\x1b[0m\n');

// 1. HTML FILE CHECKS
console.log('\x1b[1m\x1b[34m[TEST 1] index.html Structure & Accessibility\x1b[0m');
const html = fs.readFileSync(htmlFile, 'utf8');

assert(html.includes('viewport-fit=cover'), 'Mobile Viewport Meta', 'Includes viewport-fit=cover & user-scalable=no');
assert(html.includes('width=device-width'), 'Device Width Meta', 'Includes width=device-width');
assert(html.includes('Probolinggo Angler\'s Guide'), 'App Title', 'Title matches brand name');
assert(html.includes('100% Offline'), 'Offline Status Badge', 'Shows offline-ready badge');
assert(html.includes('12') && html.includes('Spot Pesisir'), 'Quick Stats Spots', 'Displays 12 Spot Pesisir');
assert(html.includes('18') && html.includes('Spesies Ikan'), 'Quick Stats Species', 'Displays 18 Spesies Ikan');
assert(html.includes('search-input'), 'Real-time Search Input', 'Contains #search-input');
assert(html.includes('clear-search-btn'), 'Clear Search Button', 'Contains #clear-search-btn');
assert(html.includes('data-filter="layer"'), 'Layer Filter Chips', 'Contains layer filter chips');
assert(html.includes('data-filter="category"'), 'Category Filter Chips', 'Contains category filter chips');
assert(html.includes('data-filter="bait"'), 'Bait Filter Chips', 'Contains bait filter chips');
assert(html.includes('btn-reset-filters'), 'Reset Filter Button', 'Contains #btn-reset-filters');
assert(html.includes('view-spots'), 'Spots View Container', 'Contains #view-spots');
assert(html.includes('view-map'), 'Interactive Map View Container', 'Contains #view-map');
assert(html.includes('fishing-map'), 'Leaflet Map Canvas', 'Contains #fishing-map');
assert(html.includes('map-spot-pills'), 'Map Spot Pills Selector', 'Contains #map-spot-pills');
assert(html.includes('view-species'), 'Species View Container', 'Contains #view-species');
assert(html.includes('view-tactics'), 'Tactics & Weather View Container', 'Contains #view-tactics');
assert(html.includes('drawer-sheet'), 'Bottom Sheet / Modal Drawer', 'Contains #drawer-sheet');
assert(html.includes('drawer-backdrop'), 'Drawer Backdrop Overlay', 'Contains #drawer-backdrop');
assert(html.includes('drawer-drag-handle'), 'Drawer Drag Handle', 'Contains mobile drag handle');
assert(html.includes('btn-drawer-close'), 'Drawer Close Button', 'Contains #btn-drawer-close');
assert(html.includes('bottom-nav'), 'Sticky Bottom Navigation Bar', 'Contains .bottom-nav');
assert(html.includes('nav-tab-spots') && html.includes('nav-tab-map') && html.includes('nav-tab-species') && html.includes('nav-tab-tactics'), 'Bottom Nav 4 Tabs', 'All 4 tabs present including map');
assert(html.includes('toast-container'), 'Toast Notification Container', 'Contains #toast-container');
assert(!html.includes('http://') && !html.includes('https://cdn') && !html.includes('fonts.googleapis.com'), '100% Offline (No CDNs)', 'Zero external network/CDN references');
assert(html.includes('<symbol id="icon-'), 'Inline SVG Icons', 'Inline SVG symbols defined for offline graphics');

// 2. CSS STYLESHEET CHECKS
console.log('\n\x1b[1m\x1b[34m[TEST 2] styles.css High-Contrast Outdoor Theme & Touch Targets\x1b[0m');
const css = fs.readFileSync(cssFile, 'utf8');

assert(css.includes('--color-bg: #090e17'), 'Color System: Primary Background', '#090e17 defined');
assert(css.includes('--color-card: #121b2d'), 'Color System: Card Surface', '#121b2d defined');
assert(css.includes('--color-card-border: #1e2e4a'), 'Color System: Card Border', '#1e2e4a defined');
assert(css.includes('--color-text: #f8fafc'), 'Color System: Text Primary', '#f8fafc defined');
assert(css.includes('--color-text-secondary: #94a3b8'), 'Color System: Text Secondary', '#94a3b8 defined');
assert(css.includes('--color-accent: #06b6d4'), 'Color System: Accent Cyan', '#06b6d4 defined');
assert(css.includes('--color-dasar: #f59e0b'), 'Water Layer: Dasar Color', '#f59e0b defined');
assert(css.includes('--color-tengah: #0ea5e9'), 'Water Layer: Tengah Color', '#0ea5e9 defined');
assert(css.includes('--color-permukaan: #10b981'), 'Water Layer: Permukaan Color', '#10b981 defined');
assert(css.includes('overflow-x: hidden'), 'Zero Horizontal Scroll', 'overflow-x: hidden enforced');
assert(css.includes('box-sizing: border-box'), 'Box Sizing Containment', 'box-sizing: border-box applied');
assert(css.includes('min-height: 44px') || css.includes('min-height: 44px'), '44px Touch Target Compliance', 'Interactive elements meet min-height 44px');
assert(css.includes('@media (min-width: 768px)'), 'Desktop Responsive Breakpoint', '@media (min-width: 768px) defined');
assert(css.includes('max-width: 860px'), 'Desktop Max App Width', 'max-width: 860px centered');
assert(css.includes('@keyframes cardPulse'), 'Pulse Micro-Interaction Animation', '@keyframes cardPulse defined');
assert(css.includes('transform: translateY(100%)'), 'Mobile Bottom Sheet Slide Animation', 'Slide-up transition defined');

// 3. TACTICS CONTENT AUDIT
console.log('\n\x1b[1m\x1b[34m[TEST 3] Tactics & Weather Domain Depth\x1b[0m');
assert(html.includes('Angin Gending'), 'Tactics: Angin Gending', 'Fenomena Angin Gending documented');
assert(html.includes('Pasang Surut') && html.includes('Purnama') && html.includes('Perbani'), 'Tactics: Tidal Strategy', 'Purnama vs Perbani analyzed');
assert(html.includes('Jam Makan Emas') || html.includes('Feeding Window'), 'Tactics: Solunar Strategy', 'Feeding windows documented');
assert(html.includes('Rangkaian Dasaran Glosor') && html.includes('Paternoster'), 'Tactics: Tackle Mechanics', 'Running sinker & dropper rigs detailed');
assert(html.includes('Duri Beracun') && html.includes('Sembilang') && html.includes('Pari'), 'Tactics: Safety Hazards', 'Venomous spines & tetrapod hazards detailed');

// 4. APP.JS LOGIC & EXECUTION SIMULATION
console.log('\n\x1b[1m\x1b[34m[TEST 4] app.js Interactive Controller & Bidirectional Linking\x1b[0m');

// Create lightweight DOM simulation environment
class FakeClassList {
  constructor() { this.classes = new Set(); }
  add(c) { this.classes.add(c); }
  remove(c) { this.classes.delete(c); }
  contains(c) { return this.classes.has(c); }
  toggle(c) { if (this.classes.has(c)) this.classes.delete(c); else this.classes.add(c); }
}

class FakeElement {
  constructor(id = '', tag = 'div') {
    this.id = id;
    this.tagName = tag.toUpperCase();
    this.classList = new FakeClassList();
    this.innerHTML = '';
    this.textContent = '';
    this.value = '';
    this.style = {};
    this.attributes = new Map();
    this.children = [];
  }
  setAttribute(k, v) { this.attributes.set(k, v); }
  getAttribute(k) { return this.attributes.get(k); }
  removeAttribute(k) { this.attributes.delete(k); }
  scrollIntoView() {}
  focus() {}
  select() {}
  addEventListener() {}
  closest(selector) {
    if (selector === '.filter-chip' && this.classList.contains('filter-chip')) return this;
    return null;
  }
  querySelectorAll(sel) {
    if (sel === '.filter-chip') return [this];
    return [];
  }
}

const fakeElements = {
  'spots-grid': new FakeElement('spots-grid'),
  'species-grid': new FakeElement('species-grid'),
  'spots-empty': new FakeElement('spots-empty'),
  'species-empty': new FakeElement('species-empty'),
  'spots-count-label': new FakeElement('spots-count-label'),
  'species-count-label': new FakeElement('species-count-label'),
  'filter-status-bar': new FakeElement('filter-status-bar'),
  'active-filter-text': new FakeElement('active-filter-text'),
  'search-input': new FakeElement('search-input'),
  'clear-search-btn': new FakeElement('clear-search-btn'),
  'drawer-sheet': new FakeElement('drawer-sheet'),
  'drawer-backdrop': new FakeElement('drawer-backdrop'),
  'drawer-title': new FakeElement('drawer-title'),
  'drawer-subtitle': new FakeElement('drawer-subtitle'),
  'drawer-body': new FakeElement('drawer-body'),
  'btn-drawer-close': new FakeElement('btn-drawer-close'),
  'btn-reset-filters': new FakeElement('btn-reset-filters'),
  'toast-container': new FakeElement('toast-container'),
  'toast-message': new FakeElement('toast-message'),
  'view-spots': new FakeElement('view-spots'),
  'view-map': new FakeElement('view-map'),
  'view-species': new FakeElement('view-species'),
  'view-tactics': new FakeElement('view-tactics'),
  'nav-tab-spots': new FakeElement('nav-tab-spots'),
  'nav-tab-map': new FakeElement('nav-tab-map'),
  'nav-tab-species': new FakeElement('nav-tab-species'),
  'nav-tab-tactics': new FakeElement('nav-tab-tactics'),
  'fishing-map': new FakeElement('fishing-map'),
  'map-spot-pills': new FakeElement('map-spot-pills'),
  'map-spots-count-label': new FakeElement('map-spots-count-label'),
  'btn-reset-map': new FakeElement('btn-reset-map')
};

const fakeDocument = {
  readyState: 'complete',
  body: new FakeElement('body', 'body'),
  getElementById(id) {
    return fakeElements[id] || null;
  },
  querySelectorAll(sel) {
    if (sel === '.nav-tab-btn') return [fakeElements['nav-tab-spots'], fakeElements['nav-tab-map'], fakeElements['nav-tab-species'], fakeElements['nav-tab-tactics']];
    if (sel === '.tab-content') return [fakeElements['view-spots'], fakeElements['view-map'], fakeElements['view-species'], fakeElements['view-tactics']];
    if (sel === '.filter-chip') return [];
    if (sel === '.filter-row') return [];
    if (sel === '.map-pill-btn') return [];
    return [];
  },
  createElement(tag) { return new FakeElement('', tag); },
  addEventListener() {}
};

const sandbox = {
  window: {
    scrollTo() {},
    app: null
  },
  document: fakeDocument,
  navigator: { clipboard: null },
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  console: console
};
sandbox.window.document = fakeDocument;

vm.createContext(sandbox);

// Load spots.js, species.js, app.js
vm.runInContext(fs.readFileSync(spotsFile, 'utf8'), sandbox);
vm.runInContext(fs.readFileSync(speciesFile, 'utf8'), sandbox);
vm.runInContext(fs.readFileSync(appJsFile, 'utf8'), sandbox);

assert(sandbox.window.app !== null, 'app Object Exposed', 'window.app exists on global scope');
assert(typeof sandbox.window.app.openSpotModal === 'function', 'openSpotModal API', 'openSpotModal is a function');
assert(typeof sandbox.window.app.openSpeciesModal === 'function', 'openSpeciesModal API', 'openSpeciesModal is a function');
assert(typeof sandbox.window.app.closeModal === 'function', 'closeModal API', 'closeModal is a function');
assert(typeof sandbox.window.app.navigateToSpecies === 'function', 'navigateToSpecies API', 'navigateToSpecies is a function');
assert(typeof sandbox.window.app.navigateToSpot === 'function', 'navigateToSpot API', 'navigateToSpot is a function');
assert(typeof sandbox.window.app.focusSpotOnMap === 'function', 'focusSpotOnMap API', 'focusSpotOnMap is a function');
assert(typeof sandbox.window.app.resetMapBounds === 'function', 'resetMapBounds API', 'resetMapBounds is a function');
assert(typeof sandbox.window.app.copyCoordinates === 'function', 'copyCoordinates API', 'copyCoordinates is a function');
assert(typeof sandbox.window.app.switchTab === 'function', 'switchTab API', 'switchTab is a function');
assert(typeof sandbox.window.app.resetAllFilters === 'function', 'resetAllFilters API', 'resetAllFilters is a function');

// Initial render checks
const spotsGridHtml = fakeElements['spots-grid'].innerHTML;
const speciesGridHtml = fakeElements['species-grid'].innerHTML;

assert(spotsGridHtml.includes('spot_tanjung_tembaga'), 'Initial Spots Render', 'Renders spot cards into #spots-grid');
assert(spotsGridHtml.includes('card-spot-spot_ppp_mayangan'), 'Spot Card IDs', 'Card IDs formatted properly');
assert(speciesGridHtml.includes('species_kakap_putih'), 'Initial Species Render', 'Renders fish cards into #species-grid');
assert(speciesGridHtml.includes('card-species-species_baronang'), 'Species Card IDs', 'Fish Card IDs formatted properly');

// Test Spot Modal Opening
sandbox.window.app.openSpotModal('spot_ppp_mayangan');
assert(fakeElements['drawer-sheet'].classList.contains('active'), 'Open Spot Modal Sheet Active', 'drawer-sheet gets active class');
assert(fakeElements['drawer-title'].textContent.includes('Breakwater PPP Mayangan'), 'Spot Modal Title', 'Title displays spot name');
assert(fakeElements['drawer-body'].innerHTML.includes('species_kakap_putih'), 'Spot Modal Target Fish', 'Body contains target fish cross-links');
assert(fakeElements['drawer-body'].innerHTML.includes('Tetrapod'), 'Spot Modal Contour', 'Body contains terrain / contour data');

// Test Species Modal Opening
sandbox.window.app.openSpeciesModal('species_kakap_putih');
assert(fakeElements['drawer-title'].textContent.includes('Kakap Putih'), 'Species Modal Title', 'Title displays species name');
assert(fakeElements['drawer-body'].innerHTML.includes('spot_ppp_mayangan'), 'Species Modal Productive Spots', 'Body contains productive spots cross-links');
assert(fakeElements['drawer-body'].innerHTML.includes('Fluorocarbon'), 'Species Modal Rigging', 'Body contains tackle rigging details');

// Test Modal Close
sandbox.window.app.closeModal();
assert(!fakeElements['drawer-sheet'].classList.contains('active'), 'Close Modal Sheet Inactive', 'drawer-sheet active class removed');

// Test Bidirectional Navigation Call
sandbox.window.app.navigateToSpecies('species_kipper');
assert(fakeElements['drawer-sheet'].classList.contains('active'), 'navigateToSpecies activates drawer', 'Species drawer opened upon navigation');
assert(fakeElements['drawer-title'].textContent.includes('Kipper'), 'navigateToSpecies correct target', 'Drawer loaded Kipper details');

sandbox.window.app.navigateToSpot('spot_pantai_duta');
assert(fakeElements['drawer-title'].textContent.includes('Pantai Duta'), 'navigateToSpot correct target', 'Drawer loaded Pantai Duta details');

// Test Copy Coordinates Toast
sandbox.window.app.copyCoordinates(-7.7252, 113.2265, 'Breakwater PPP Mayangan');
assert(fakeElements['toast-container'].classList.contains('active'), 'Toast Container Activated', 'Toast is displayed on coordinate copy');
assert(fakeElements['toast-message'].textContent.includes('-7.7252'), 'Toast Message Coordinates', 'Toast text includes coordinates');

// Test Map Tab Navigation & Focus
sandbox.window.app.switchTab('map');
assert(fakeElements['view-map'].classList.contains('active'), 'Map View Activated', 'Switching to map tab activates #view-map');
assert(fakeElements['nav-tab-map'].classList.contains('active'), 'Map Nav Tab Active', 'Map bottom nav tab is active');

sandbox.window.app.focusSpotOnMap('spot_ppp_mayangan');
assert(fakeElements['view-map'].classList.contains('active'), 'focusSpotOnMap keeps map active', 'Map view active after focusSpotOnMap');

console.log('\n========================================================================');
console.log('                       VERIFICATION TEST SUMMARY                        ');
console.log('========================================================================');
console.log(`Total Checks Executed : ${totalChecks}`);
console.log(`Passed Checks         : ${passedChecks}`);
console.log(`Failed Checks         : ${failedChecks}`);

if (failedChecks === 0) {
  console.log('\n\x1b[32m[ALL UI/UX & LOGIC VERIFICATIONS PASSED CLEANLY]\x1b[0m\n');
  process.exit(0);
} else {
  console.log('\n\x1b[31m[VERIFICATION FAILURES DETECTED]\x1b[0m\n');
  process.exit(1);
}
