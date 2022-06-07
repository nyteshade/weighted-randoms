"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponsArmorTable = exports.WandsStavesRodsTable = exports.SwordsTable = exports.ScrollsTable = exports.RingsTable = exports.PotionsTable = exports.MiscellaneousMagicTable = exports.MagicItemsTable = void 0;

var _random = require("./random");

var SwordsTable = new _random.Random('Sword +1', 'Sword +1, +2 against Lycanthropes', 'Sword +1, +2 against Spell Users', 'Sword +1, +3 against Undead', 'Sword +1, +3 against Dragons', 'Sword +2', 'Sword -1, cursed');
exports.SwordsTable = SwordsTable;
var WeaponsArmorTable = new _random.Random('Arrows +1 (10 arrows)', 'Axe +1', 'Dagger +1', 'Mace +1', 'Armor +1', 'Shield +1', 'Armor & Shield (each +1)', 'Armor, cursed as AC 9 (looks like Armor +1)');
exports.WeaponsArmorTable = WeaponsArmorTable;
var PotionsTable = new _random.Random('Diminution', 'ESP', 'Gaseous Form', 'Growth', 'Healing', 'Invisibility', 'Levitation', 'Poison');
exports.PotionsTable = PotionsTable;
var ScrollsTable = new _random.Random(function () {
  return _random.Random.from({
    value: 'Spell scroll: 1 magic-user/elf spell (any)',
    weight: 75
  }, {
    value: 'Spell scroll: 1 cleric spell (any)',
    weight: 25
  });
}, function () {
  return _random.Random.from({
    value: 'Spell scroll: 2 magic-user/elf spells (any)',
    weight: 75
  }, {
    value: 'Spell scroll: 2 cleric spells (any)',
    weight: 25
  });
}, function () {
  return _random.Random.from({
    value: 'Spell scroll: 3 magic-user/elf spells (any)',
    weight: 75
  }, {
    value: 'Spell scroll: 3 cleric spells (any)',
    weight: 25
  });
}, 'Cursed scroll (affects reader immediately)', 'Protection from Lycanthropes', 'Protection from Undead', 'Treasure Map: location of 1,000 - 4,000 gp value', 'Treasure Map: location of 1 hidden magic item');
exports.ScrollsTable = ScrollsTable;
var RingsTable = new _random.Random('Animal Control', 'Fire Resistance', 'Invisibility', 'Protection +1', 'Water Walking', 'Weakness');
exports.RingsTable = RingsTable;
var WandsStavesRodsTable = new _random.Random('Wand of Enemy Detection', 'Wand of Magic Detection', 'Wand of Paralyzation', 'Staff of Healing', 'Snake Staff', 'Rod of Cancellation');
exports.WandsStavesRodsTable = WandsStavesRodsTable;
var MiscellaneousMagicTable = new _random.Random('Bag of Devouring', 'Bag of Holding', 'Broom of Flying', 'Crystal Ball', 'Elven Cloak & Boots', 'Gauntlets of Ogre Power', 'Helm of Alignment Changing', 'Helm of Telepathy', 'Medallion of ESP', 'Rope of Climbing');
exports.MiscellaneousMagicTable = MiscellaneousMagicTable;
var MagicItemsTable = new _random.Random({
  value: 'Sword',
  weight: 20,
  next: SwordsTable
}, {
  value: 'Weapon/Armor',
  weight: 20,
  next: WeaponsArmorTable
}, {
  value: 'Potion',
  weight: 25,
  next: PotionsTable,
  postProcess: function postProcess(item) {
    return "Potion of ".concat(item);
  }
}, {
  value: 'Scroll',
  weight: 20,
  next: ScrollsTable
}, {
  value: 'Ring',
  weight: 5,
  next: RingsTable,
  postProcess: function postProcess(item) {
    return "Ring of ".concat(item);
  }
}, {
  value: 'Wand/Staff/Rod',
  weight: 5,
  next: WandsStavesRodsTable
}, {
  value: 'Miscellaneous Magic',
  weight: 5,
  next: MiscellaneousMagicTable
});
exports.MagicItemsTable = MagicItemsTable;