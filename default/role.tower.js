
var helper = require('helper');
var constants = require('constants');
 
var roleTower = {
     run: function(tower) {
         
         var      enemyTargets = tower.room.find(FIND_CREEPS, {
                filter: object => (!object.owner || object.owner.username == 'Invader')
            });
         
         
         if (enemyTargets.length > 0) {
             tower.attack(enemyTargets[0]);
         }
         
        //  else if (repairStructures.length > 0) {
        //      tower.repair(repairStructures[0]);
        //  }
         
         
     }
    
    
}


module.exports = roleTower;