const activationTypes = [
  { value: 'Move', title: 'Move' },
  { value: 'Free', title: 'Free Action' },
  { value: 'Protocol', title: 'Protocol' },
  { value: 'Quick', title: 'Quick Action' },
  { value: 'Full', title: 'Full Action' },
  { value: 'Invade', title: 'Invasion Option' },
  { value: 'Full Tech', title: 'Full Tech Action' },
  { value: 'Quick Tech', title: 'Quick Tech Action' },
  { value: 'Reaction', title: 'Reaction' },
  { value: 'Other', title: 'Other / Unsorted Action' },
  { value: 'Downtime', title: 'Downtime Action' },
];

const synergyLocations = [
  {
    value: 'active_effects',
    title: 'The Active Effects panel',
  },
  {
    value: 'rest',
    title: 'A panel near the top of the Rest view',
  },
  {
    value: 'weapon',
    title:
      'The body of the equipped weapon item panel, in the Skirmish / Barrage action modals',
  },
  {
    value: 'system',
    title:
      'The body of the equipped system item panel, in the Activation Action modals',
  },
  {
    value: 'deployable',
    title: 'Deployment action for deployable, deployable panel body',
  },
  { value: 'drone', title: 'Deployment action for drone, drone panel body' },
  {
    value: 'move',
    title: 'Next to the move pip bar, within the Move menu/Action tab',
  },
  {
    value: 'boost',
    title: 'Next to the Boost button, within the Boost Action modal',
  },
  {
    value: 'structure',
    title: 'Next to the structure pip tracker in the Combat view',
  },
  {
    value: 'armor',
    title: 'Next to the armor pip tracker in the Combat view',
  },
  {
    value: 'hp',
    title: 'Next to the HP pip tracker in the Combat view',
  },
  {
    value: 'overshield',
    title: 'Next to the overshield pip tracker in the Combat view',
  },
  {
    value: 'stress',
    title: 'Next to the reactor stress pip tracker in the Combat view',
  },
  {
    value: 'heat',
    title: 'Next to the heat pip tracker in the Combat view',
  },
  {
    value: 'repair',
    title: 'Next to the repair capacity pip tracker in the Combat view',
  },
  {
    value: 'core_power',
    title: 'Next to the CORE power pip tracker in the Combat view',
  },
  {
    value: 'overcharge',
    title: 'Next to the overcharge pip tracker in the Combat view',
  },
  { value: 'dismount', title: 'Dismount Action modal' },
  { value: 'quick_activation', title: 'Quick System Action modal' },
  { value: 'full_activation', title: 'Full System Action modal' },
  { value: 'stabilize', title: 'Stabilize Action modal' },
  { value: 'barrage', title: 'Barrage Action modal' },
  { value: 'reload', title: 'Reload Action modal' },
  { value: 'shut_down', title: 'Shut Down Action modal' },
  { value: 'prepare', title: 'Prepare Action modal' },
  { value: 'eject', title: 'Eject Action modal' },
  { value: 'hide', title: 'Hide Action modal' },
  { value: 'bolster', title: 'Bolster Action modal' },
  { value: 'ram', title: 'Ram Action modal' },
  { value: 'grapple', title: 'Grapple Action modal' },
  { value: 'brace', title: 'Brace Action modal' },
  { value: 'tech_attack', title: 'Tech Attack Action modal' },
  { value: 'quick_tech', title: 'Quick Tech Action modal' },
  { value: 'overcharge', title: 'Overcharge Action modal' },
  { value: 'skill_check', title: 'Skill Check Action modal' },
  { value: 'overwatch', title: 'Overwatch Action modal' },
  { value: 'improvised_attack', title: 'Improvised Attack Action modal' },
  { value: 'disengage', title: 'Disengage Action modal' },
  { value: 'dismount', title: 'Dismount Action modal' },
  { value: 'stabilize', title: 'Stabilize Action modal' },
  { value: 'tech', title: 'Quick and Full Tech Attack modals' },
  { value: 'lock_on', title: 'Lock On Action modal' },
  { value: 'scan', title: 'Scan Action modal' },
  { value: 'hull', title: 'mouseover tooltip for HULL stat' },
  { value: 'agility', title: 'mouseover tooltip for AGILITY stat' },
  { value: 'systems', title: 'mouseover tooltip for SYSTEMS stat' },
  { value: 'engineering', title: 'mouseover tooltip for ENGINEERING stat' },
  { value: 'pilot_weapon', title: 'Pilot Weapon panel and action modal' },
  { value: 'cascade', title: 'Cascade warning panel' },
];

