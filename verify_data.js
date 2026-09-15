#!/usr/bin/env node
/**
 * Automated Verification Suite for Probolinggo Fishing Guide Data
 * Validates spot counts, species counts, schema completeness, coordinate bounds,
 * and bidirectional referential integrity between spots and species.
 */

const path = require('path');
const fs = require('fs');

console.log('\x1b[1m\x1b[36m========================================================================\x1b[0m');
console.log('\x1b[1m\x1b[36m   PROBOLINGGO COASTAL FISHING GUIDE - CORE DATA VERIFICATION SUITE    \x1b[0m');
console.log('\x1b[1m\x1b[36m========================================================================\x1b[0m\n');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const failures = [];

function pass(checkName, detail = '') {
  totalChecks++;
  passedChecks++;
  console.log(`  \x1b[32m✔ PASS\x1b[0m: ${checkName}${detail ? ` \x1b[90m(${detail})\x1b[0m` : ''}`);
}

function fail(checkName, reason) {
  totalChecks++;
  failedChecks++;
  console.log(`  \x1b[31m✖ FAIL\x1b[0m: ${checkName}`);
  console.log(`    \x1b[33m↳ ${reason}\x1b[0m`);
  failures.push({ checkName, reason });
}

function checkDeepNonNullOrEmpty(obj, pathPrefix = '') {
  const issues = [];
  if (obj === null || obj === undefined) {
    issues.push(`${pathPrefix}: value is ${obj}`);
    return issues;
  }
  if (typeof obj === 'string') {
    if (obj.trim().length === 0) {
      issues.push(`${pathPrefix}: string is empty`);
    }
    return issues;
  }
  if (typeof obj === 'number') {
    if (isNaN(obj)) {
      issues.push(`${pathPrefix}: number is NaN`);
    }
    return issues;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      issues.push(`${pathPrefix}: array is empty`);
    }
    obj.forEach((item, idx) => {
      issues.push(...checkDeepNonNullOrEmpty(item, `${pathPrefix}[${idx}]`));
    });
    return issues;
  }
  if (typeof obj === 'object') {
    for (const [key, val] of Object.entries(obj)) {
      const subPath = pathPrefix ? `${pathPrefix}.${key}` : key;
      issues.push(...checkDeepNonNullOrEmpty(val, subPath));
    }
    return issues;
  }
  return issues;
}

// ----------------------------------------------------------------------------
// LOAD DATA FILES
// ----------------------------------------------------------------------------
const spotsFile = path.join(__dirname, 'spots.js');
const speciesFile = path.join(__dirname, 'species.js');

if (!fs.existsSync(spotsFile)) {
  fail('File Exists: spots.js', `Could not find ${spotsFile}`);
} else {
  pass('File Exists: spots.js', spotsFile);
}

if (!fs.existsSync(speciesFile)) {
  fail('File Exists: species.js', `Could not find ${speciesFile}`);
} else {
  pass('File Exists: species.js', speciesFile);
}

let spotsData = null;
let fishData = null;

try {
  const spotsModule = require(spotsFile);
  spotsData = spotsModule.SPOTS_DATA || spotsModule;
  pass('Load spots.js (CommonJS)', `Export parsed successfully`);
} catch (e) {
  fail('Load spots.js (CommonJS)', `Exception while loading: ${e.message}`);
}

try {
  const speciesModule = require(speciesFile);
  fishData = speciesModule.FISH_DATA || speciesModule;
  pass('Load species.js (CommonJS)', `Export parsed successfully`);
} catch (e) {
  fail('Load species.js (CommonJS)', `Exception while loading: ${e.message}`);
}

// Browser Window Global Attachment Check
try {
  const vm = require('vm');
  const browserSandbox = { window: {} };
  vm.createContext(browserSandbox);
  vm.runInContext(fs.readFileSync(spotsFile, 'utf8'), browserSandbox);
  vm.runInContext(fs.readFileSync(speciesFile, 'utf8'), browserSandbox);
  
  if (Array.isArray(browserSandbox.window.SPOTS_DATA) && browserSandbox.window.SPOTS_DATA.length === 12) {
    pass('Browser Global: window.SPOTS_DATA', `Attached 12 spots to window`);
  } else {
    fail('Browser Global: window.SPOTS_DATA', `Failed to attach valid SPOTS_DATA array to window`);
  }

  if (Array.isArray(browserSandbox.window.FISH_DATA) && browserSandbox.window.FISH_DATA.length === 18) {
    pass('Browser Global: window.FISH_DATA', `Attached 18 species to window`);
  } else {
    fail('Browser Global: window.FISH_DATA', `Failed to attach valid FISH_DATA array to window`);
  }
} catch (e) {
  fail('Browser Window Global Evaluation', e.message);
}

// ----------------------------------------------------------------------------
// CHECK 1: Spots Count Verification (>= 10)
// ----------------------------------------------------------------------------
console.log('\n\x1b[1m\x1b[34m[CHECK 1] Spots Count Verification (Requirement: >= 10 spots)\x1b[0m');
if (Array.isArray(spotsData)) {
  if (spotsData.length >= 10) {
    pass('Spots Count Threshold', `Found ${spotsData.length} verified spots (minimum required: 10)`);
  } else {
    fail('Spots Count Threshold', `Found ${spotsData.length} spots, which is fewer than required minimum 10`);
  }
} else {
  fail('Spots Data Array', 'SPOTS_DATA is not an array');
}

// ----------------------------------------------------------------------------
// CHECK 2: Fish Species Count Verification (>= 15)
// ----------------------------------------------------------------------------
console.log('\n\x1b[1m\x1b[34m[CHECK 2] Fish Species Count Verification (Requirement: >= 15 species)\x1b[0m');
if (Array.isArray(fishData)) {
  if (fishData.length >= 15) {
    pass('Fish Species Count Threshold', `Found ${fishData.length} verified species (minimum required: 15)`);
  } else {
    fail('Fish Species Count Threshold', `Found ${fishData.length} species, which is fewer than required minimum 15`);
  }
} else {
  fail('Fish Species Data Array', 'FISH_DATA is not an array');
}

// ----------------------------------------------------------------------------
// CHECK 3: Spots Schema & Geographic Boundary Validation
// ----------------------------------------------------------------------------
console.log('\n\x1b[1m\x1b[34m[CHECK 3] Spots Schema & Geo-Boundary Validation\x1b[0m');
const allowedCategories = ['Breakwater', 'Pantai Pasir', 'Muara / Estuari', 'Dermaga / Pelabuhan'];
const allowedContours = ['Lumpur', 'Pasir', 'Karang / Bebatuan', 'Tetrapod'];

const spotIdSet = new Set();
let spotSchemaPass = true;

if (Array.isArray(spotsData)) {
  spotsData.forEach((spot, idx) => {
    const label = spot.id || `Spot Index [${idx}]`;

    // Duplicate ID check
    if (spotIdSet.has(spot.id)) {
      fail(`Unique Spot ID: ${label}`, `Duplicate spot ID detected: ${spot.id}`);
      spotSchemaPass = false;
    } else if (typeof spot.id === 'string' && spot.id.length > 0) {
      spotIdSet.add(spot.id);
    } else {
      fail(`Valid Spot ID: ${label}`, `Missing or invalid ID string`);
      spotSchemaPass = false;
    }

    // Required fields type check
    const requiredStringFields = ['name', 'localName', 'subdistrict', 'terrain', 'depth'];
    for (const field of requiredStringFields) {
      if (typeof spot[field] !== 'string' || spot[field].trim().length === 0) {
        fail(`Spot Field: ${label}.${field}`, `Expected non-empty string, got: ${typeof spot[field]}`);
        spotSchemaPass = false;
      }
    }

    // Category check
    if (!allowedCategories.includes(spot.category)) {
      fail(`Spot Category: ${label}`, `Invalid category '${spot.category}'. Must be one of: ${allowedCategories.join(', ')}`);
      spotSchemaPass = false;
    }

    // Bottom contour check
    if (!allowedContours.includes(spot.bottomContour)) {
      fail(`Spot Bottom Contour: ${label}`, `Invalid bottomContour '${spot.bottomContour}'. Must be one of: ${allowedContours.join(', ')}`);
      spotSchemaPass = false;
    }

    // Coordinates check (Probolinggo coastal bounds: lat -8.10 to -7.50, lng 113.00 to 113.70)
    const lat = spot.coordinates?.lat;
    const lng = spot.coordinates?.lng;
    const latValid = typeof lat === 'number' && lat >= -8.10 && lat <= -7.50;
    const lngValid = typeof lng === 'number' && lng >= 113.00 && lng <= 113.70;

    if (latValid && lngValid) {
      pass(`Coordinates in Bounds: ${label}`, `lat: ${lat}, lng: ${lng}`);
    } else {
      fail(`Coordinates in Bounds: ${label}`, `Coordinates (${lat}, ${lng}) outside Probolinggo bounding box [-8.10..-7.50, 113.00..113.70]`);
      spotSchemaPass = false;
    }

    // Access object check
    const accessFields = ['roadType', 'vehicle', 'fee', 'safety'];
    if (typeof spot.access === 'object' && spot.access !== null) {
      for (const af of accessFields) {
        if (typeof spot.access[af] !== 'string' || spot.access[af].trim().length === 0) {
          fail(`Spot Access Field: ${label}.access.${af}`, `Missing or empty string`);
          spotSchemaPass = false;
        }
      }
    } else {
      fail(`Spot Access Object: ${label}`, `Missing or invalid access object`);
      spotSchemaPass = false;
    }

    // Target Fish array
    if (!Array.isArray(spot.targetFish) || spot.targetFish.length === 0) {
      fail(`Spot Target Fish: ${label}`, `targetFish must be a non-empty array of strings`);
      spotSchemaPass = false;
    }

    // Best Conditions object
    const condFields = ['tide', 'season', 'time'];
    if (typeof spot.bestConditions === 'object' && spot.bestConditions !== null) {
      for (const cf of condFields) {
        if (typeof spot.bestConditions[cf] !== 'string' || spot.bestConditions[cf].trim().length === 0) {
          fail(`Spot Best Conditions: ${label}.bestConditions.${cf}`, `Missing or empty string`);
          spotSchemaPass = false;
        }
      }
    } else {
      fail(`Spot Best Conditions: ${label}`, `Missing or invalid bestConditions object`);
      spotSchemaPass = false;
    }

    // Hazards array
    if (!Array.isArray(spot.hazards) || spot.hazards.length === 0) {
      fail(`Spot Hazards: ${label}`, `hazards must be a non-empty array of strings`);
      spotSchemaPass = false;
    }

    // Deep null/empty check
    const deepIssues = checkDeepNonNullOrEmpty(spot, label);
    if (deepIssues.length > 0) {
      fail(`Spot Deep Field Completeness: ${label}`, `Null or empty values found: ${deepIssues.join('; ')}`);
      spotSchemaPass = false;
    }
  });

  if (spotSchemaPass) {
    pass('Spots Complete Schema Validation', `All ${spotsData.length} spots conform strictly to schema with zero null/empty values`);
  }
}

// ----------------------------------------------------------------------------
// CHECK 4: Fish Species Schema & Tactical Field Validation
// ----------------------------------------------------------------------------
console.log('\n\x1b[1m\x1b[34m[CHECK 4] Fish Species Schema & Tactical Field Validation\x1b[0m');
const allowedWaterLayers = ['Dasar', 'Tengah', 'Permukaan'];

const fishIdSet = new Set();
let fishSchemaPass = true;

if (Array.isArray(fishData)) {
  fishData.forEach((fish, idx) => {
    const label = fish.id || `Fish Index [${idx}]`;

    // Duplicate ID check
    if (fishIdSet.has(fish.id)) {
      fail(`Unique Fish ID: ${label}`, `Duplicate fish ID detected: ${fish.id}`);
      fishSchemaPass = false;
    } else if (typeof fish.id === 'string' && fish.id.length > 0) {
      fishIdSet.add(fish.id);
    } else {
      fail(`Valid Fish ID: ${label}`, `Missing or invalid ID string`);
      fishSchemaPass = false;
    }

    // Required string fields
    const requiredFishStrings = [
      'name',
      'localName',
      'scientificName',
      'englishName',
      'feedingTime',
      'optimalTemp',
      'weatherPreference'
    ];
    for (const field of requiredFishStrings) {
      if (typeof fish[field] !== 'string' || fish[field].trim().length === 0) {
        fail(`Fish Field: ${label}.${field}`, `Expected non-empty string, got: ${typeof fish[field]}`);
        fishSchemaPass = false;
      }
    }

    // Water layer check
    if (!allowedWaterLayers.includes(fish.waterLayer)) {
      fail(`Fish Water Layer: ${label}`, `Invalid waterLayer '${fish.waterLayer}'. Must be one of: ${allowedWaterLayers.join(', ')}`);
      fishSchemaPass = false;
    }

    // Natural baits array
    if (!Array.isArray(fish.naturalBaits) || fish.naturalBaits.length === 0) {
      fail(`Fish Natural Baits: ${label}`, `naturalBaits must be a non-empty array of detailed tips`);
      fishSchemaPass = false;
    }

    // Artificial lures array
    if (!Array.isArray(fish.artificialLures) || fish.artificialLures.length === 0) {
      fail(`Fish Artificial Lures: ${label}`, `artificialLures must be a non-empty array of lure tactics`);
      fishSchemaPass = false;
    }

    // Tackle rigging object
    const tackleFields = ['line', 'leader', 'hook', 'technique'];
    if (typeof fish.tackleRigging === 'object' && fish.tackleRigging !== null) {
      for (const tf of tackleFields) {
        if (typeof fish.tackleRigging[tf] !== 'string' || fish.tackleRigging[tf].trim().length === 0) {
          fail(`Fish Tackle Rigging: ${label}.tackleRigging.${tf}`, `Missing or empty string`);
          fishSchemaPass = false;
        }
      }
    } else {
      fail(`Fish Tackle Rigging: ${label}`, `Missing or invalid tackleRigging object`);
      fishSchemaPass = false;
    }

    // Productive spot IDs
    if (!Array.isArray(fish.productiveSpotIds) || fish.productiveSpotIds.length === 0) {
      fail(`Fish Productive Spots: ${label}`, `productiveSpotIds must be a non-empty array of valid spot IDs`);
      fishSchemaPass = false;
    }

    // Deep null/empty check
    const deepIssues = checkDeepNonNullOrEmpty(fish, label);
    if (deepIssues.length > 0) {
      fail(`Fish Deep Field Completeness: ${label}`, `Null or empty values found: ${deepIssues.join('; ')}`);
      fishSchemaPass = false;
    }
  });

  if (fishSchemaPass) {
    pass('Fish Complete Schema Validation', `All ${fishData.length} species conform strictly to schema with zero null/empty values`);
  }
}

// ----------------------------------------------------------------------------
// CHECK 5: Bidirectional Referential Integrity
// ----------------------------------------------------------------------------
console.log('\n\x1b[1m\x1b[34m[CHECK 5] Bidirectional Referential Integrity\x1b[0m');
let referentialIntegrityPass = true;

// Direction A: Spots -> Fish
if (Array.isArray(spotsData) && Array.isArray(fishData)) {
  let spotFishRefPass = true;
  spotsData.forEach(spot => {
    spot.targetFish.forEach(fishId => {
      if (!fishIdSet.has(fishId)) {
        fail(`Spot -> Fish Reference: ${spot.id}`, `References unknown fish ID: '${fishId}'`);
        spotFishRefPass = false;
        referentialIntegrityPass = false;
      } else {
        // Symmetrical check: does the fish point back to this spot?
        const fishObj = fishData.find(f => f.id === fishId);
        if (!fishObj.productiveSpotIds.includes(spot.id)) {
          fail(`Reciprocal Link Missing: ${spot.id} <-> ${fishId}`, `Spot targets fish '${fishId}', but fish does not list spot in productiveSpotIds`);
          spotFishRefPass = false;
          referentialIntegrityPass = false;
        }
      }
    });
  });
  if (spotFishRefPass) {
    pass('Direction 1: Spots -> Fish Integrity', `100% of spot targetFish IDs exist and are reciprocal`);
  }

  // Direction B: Fish -> Spots
  let fishSpotRefPass = true;
  fishData.forEach(fish => {
    fish.productiveSpotIds.forEach(spotId => {
      if (!spotIdSet.has(spotId)) {
        fail(`Fish -> Spot Reference: ${fish.id}`, `References unknown spot ID: '${spotId}'`);
        fishSpotRefPass = false;
        referentialIntegrityPass = false;
      } else {
        // Symmetrical check: does the spot point back to this fish?
        const spotObj = spotsData.find(s => s.id === spotId);
        if (!spotObj.targetFish.includes(fish.id)) {
          fail(`Reciprocal Link Missing: ${fish.id} <-> ${spotId}`, `Fish lists spot '${spotId}', but spot does not list fish in targetFish`);
          fishSpotRefPass = false;
          referentialIntegrityPass = false;
        }
      }
    });
  });
  if (fishSpotRefPass) {
    pass('Direction 2: Fish -> Spots Integrity', `100% of fish productiveSpotIds exist and are reciprocal`);
  }

  if (referentialIntegrityPass) {
    pass('Bidirectional Referential Symmetry', `Perfect 100% two-way referential integrity achieved between all spots and species`);
  }
}

// ----------------------------------------------------------------------------
// CHECK 6: Summary and Exit Code
// ----------------------------------------------------------------------------
console.log('\n\x1b[1m\x1b[36m========================================================================\x1b[0m');
console.log('\x1b[1m\x1b[36m                       VERIFICATION TEST SUMMARY                        \x1b[0m');
console.log('\x1b[1m\x1b[36m========================================================================\x1b[0m');
console.log(`Total Checks Executed : ${totalChecks}`);
console.log(`Passed Checks         : \x1b[32m${passedChecks}\x1b[0m`);
console.log(`Failed Checks         : \x1b[31m${failedChecks}\x1b[0m`);

if (failedChecks > 0) {
  console.log('\n\x1b[1m\x1b[31m[VERIFICATION FAILED]\x1b[0m The following issues must be resolved:');
  failures.forEach((f, idx) => {
    console.log(`  ${idx + 1}. [${f.checkName}] -> ${f.reason}`);
  });
  console.log('\x1b[1m\x1b[31mExiting with code 1.\x1b[0m\n');
  process.exit(1);
} else {
  console.log('\n\x1b[1m\x1b[32m[VERIFICATION PASSED]\x1b[0m All data engineering schemas, counts, bounds, and relations verified successfully!');
  console.log('\x1b[1m\x1b[32mExiting with code 0.\x1b[0m\n');
  process.exit(0);
}
