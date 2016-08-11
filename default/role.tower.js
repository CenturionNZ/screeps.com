
var helper = require('helper');
var constants = require('constants');
 
var roleTower = {
     run: function(tower) {
         
         var enemyTargets = tower.room.find(Game.HOSTILE_CREEPS);
         var repairStructures = helper.getStructuresToRepair(tower);
         
         if (enemyTargets.length > 0) {
             tower.attack(enemyTargets[0]);
         }
        //  else if (repairStructures.length > 0) {
        //      tower.repair(repairStructures[0]);
        //  }
         
         
     }
    
    
}


module.exports = roleTower;