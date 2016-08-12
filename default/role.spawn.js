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
            if (helper.getCreepsRoleCount(constants.RoleNames.HARVESTER) < constants.MaxCreeps.HARVESTER)
            {
                 helper.spawnCreeps(spawn, constants.RoleNames.HARVESTER, constants.MaxCreeps.HARVESTER, true, true);
            }
            else
            {
                helper.spawnCreeps(spawn, constants.RoleNames.UPGRADER, constants.MaxCreeps.UPGRADER, true, true);
                
                helper.spawnCreeps(spawn, constants.RoleNames.BUILDER, constants.MaxCreeps.BUILDER, true, true);
                
                helper.spawnAttackCreeps(spawn, constants.RoleNames.GUARD, constants.MaxCreeps.GUARD);
            }
        }
         
         
     }
    
    
}


module.exports = roleSpawn;