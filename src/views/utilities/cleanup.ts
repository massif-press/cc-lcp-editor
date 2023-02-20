import { frames } from 'lancer-data';

const getLicenseID = (licenseString: string, localFrames: any[]) => {
  let frame = localFrames.find(
    (x: any) => x.name.toLowerCase() === licenseString.toLowerCase()
  );
  if (localFrames && localFrames.length) {
    frame = localFrames.find(
      (x: any) => x.name.toLowerCase() === licenseString.toLowerCase()
    );
  }
  if (!frame) {
    frame = frames.find(
      (x: any) => x.name.toLowerCase() === licenseString.toLowerCase()
    );
  }
  if (frame) return frame.id;
  return '';
};

const exportPrep = (input: any[]): string => {
  if (!Array.isArray(input)) return JSON.stringify(input);
  const process = [...input];
  _recIterate(process);

  return JSON.stringify(process, null, 2);
};

function _recIterate(a: any) {
  if (Array.isArray(a)) {
    a.forEach((x) => _recIterate(x));
  } else _exportPrepInternal(a);
}

const removableProps = [
  'effect',
  'skirmish',
  'barrage',
  'cost',
  'on_attack',
  'on_hit',
  'on_crit',
  'damage',
  'range',
  'actions',
  'bonuses',
  'synergies',
  'deployables',
  'counters',
  'integrated',
  'special_equipment',
  'talent_item',
  'frame_id',
  'ammo',
  'no_mods',
  'no_bonuses',
  'no_synergies',
  'brew',
  'tags',
  'allowed_types',
  'restricted_types',
  'added_tags',
  'hp_bonus',
  'edef_bonus',
  'evasion_bonus',
  'no_attack',
  'no_bonus',
  'no_core_bonus',
  'no_synergy',
];

function _exportPrepInternal(e: any) {
  // remove empty unnecessary props
  removableProps.forEach((prop) => {
    if (!e.hasOwnProperty(prop)) return;
    if (!e[prop] || (Array.isArray(e[prop]) && e[prop].length === 0))
      delete e[prop];
  });

  for (const prop in e) {
    if (Array.isArray(e[prop])) {
      _recIterate(e[prop]);
    }
    // remove paragraph formatting
    else if (typeof e[prop] === 'string') {
      e[prop] = e[prop].replaceAll('<p', '<div');
      e[prop] = e[prop].replaceAll('</p', '</div');
    }
  }
}

export { getLicenseID, exportPrep };
