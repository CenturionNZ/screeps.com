module.exports.SpawnNames = {
    MAINSPAWN : 'Spawn1',
    SECONDSPAWN : 'Spawn2'
};

module.exports.CreepBodys = {
    E49N54 : {
        Default: [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE],
        harvester : [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE],
        harvester3 : [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
        claimer : [CLAIM,MOVE,MOVE,MOVE],
        linktransferer : [CARRY,CARRY,MOVE]
    },
    E48N54 : {
        Default: [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE],
        harvester : [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE],
        harvester3 : [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
        claimer : [CLAIM,MOVE,MOVE,MOVE],
        linktransferer : [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]
    }
}

module.exports.HarvestSourceId = {
    E49N54 : {
        Default: '579fa9eb0700be0674d301f6',
        Aria : '579fa9eb0700be0674d301f5',
        Sebastian: '579fa9eb0700be0674d301f6'
    },
    E48N54 : {
        Default: '579fa9e80700be0674d301b5',
        Thomas: '579fa9e80700be0674d301b3',
        Alaina: '579fa9e80700be0674d301b5',
        Liam: '579fa9e80700be0674d301b1',
        Blake: '579fa9e80700be0674d301b1',
        Madison: '579fa9e80700be0674d301b1',
        harvester: '579fa9e80700be0674d301b3'
    }
};

module.exports.WithdrawSourceId = {
    E49N54 : {
        Default: '57b41827a8d0e1d76bf79507',
        upgrader : '57b41827a8d0e1d76bf79507',
        builder: '57b41827a8d0e1d76bf79507',
        transferer : '57b41827a8d0e1d76bf79507',
        linkTransferer: '57b444508f645b7a4a9f4dd9'
    },
    E48N54 : {
        Default: '57beeeba0591e31e250c3cdd',
        builder: '57beeeba0591e31e250c3cdd',
        transferer: '57beeeba0591e31e250c3cdd',
        upgrader : '57beeeba0591e31e250c3cdd',
        linkTransferer: '57be96607e20fc6878fea62d'
    }
};

module.exports.TransferSourceId = {
    E49N54 : {
        Default: '57b41827a8d0e1d76bf79507',
        linkTransferer: '57b41827a8d0e1d76bf79507'
    },
    E48N54 : {
        Default: '57beeeba0591e31e250c3cdd',
        linkTransferer: '57beeeba0591e31e250c3cdd',
    }
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
        HARVESTER : 0,
        UPGRADER : 3,
        BUILDER: 2,
        GUARD: 0,
        HARVESTER3 : 2,
        TRANSFERER : 4,
        CLAIMER : 2,
        LINKTRANSFERER: 1,
        ATTACKER: 0
    },
    E48N54 : {
        HARVESTER : 0,
        UPGRADER : 1,
        BUILDER: 4,
        GUARD: 0,
        HARVESTER3 : 0,
        TRANSFERER : 0,
        CLAIMER : 0,
        LINKTRANSFERER: 1,
        ATTACKER: 0
    }
};

module.exports.RoomNames = {
    MAINROOM : 'E49N54',
    ATTACKROOM : 'E48N55',
    SECONDROOM : 'E48N54',
    THIRDROOM : 'E48N55'
};


module.exports.RepairValues = {
    E49N54 : {
        MINWALLHITS : 1500000,
        MINRAMPARTHITS : 1000000,
        MAXREPAIRHITS : 1500000
    },
    E48N54 : {
        MINWALLHITS : 200000,
        MINRAMPARTHITS : 250000,
        MAXREPAIRHITS : 300000
    }
};

module.exports.RoomPositions = {
    GUARDPOST1 : new RoomPosition(6,24, module.exports.RoomNames.SECONDROOM),
    SOURCE0WAITSPOT : new RoomPosition(32,34, module.exports.RoomNames.MAINROOM),
    SOURCE0HARVESTSPOT: new RoomPosition(34,35, module.exports.RoomNames.MAINROOM),
    RENEWCREEPSPOT: new RoomPosition(20,33, module.exports.RoomNames.MAINROOM),
    RENEWCREEPSPOT2: new RoomPosition(22,34, module.exports.RoomNames.SECONDROOM),
    LINKTRANSFERERSPOT: new RoomPosition(20,37, module.exports.RoomNames.MAINROOM),
    ATTACKROOMSPOT: new RoomPosition(34,47, module.exports.RoomNames.ATTACKROOM),
    CHECKROOMSPOT: new RoomPosition(34,47, module.exports.RoomNames.ATTACKROOM)
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


