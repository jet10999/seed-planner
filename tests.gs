// tests.gs
// Sample test functions for CRUD operations using UUID

function testAddSeed() {
  var data = {
    'Flower': 'Test Flower',
    'Bloom Season': 'Spring',
    'Days': '30',
    'Min Sun Req': '6',
    'Sun/Shade': 'Sun',
    'Height': '12',
    'Wide': '8',
    'P/A': 'A',
    'Sow Depth': '0.5',
    'sprout_days_start': '7',
    'sprout_days_end': '14',
    'num_seeds': '10',
    'seed_spacing_min': '2',
    'seed_spacing_max': '4',
    'ideal_temp_min': '60',
    'ideal_temp_max': '75',
    'Direct Sow': 'Yes',
    'Transplant': 'No',
    'Seed Starting Date': '2026-02-01',
    'Colors': 'Red',
    'Frost Hardy': 'No',
    'Edible': 'No',
    'Notes': 'Test entry.'
    // 'uuid' will be auto-generated
  };
  addSeed(data);
  Logger.log('Added seed: ' + JSON.stringify(data));
}

function testReadAllSeeds2() {
  var seeds = readAllSeeds();
  Logger.log('All seeds: ' + JSON.stringify(seeds));
}

function testUpdateSeedByUUID() {
  var seeds = readAllSeeds();
  if (seeds.length === 0) {
    Logger.log('No seeds to update.');
    return;
  }
  var uuid = seeds[0]['uuid'];
  var update = {
    'Notes': 'Updated via test script.'
  };
  updateSeedByUUID(uuid, update);
  Logger.log('Updated seed with uuid: ' + uuid);
}

function testDeleteSeedByUUID() {
  var seeds = readAllSeeds();
  if (seeds.length === 0) {
    Logger.log('No seeds to delete.');
    return;
  }
  var uuid = seeds[0]['uuid'];
  deleteSeedByUUID(uuid);
  Logger.log('Deleted seed with uuid: ' + uuid);
}

function testAddUUIDsToRows() {
  var updated = addUUIDsToRows();
  Logger.log('UUIDs added to missing rows: ' + updated);
}
