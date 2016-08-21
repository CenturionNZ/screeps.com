var helper = require('helper');
var constants = require('constants');
 
var roleSpawn = {
     run: function(spawn) {
        
        creepsAtRenewSpot = spawn.room.lookForAt(LOOK_CREEPS, constants.RoomPositions.RENEWCREEPSPOT); 
        
        if (creepsAtRenewSpot.length > 0) {
            var creep = creepsAtRenewSpot[0];
            
            if (creep.ticksToLive < constants.Ticks.CREEPMAXTICKSTOLIVE) {
                spawn.renewCreep(creep);
                
                console.log('Renewing creep: ' + creep.name + '. ' + creep.ticksToLive + ' ttl');
            }
        } 
        else {
            if (helper.getCreepsRoleCount(constants.RoleNames.HARVESTER3) < constants.MaxCreeps.HARVESTER3)
            {
                 helper.spawnCreeps(spawn, constants.RoleNames.HARVESTER3, constants.MaxCreeps.HARVESTER3);
            }
            else
            {
                helper.spawnCreeps(spawn, constants.RoleNames.UPGRADER, constants.MaxCreeps.UPGRADER);
                
                helper.spawnCreeps(spawn, constants.RoleNames.BUILDER, constants.MaxCreeps.BUILDER);
                
                helper.spawnCreeps(spawn, constants.RoleNames.LINKTRANSFERER, constants.MaxCreeps.LINKTRANSFERER);
                
                //helper.spawnCreeps(spawn, constants.RoleNames.CLAIMER, constants.MaxCreeps.CLAIMER);
            }
        }
         
         
     }
    
    
}


module.exports = roleSpawn;