module.exports.SpawnNames = {
    MAINSPAWN : 'Spawn1'
};

module.exports.Ticks = {
    CREEPMAXTICKSTOLIVE : 1000,
    CREEPMINTICKSTOLIVE : 150
};

module.exports.RoleNames = {
    HARVESTER : 'harvester',
    UPGRADER : 'upgrader',
    BUILDER: 'builder',
    GUARD: 'guard'
};

module.exports.CreepTasks = {
    HARVEST : 'harvest',
    TRANSFER : 'transfer',
    BUILD : 'build',
    UPGRADE: 'upgrade',
    REPAIR: 'repair',
    HIDE: 'hide',
    ATTACK: 'attack',
    RENEW: 'renew',
};

module.exports.MaxCreeps = {
    HARVESTER : 4,
    UPGRADER : 4,
    BUILDER: 4,
    GUARD: 0
};

module.exports.RoomNames = {
    MAINROOM : 'E49N54',
};

module.exports.RepairValues = {
    MINWALLHITS : 300000,
    MINRAMPARTHITS : 200000,
    MAXREPAIRHITS : 300000
};

module.exports.RoomPositions = {
    GUARDPOST1 : new RoomPosition(30,29, module.exports.RoomNames.MAINROOM),
    SOURCE0WAITSPOT : new RoomPosition(32,34, module.exports.RoomNames.MAINROOM),
    SOURCE0HARVESTSPOT: new RoomPosition(34,35, module.exports.RoomNames.MAINROOM),
    RENEWCREEPSPOT: new RoomPosition(19,33, module.exports.RoomNames.MAINROOM)
};

module.exports.RoleHarvestSource = {
    HARVESTER : 1,
    BUILDER : 1,
    UPGRADER: 0
};

