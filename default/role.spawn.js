var helper = require('helper');
var constants = require('constants');
 
var roleSpawn = {
     run: function(spawn, createCreeps, renewCreepSpot) {
        
        var creepsAtRenewSpot = spawn.room.lookForAt(LOOK_CREEPS, renewCreepSpot); 
        
        if (creepsAtRenewSpot.length > 0 && creepsAtRenewSpot[0].ticksToLive < constants.Ticks.CREEPMAXTICKSTOLIVE) {
            var creep = creepsAtRenewSpot[0];
            
                spawn.renewCreep(creep);
                
               // console.log('Renewing creep: ' + creep.name + '. ' + creep.ticksToLive + ' ttl');
        } 
        else if (createCreeps){
            helper.spawnCreeps(spawn, spawn.room.name);
            
            // if (spawn.name == constants.SpawnNames.SECONDSPAWN && spawn.canCreateCreep([WORK,MOVE,CARRY]) == 0) {
                
            //     helper.spawnCreeps(spawn, constants.RoomNames.THIRDROOM);
            // }
        }
         
         
     }
    
    
}


module.exports = roleSpawn;