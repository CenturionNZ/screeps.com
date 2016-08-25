module.exports.SpawnNames = {
    MAINSPAWN : 'Spawn1',
    SECONDSPAWN : 'Spawn2'
};


module.exports.ObjectIds = {
    SENDINGLINK : '57b44a96eead0db92ed6d3aa',
    RECEIVINGLINK : '57b444508f645b7a4a9f4dd9',
    STORAGE: '57b41827a8d0e1d76bf79507'
};


module.exports.Ticks = {
    CREEPMAXTICKSTOLIVE : 1000,
    CREEPMINTICKSTOLIVE : 150
};

module.exports.RoleNames = {
    HARVESTER : 'harvester',
    UPGRADER : 'upgrader',
    BUILDER: 'builder',
    ATTACKER: 'attacker',
    TRANSFERER: 'transferer',
    HARVESTER2 : 'harvester2',
    HARVESTER3 : 'harvester3',
    LINKTRANSFERER: 'linkTransferer',
    CLAIMER: 'claimer'
};

module.exports.CreepTasks = {
    HARVEST : 'harvest',
    TRANSFER : 'transfer',
    BUILD : 'build',
    UPGRADE: 'upgrade',
    REPAIR: 'repair',
    GUARD: 'guard',
    ATTACKROOM: 'attackroom',
    RENEW: 'renew',
    WITHDRAW : 'withdraw',
    CLAIM : 'claim',
    RESERVE : 'reserve',
    CHECKROOM : 'checkroom'
};

module.exports.MaxCreeps = {
    E49N54 : {
        HARVESTER : 4,
        UPGRADER : 3,
        BUILDER: 7,
        GUARD: 0,
        HARVESTER3 : 2,
        TRANSFERER : 4,
        CLAIMER : 0,
        LINKTRANSFERER: 1,
        ATTACKER: 0
    },
    E48N54 : {
        HARVESTER : 4,
        UPGRADER : 3,
        BUILDER: 7,
        GUARD: 0,
        HARVESTER3 : 2,
        TRANSFERER : 4,
        CLAIMER : 0,
        LINKTRANSFERER: 1,
        ATTACKER: 0
    }
};

module.exports.RoomNames = {
    MAINROOM : 'E49N54',
    ATTACKROOM : 'E47N54',
    SECONDROOM : 'E48N54'
};


module.exports.RepairValues = {
    E49N54 : {
        MINWALLHITS : 1500000,
        MINRAMPARTHITS : 1000000,
        MAXREPAIRHITS : 1500000
    },
    E48N54 : {
        MINWALLHITS : 200000,
        MINRAMPARTHITS : 150000,
        MAXREPAIRHITS : 200000
    }
};

module.exports.RoomPositions = {
    GUARDPOST1 : new RoomPosition(6,24, module.exports.RoomNames.SECONDROOM),
    SOURCE0WAITSPOT : new RoomPosition(32,34, module.exports.RoomNames.MAINROOM),
    SOURCE0HARVESTSPOT: new RoomPosition(34,35, module.exports.RoomNames.MAINROOM),
    RENEWCREEPSPOT: new RoomPosition(20,33, module.exports.RoomNames.MAINROOM),
    RENEWCREEPSPOT2: new RoomPosition(22,34, module.exports.RoomNames.SECONDROOM),
    LINKTRANSFERERSPOT: new RoomPosition(20,37, module.exports.RoomNames.MAINROOM),
    ATTACKROOMSPOT: new RoomPosition(36,33, module.exports.RoomNames.ATTACKROOM),
    CHECKROOMSPOT: new RoomPosition(47,36, module.exports.RoomNames.ATTACKROOM)
};

module.exports.RoleHarvestSource = {
    HARVESTER : 1,
    BUILDER : 1,
    UPGRADER: 0
};

module.exports.RoleContainerSource = {
    TRANSFERER : 0,
    BUILDER : 0,
    UPGRADER: 0
};


