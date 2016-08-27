var helper = require('helper');
var constants = require('constants');
 
var roleSpawn = {
     run: function(spawn, createCreeps, renewCreepSpot) {
        
        var creepsAtRenewSpot = spawn.room.lookForAt(LOOK_CREEPS, renewCreepSpot); 
        
        if (creepsAtRenewSpot.length > 0) {
            var creep = creepsAtRenewSpot[0];
            
            if (creep.ticksToLive < constants.Ticks.CREEPMAXTICKSTOLIVE) {
                spawn.renewCreep(creep);
                
                console.log('Renewing creep: ' + creep.name + '. ' + creep.ticksToLive + ' ttl');
            }
        } 
        else if (createCreeps){
            
            
            if (helper.getCreepsRoleCount(constants.RoleNames.TRANSFERER, spawn.room.name) < constants.MaxCreeps[spawn.room.name].TRANSFERER)
            {
                helper.spawnCreeps(spawn, constants.RoleNames.TRANSFERER, constants.MaxCreeps[spawn.room.name].TRANSFERER);
            }
            else if (helper.getCreepsRoleCount(constants.RoleNames.HARVESTER3, spawn.room.name) < constants.MaxCreeps[spawn.room.name].HARVESTER3)
            {
                 helper.spawnCreeps(spawn, constants.RoleNames.HARVESTER3, constants.MaxCreeps[spawn.room.name].HARVESTER3);
            }
            else
            {
                helper.spawnCreeps(spawn, constants.RoleNames.LINKTRANSFERER, constants.MaxCreeps[spawn.room.name].LINKTRANSFERER);
                
                helper.spawnCreeps(spawn, constants.RoleNames.BUILDER, constants.MaxCreeps[spawn.room.name].BUILDER);
                
                helper.spawnCreeps(spawn, constants.RoleNames.UPGRADER, constants.MaxCreeps[spawn.room.name].UPGRADER);
                
                helper.spawnCreeps(spawn, constants.RoleNames.ATTACKER, constants.MaxCreeps[spawn.room.name].ATTACKER);
                
                helper.spawnCreeps(spawn, constants.RoleNames.HARVESTER, constants.MaxCreeps[spawn.room.name].HARVESTER);
                
                if (spawn.name == constants.SpawnNames.MAINSPAWN) {
                    helper.spawnCreeps(spawn, constants.RoleNames.CLAIMER, constants.MaxCreeps[spawn.room.name].CLAIMER, true);
                
                }
                
                // if (helper.doIOwnRoom(constants.RoomNames.SECONDROOM)) {
                //       helper.spawnCreeps(spawn, constants.RoleNames.HARVESTER, constants.MaxCreeps.HARVESTER);
                // }
            }
        }
         
         
     }
    
    
}


module.exports = roleSpawn;