const npcSynergyLocations = [
  {
    value: 'todo',
    title: 'todo',
  },
];

const bonuses = [
  {
    value: 'skill_point',
    title: 'Add Pilot Skill Trigger point',
    type: 'integer',
  },
  {
    value: 'mech_skill_point',
    title: 'Add Mech Skill(HASE) point',
    type: 'integer',
  },
  { value: 'talent_point', title: 'Add Pilot Talent point', type: 'integer' },
  { value: 'license_point', title: 'Add Pilot License point', type: 'integer' },
  { value: 'cb_point', title: 'Add Pilot CORE Bonus point', type: 'integer' },
  {
    value: 'range',
    title: 'Add Range (including Threat) to weapons',
    type: 'integer',
  },
  { value: 'damage', title: 'Add Damage to weapons', type: 'integer' },
  { value: 'hp', title: 'Add Mech HP', type: 'integer' },
  { value: 'armor', title: 'Add Mech Armor', type: 'integer' },
  { value: 'structure', title: 'Add Mech Structure', type: 'integer' },
  { value: 'stress', title: 'Add Mech Reactor Stress', type: 'integer' },
  { value: 'heatcap', title: 'Add Mech Heat Capacity', type: 'integer' },
  { value: 'repcap', title: 'Add Mech Repair Capacity', type: 'integer' },
  { value: 'speed', title: 'Add Mech Speed', type: 'integer' },
  { value: 'evasion', title: 'Add Mech Evasion', type: 'integer' },
  { value: 'edef', title: 'Add Mech E - Defense', type: 'integer' },
  { value: 'sensor', title: 'Add Mech Sensor Range', type: 'integer' },
  { value: 'attack', title: 'Add Mech Attack Bonus', type: 'integer' },
  { value: 'tech_attack', title: 'Add Mech Tech Attack', type: 'integer' },
  { value: 'grapple', title: 'Add Mech Grapple Value', type: 'integer' },
  { value: 'ram', title: 'Add Mech Ram Value', type: 'integer' },
  { value: 'save', title: 'Add Mech Save', type: 'integer' },
  { value: 'sp', title: 'Add Mech SP', type: 'integer' },
  { value: 'size', title: 'Add Mech Size', type: 'integer' },
  { value: 'ai_cap', title: 'Add AI Capacity', type: 'integer' },
  {
    value: 'cheap_struct',
    title: 'Half cost for Structure repairs',
    type: 'boolean',
  },
  {
    value: 'cheap_stress',
    title: 'Half cost for Reactor Stress repairs',
    type: 'boolean',
  },
  { value: 'overcharge', title: 'Overcharge Track', type: 'string' },
  {
    value: 'limited_bonus',
    title: 'Add Limited equipment uses',
    type: 'integer',
  },
  { value: 'pilot_hp', title: 'Add Pilot HP', type: 'integer' },
  { value: 'pilot_armor', title: 'Add Pilot Armor', type: 'integer' },
  { value: 'pilot_evasion', title: 'Add Pilot Evasion', type: 'integer' },
  { value: 'pilot_edef', title: 'Add Pilot E - Defense', type: 'integer' },
  { value: 'pilot_speed', title: 'Add Pilot Speed', type: 'integer' },
  {
    value: 'deployable_hp',
    title: 'Add HP to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_size',
    title: 'Add size to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_charges',
    title: 'Add charges to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_armor',
    title: 'Add armor to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_evasion',
    title: 'Add evasion to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_edef',
    title: 'Add edef to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_heatcap',
    title: 'Add heatcap to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_repcap',
    title: 'Add repcap to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_sensor_range',
    title: 'Add sensor range to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_tech_attack',
    title: 'Add tech attack to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_save',
    title: 'Add save to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_speed',
    title: 'Add speed to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'drone_hp',
    title: 'Add HP to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_size',
    title: 'Add size to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_charges',
    title: 'Add charges to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_armor',
    title: 'Add armor to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_evasion',
    title: 'Add evasion to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_edef',
    title: 'Add edef to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_heatcap',
    title: 'Add heatcap to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_repcap',
    title: 'Add repcap to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_sensor_range',
    title: 'Add sensor range to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_tech_attack',
    title: 'Add tech attack to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_save',
    title: 'Add save to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_speed',
    title: 'Add speed to all deployed Drones',
    type: 'integer',
  },
];

