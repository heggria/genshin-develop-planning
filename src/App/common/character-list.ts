import { Character } from './interface';
import { AttrCode } from './type-code';

export const characterList = new Map<string | undefined, Character>([
  [
    'HuTao',
    {
      name: '胡桃',
      weaponType: 'polearm',
      elementType: 'fire',
      baseAttr: new Map<AttrCode, number>([
        ['blood_base', 15552],
        ['atk_base', 106.4],
        ['def_base', 876],
        ['recharge_percent', 100],
        ['crit_rate', 5],
        ['crit_damage', 38.4 + 50],
      ]),
      level: 90,
      star: 5,
    },
  ],
  [
    'RaidenShogun',
    {
      name: '雷电将军',
      weaponType: 'polearm',
      elementType: 'thunder',
      baseAttr: new Map<AttrCode, number>([
        ['blood_base', 12907],
        ['atk_base', 337],
        ['def_base', 789],
        ['recharge_percent', 100 + 32],
        ['crit_rate', 5],
        ['crit_damage', 50],
      ]),
      level: 90,
      star: 5,
    },
  ],
  [
    'Ganyu',
    {
      name: '甘雨',
      weaponType: 'bow',
      elementType: 'ice',
      baseAttr: new Map<AttrCode, number>([
        ['blood_base', 9797],
        ['atk_base', 335],
        ['def_base', 630],
        ['recharge_percent', 100],
        ['crit_rate', 5],
        ['crit_damage', 38.4 + 50],
      ]),
      level: 90,
      star: 5,
    },
  ],
  [
    'KamisatoAyaka',
    {
      name: '神里绫华',
      weaponType: 'sword',
      elementType: 'ice',
      baseAttr: new Map<AttrCode, number>([
        ['blood_base', 12858],
        ['atk_base', 342],
        ['def_base', 784],
        ['recharge_percent', 100],
        ['crit_rate', 5],
        ['crit_damage', 38.4 + 50],
      ]),
      level: 90,
      star: 5,
    },
  ],
  [
    'Xiao',
    {
      name: '魈',
      weaponType: 'polearm',
      elementType: 'wind',
      baseAttr: new Map<AttrCode, number>([
        ['blood_base', 12736],
        ['atk_base', 349],
        ['def_base', 799],
        ['recharge_percent', 100],
        ['crit_rate', 5 + 19.2],
        ['crit_damage', 50],
      ]),
      level: 90,
      star: 5,
    },
  ],
]);
