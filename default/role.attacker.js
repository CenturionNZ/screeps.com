var helper = require('helper');
var constants = require('constants');


var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        //creep.moveTo()
        
        enemyTargets = creep.room.find(FIND_CREEPS, {
                filter: object => (!object.owner || object.owner.username != 'CenturionNZ')
            });
            
        if (creep.memory.task == null) {
            creep.memory.task = constants.CreepTasks.GUARD;
        }
        else if (enemyTargets.length > 0 && creep.memory.task != constants.CreepTasks.ATTACK) {
            creep.memory.task = constants.CreepTasks.ATTACK;
        }
        
        if (creep.memory.task == constants.CreepTasks.GUARD) {
             
            if (creep.pos != constants.RoomPositions.GUARDPOST1) {
                creep.moveTo(constants.RoomPositions.GUARDPOST1);
            }
        }
        else if (constants.CreepTasks.ATTACK) {

          if (enemyTargets.length > 0) {
              if(creep.attack(enemyTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(enemyTargets[0]);
                }
            }
          
        
        }
	}
};

module.exports = roleAttacker;