const npcBonuses = [
  { value: 'activation', title: 'Add Activation per round', type: 'integer' },
  {
    value: 'bonus_activation',
    title: 'Add Activation per round per X opponents',
    type: 'integer',
  },
  { value: 'hull', title: 'Add HULL Point', type: 'integer' },
  { value: 'agi', title: 'Add AGI Point', type: 'integer' },
  { value: 'sys', title: 'Add SYS Point', type: 'integer' },
  { value: 'eng', title: 'Add ENG Point', type: 'integer' },
  { value: 'hp', title: 'Add HP', type: 'integer' },
  { value: 'armor', title: 'Add Armor', type: 'integer' },
  { value: 'structure', title: 'Add Structure', type: 'integer' },
  { value: 'stress', title: 'Add Reactor Stress', type: 'integer' },
  { value: 'heatcap', title: 'Add Heat Capacity', type: 'integer' },
  { value: 'repcap', title: 'Add Repair Capacity', type: 'integer' },
  { value: 'speed', title: 'Add Speed', type: 'integer' },
  { value: 'evasion', title: 'Add Evasion', type: 'integer' },
  { value: 'edef', title: 'Add E - Defense', type: 'integer' },
  { value: 'sensor', title: 'Add Sensor Range', type: 'integer' },
  { value: 'attack', title: 'Add Attack Bonus', type: 'integer' },
  { value: 'tech_attack', title: 'Add Tech Attack', type: 'integer' },
  { value: 'grapple', title: 'Add Grapple Value', type: 'integer' },
  { value: 'ram', title: 'Add Ram Value', type: 'integer' },
  { value: 'save', title: 'Add Save', type: 'integer' },
  { value: 'sp', title: 'Add SP', type: 'integer' },
  { value: 'size', title: 'Add Size', type: 'integer' },
  {
    value: 'deployable_hp',
    title: 'Add HP to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_size',
    title: 'Add size to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_charges',
    title: 'Add charges to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_armor',
    title: 'Add armor to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_evasion',
    title: 'Add evasion to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_edef',
    title: 'Add edef to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_heatcap',
    title: 'Add heatcap to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_repcap',
    title: 'Add repcap to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_sensor_range',
    title: 'Add sensor range to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_tech_attack',
    title: 'Add tech attack to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_save',
    title: 'Add save to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'deployable_speed',
    title: 'Add speed to all deployed Deployables',
    type: 'integer',
  },
  {
    value: 'drone_hp',
    title: 'Add HP to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_size',
    title: 'Add size to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_charges',
    title: 'Add charges to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_armor',
    title: 'Add armor to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_evasion',
    title: 'Add evasion to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_edef',
    title: 'Add edef to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_heatcap',
    title: 'Add heatcap to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_repcap',
    title: 'Add repcap to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_sensor_range',
    title: 'Add sensor range to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_tech_attack',
    title: 'Add tech attack to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_save',
    title: 'Add save to all deployed Drones',
    type: 'integer',
  },
  {
    value: 'drone_speed',
    title: 'Add speed to all deployed Drones',
    type: 'integer',
  },
];

const systemType = [
  'AI',
  'Deployable',
  'Drone',
  'Flight System',
  'Shield',
  'System',
  'Tech',
];

const mountType = [
  'Main',
  'Main/Aux',
  'Aux/Aux',
  'Heavy',
  'Flex',
  'Integrated',
];

const weaponType = ['Rifle', 'Cannon', 'Launcher', 'CQB', 'Nexus', 'Melee'];

const weaponSize = ['Auxiliary', 'Main', 'Heavy', 'Superheavy'];

const rangeType = [
  'Range',
  'Threat',
  'Thrown',
  'Line',
  'Cone',
  'Blast',
  'Burst',
];

const damageType = [
  'Kinetic',
  'Energy',
  'Explosive',
  'Heat',
  'Burn',
  'Variable',
];

const mechType = [
  'Balanced',
  'Artillery',
  'Striker',
  'Controller',
  'Support',
  'Defender',
];

const npcRole = [
  'Striker',
  'Artillery',
  'Controller',
  'Support',
  'Tank',
  'Defender',
  'Special',
];

export {
  activationTypes,
  synergyLocations,
  npcSynergyLocations,
  bonuses,
  npcBonuses,
  systemType,
  mountType,
  weaponType,
  weaponSize,
  rangeType,
  damageType,
  mechType,
  npcRole,
};
