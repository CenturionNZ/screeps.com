
var helper = require('helper');
var constants = require('constants');
 
var roleTower = {
     run: function(tower) {
         
         var enemyTarget = Game.getObjectById('aaaaaa');
         
         if (enemyTarget) {
              tower.attack(enemyTarget);
         }
         else {
                     //Find healers first
             var      enemyTargets = tower.room.find(FIND_HOSTILE_CREEPS, {
                    filter: object => ((object.body.filter(object => (object.type == 'heal'))).length > 0)
                });
                
                if (enemyTargets.length == 0) {
                     var      enemyTargets = tower.room.find(FIND_HOSTILE_CREEPS);
                }
             
             
             if (enemyTargets.length > 0) {
                 tower.attack(enemyTargets[0]);
             }
             
            //  else if (repairStructures.length > 0) {
            //      tower.repair(repairStructures[0]);
            //  }
         
         }
         
     
         
     }
    
    
}


module.exports = roleTower;