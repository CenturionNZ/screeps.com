module.exports.SpawnNames = {
    MAINSPAWN : 'Spawn1',
    SECONDSPAWN : 'Spawn2',
    THIRDSPAWN : 'Spawn3'
};

module.exports.CreepBodys = {
    E49N54 : {
        Default: [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
        harvester : [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE],
        harvester3 : [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE],
        claimer : [CLAIM,MOVE,MOVE,MOVE],
        linkTransferer : [CARRY,CARRY,MOVE],
        attacker: [ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE]
    },
    E48N54 : {
        Default: [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
        harvester : [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE],
        harvester3 : [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE],
        claimer : [CLAIM,MOVE,MOVE,MOVE],
        linkTransferer : [CARRY,CARRY,MOVE],
        attacker: [ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE]
    },
    E48N55 : {
        Default:  [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
        harvester : [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
        harvester3 : [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
        claimer : [CLAIM,MOVE,MOVE,MOVE],
        linkTransferer : [CARRY,CARRY,MOVE],
        attacker: [ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE]
    }
}

module.exports.HarvestSourceId = {
    E49N54 : {
        harvester3: '579fa9eb0700be0674d301f6',
         Lily : '579fa9eb0700be0674d301f5',
        Sebastian: '579fa9eb0700be0674d301f6'
    },
    E48N54 : {
        Default: '579fa9e80700be0674d301b3',
        Grayson: '579fa9e80700be0674d301b3',
        Julia: '579fa9e80700be0674d301b3',
        Zoe: '579fa9e80700be0674d301b5',
        harvester: '579fa9e80700be0674d301b1',
        Levi: '579fa9e80700be0674d301b3',
        Eva: '579fa9e60700be0674d30171'
    },
    E48N55 : {
        Default: '579fa9e80700be0674d301b0',
        Levi: '579fa9e80700be0674d301b1',
        Maria: '579fa9e80700be0674d301b1',
        Addison: '579fa9eb0700be0674d301f1',
        harvester: '579fa9e80700be0674d301b1',
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
        linkTransferer: '57c3c8157c29305404ff2eaa',
        upgrader : '57beeeba0591e31e250c3cdd',
        Jayce: '57be96607e20fc6878fea62d',
        Dylan: '57c3c8157c29305404ff2eaa',
        Zachary: '57c68051cd27d5141002d78d',
        Annabelle: '57c68051cd27d5141002d78d'
        
    },
    E48N55 : {
        Default: '57cac5bab879478176d2f1d2',
        linkTransferer: '57cc11d0aeba98cb693802b4'
    },
    E49N55 : {
        Default: '57cac5bab879478176d2f1d2'
    }
};

module.exports.TransferSourceId = {
    E49N54 : {
        Default: '57b41827a8d0e1d76bf79507',
        Sebastian: '57b41827a8d0e1d76bf79507',
         Lily: '57b44a96eead0db92ed6d3aa',
        linkTransferer: '57b41827a8d0e1d76bf79507'
    },
    E48N54 : {
        Default: '57beeeba0591e31e250c3cdd',
         Zoe: '57c63cc7ddd9c8ab5332624c',
        harvester: '57c7662befe7b897236bbfa7',
        Grayson: '57beeeba0591e31e250c3cdd',
        Julia: '57beeeba0591e31e250c3cdd',
        Levi: '57beeeba0591e31e250c3cdd'
    },
    E48N55 : {
        Default: '57cac5bab879478176d2f1d2',
        Levi: '57c7662befe7b897236bbfa7',
        harvester: '57c7662befe7b897236bbfa7',
        Maria: '57cc430427772ff61fc741f4'
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
    CLAIMER: 'claimer',
    
    ARMER: 'armer'
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

module.exports.Links = {
    '57b44a96eead0db92ed6d3aa' : '57b444508f645b7a4a9f4dd9',
    '57c63cc7ddd9c8ab5332624c' : '57c3c8157c29305404ff2eaa',
    '57c7662befe7b897236bbfa7' : '57c3c8157c29305404ff2eaa',
    '57cc430427772ff61fc741f4' : '57cc11d0aeba98cb693802b4'
}

module.exports.MaxCreeps = {
    
    E49N54 : {
        HARVESTER : 0,
        UPGRADER : 2,
        BUILDER: 2,
        GUARD: 0,
        HARVESTER3 : 2,
        TRANSFERER : 4,
        CLAIMER : 0,
        LINKTRANSFERER: 1,
        ATTACKER: 0
    },
    E48N54 : {
        HARVESTER : 0,
        UPGRADER : 2,
        BUILDER: 2,
        GUARD: 0,
        HARVESTER3 : 1,
        TRANSFERER : 3,
        CLAIMER : 0,
        LINKTRANSFERER: 1,
        ATTACKER: 1
    },
    E48N55 : {
        HARVESTER : 0,
        UPGRADER : 2,
        BUILDER: 2,
        GUARD: 0,
        HARVESTER3 : 2,
        TRANSFERER : 3,
        CLAIMER : 0,
        LINKTRANSFERER: 1,
        ATTACKER: 1,
        ARMER: 1
    }
};

module.exports.RoomNames = {
    MAINROOM : 'E49N54',
    ATTACKROOM : 'E48N55',
    SECONDROOM : 'E48N54',
    THIRDROOM : 'E48N55',
    FOURTHROOM : 'E49N55',
    FIFTHROOM : 'E47N54',
};


module.exports.RepairValues = {
    E49N54 : {
        MINWALLHITS : 2000000,
        MINRAMPARTHITS : 1750000,
        MAXREPAIRHITS : 2000000
    },
    E48N54 : {
        MINWALLHITS : 400000,
        MINRAMPARTHITS : 350000,
        MAXREPAIRHITS : 400000
    },
    E48N55 : {
        MINWALLHITS : 400000,
        MINRAMPARTHITS : 350000,
        MAXREPAIRHITS : 400000
    }
};

module.exports.RoomPositions = {
    E49N54 : {
        GUARDPOST : new RoomPosition(6,24, module.exports.RoomNames.MAINROOM)
    },
    E48N54 : {
        GUARDPOST : new RoomPosition(4,33, module.exports.RoomNames.SECONDROOM)
    },
    E48N55 : {
        GUARDPOST : new RoomPosition(31,18, module.exports.RoomNames.THIRDROOM)
    },
    GUARDPOST1 : new RoomPosition(6,24, module.exports.RoomNames.SECONDROOM),
    SOURCE0WAITSPOT : new RoomPosition(32,34, module.exports.RoomNames.MAINROOM),
    SOURCE0HARVESTSPOT: new RoomPosition(34,35, module.exports.RoomNames.MAINROOM),
    RENEWCREEPSPOT: new RoomPosition(20,33, module.exports.RoomNames.MAINROOM),
    RENEWCREEPSPOT2: new RoomPosition(22,34, module.exports.RoomNames.SECONDROOM),
    RENEWCREEPSPOT3:  new RoomPosition(36,30, module.exports.RoomNames.THIRDROOM),
    LINKTRANSFERERSPOT: new RoomPosition(20,37, module.exports.RoomNames.MAINROOM),
    ATTACKROOMSPOT: new RoomPosition(34,47, module.exports.RoomNames.ATTACKROOM),
    CHECKROOMSPOT: new RoomPosition(34,47, module.exports.RoomNames.ATTACKROOM),
    SECONDROOMLINKTRANSFERSPOT: new RoomPosition(10,27, module.exports.RoomNames.SECONDROOM),
    FOURTHROOMHARVESTWAITINGSPOT: new RoomPosition(1,33, module.exports.RoomNames.FOURTHROOM),
    FIFTHROOMHARVESTWAITINGSPOT: new RoomPosition(47,24, module.exports.RoomNames.FIFTHROOM),
    THIRDROOMLINKTRANSFERSPOT: new RoomPosition(37,35, module.exports.RoomNames.THIRDROOM),
};

module.exports.RenewScreepSpot = {
    E49N54 : new RoomPosition(20,33, module.exports.RoomNames.MAINROOM),
    E48N54 :  new RoomPosition(22,34, module.exports.RoomNames.SECONDROOM),
    E48N55 :  new RoomPosition(36,30, module.exports.RoomNames.THIRDROOM),
    E49N55 :  new RoomPosition(36,30, module.exports.RoomNames.THIRDROOM),
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


