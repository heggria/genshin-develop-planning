import { Weapon } from './interface';
import { AttrCode } from './type-code';

export const weaponList = new Map<string | undefined, Weapon>([
  [
    'SkywardHarp',
    {
      name: '天空之翼',
      type: 'bow',
      baseAttr: new Map<AttrCode, number>([
        ['atk_base', 674],
        ['crit_rate', 22.1],
      ]),
      level: 90,
      star: 5,
    },
  ],
  [
    'AmosBow',
    {
      name: '阿莫斯之弓',
      type: 'bow',
      baseAttr: new Map<AttrCode, number>([
        ['atk_base', 608],
        ['atk_percent', 49.6],
      ]),
      level: 90,
      star: 5,
    },
  ],
  [
    'ElegyForTheEnd',
    {
      name: '终末嗟叹之诗',
      type: 'bow',
      baseAttr: new Map<AttrCode, number>([
        ['atk_base', 608],
        ['recharge_percent', 55.1],
      ]),
      level: 90,
      star: 5,
    },
  ],
  [
    'PolarStar',
    {
      name: '冬极白星',
      type: 'bow',
      baseAttr: new Map<AttrCode, number>([
        ['atk_base', 608],
        ['crit_rate', 33.1],
      ]),
      level: 90,
      star: 5,
    },
  ],
  [
    'ThunderingPulse',
    {
      name: '飞雷之弦振',
      type: 'bow',
      baseAttr: new Map<AttrCode, number>([
        ['atk_base', 608],
        ['crit_damage', 66.2],
      ]),
      level: 90,
      star: 5,
    },
  ],
  [
    'MistsplitterReforged',
    {
      name: '雾切之回光',
      type: 'sword',
      baseAttr: new Map<AttrCode, number>([
        ['atk_base', 674],
        ['crit_damage', 44.1],
      ]),
      level: 90,
      star: 5,
    },
  ],
  [
    'AquilaFavonia',
    {
      name: '风鹰剑',
      type: 'sword',
      baseAttr: new Map<AttrCode, number>([
        ['atk_base', 674],
        ['physics_damage', 41.3],
      ]),
      level: 90,
      star: 5,
    },
  ],
  [
    'SummitShaper',
    {
      name: '斫峰之刃',
      type: 'sword',
      baseAttr: new Map<AttrCode, number>([
        ['atk_base', 608],
        ['atk_percent', 49.6],
      ]),
      level: 90,
      star: 5,
    },
  ],
  [
    'FreedomSworn',
    {
      name: '苍古自由之誓',
      type: 'sword',
      baseAttr: new Map<AttrCode, number>([
        ['atk_base', 608],
        ['proficient_plus', 198],
      ]),
      level: 90,
      star: 5,
    },
  ],
  [
    'PrimordialJadeCutter',
    {
      name: '磐岩结绿',
      type: 'sword',
      baseAttr: new Map<AttrCode, number>([
        ['atk_base', 542],
        ['crit_rate', 44.1],
      ]),
      level: 90,
      star: 5,
    },
  ],
  [
    'SkywardBlade',
    {
      name: '天空之刃',
      type: 'sword',
      baseAttr: new Map<AttrCode, number>([
        ['atk_base', 608],
        ['recharge_percent', 55.1],
      ]),
      level: 90,
      star: 5,
    },
  ],
  [
    'EngulfingLightning',
    {
      name: '薙草之稻光',
      type: 'polearm',
      baseAttr: new Map<AttrCode, number>([
        ['atk_base', 608],
        ['recharge_percent', 55.1],
      ]),
      level: 90,
      star: 5,
    },
  ],
  [
    'SkywardSpine',
    {
      name: '天空之脊',
      type: 'polearm',
      baseAttr: new Map<AttrCode, number>([
        ['atk_base', 674],
        ['recharge_percent', 36.8],
      ]),
      level: 90,
      star: 5,
    },
  ],
  [
    'PrimordialJadeWingedSpear',
    {
      name: '和璞鸢',
      type: 'polearm',
      baseAttr: new Map<AttrCode, number>([
        ['atk_base', 674],
        ['crit_rate', 22.1],
      ]),
      level: 90,
      star: 5,
    },
  ],
  [
    'StaffOfHoma',
    {
      name: '护摩之杖',
      type: 'polearm',
      baseAttr: new Map<AttrCode, number>([
        ['atk_base', 608],
        ['crit_damage', 66.2],
      ]),
      level: 90,
      star: 5,
    },
  ],
  [
    'VortexVanquisher',
    {
      name: '贯虹之槊',
      type: 'polearm',
      baseAttr: new Map<AttrCode, number>([
        ['atk_base', 608],
        ['atk_percent', 49.6],
      ]),
      level: 90,
      star: 5,
    },
  ],
]);
