var helper = require('helper');
var constants = require('constants');


var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var  enemyTargets = Game.rooms[constants.RoomNames.ATTACKROOM].find(FIND_STRUCTURES, {
            filter: object => (object.owner != 'CenturionNZ' && object.structureType != STRUCTURE_CONTROLLER)
        });
        
        //      var  enemyController = Game.rooms[constants.RoomNames.ATTACKROOM].find(FIND_STRUCTURES, {
        //     filter: object => (object.owner != 'CenturionNZ' && object.structureType == STRUCTURE_CONTROLLER)
        // });
        
        
        if (enemyTargets.length == 0) {
            enemyTargets = Game.rooms[constants.RoomNames.ATTACKROOM].find(FIND_CREEPS, {
                filter: object => (object.owner != 'CenturionNZ')
            });
        }

        if (creep.memory.task == null) {
            creep.memory.task = constants.CreepTasks.GUARD;
        }
        
                
        //ATTACK
        if (creep.memory.task != constants.CreepTasks.ATTACKROOM) {
            creep.memory.task = constants.CreepTasks.ATTACKROOM;
        }
        
        //GUARD
        // if (creep.memory.task != constants.CreepTasks.GUARD) {
        //     creep.memory.task = constants.CreepTasks.GUARD;
        // }
        
        if (creep.memory.task == constants.CreepTasks.GUARD) {
             
            if (creep.pos != constants.RoomPositions.GUARDPOST1) {
                creep.moveTo(constants.RoomPositions.GUARDPOST1);
            }
        }
        else if (constants.CreepTasks.ATTACKROOM) {
            
            // if (creep.pos != constants.RoomNames.ATTACKROOMSPOT) {
            //     creep.moveTo(constants.RoomPositions.ATTACKROOMSPOT);
            // }
            
          if (enemyTargets.length > 0) {
              if(creep.attack(enemyTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(enemyTargets[0]);
                }
            }
            // else {
            //      if (creep.pos != constants.RoomNames.ATTACKROOMSPOT) {
            //          creep.moveTo(constants.RoomPositions.ATTACKROOMSPOT);
            //     }
            // }
        
        }
	}
};

module.exports = roleAttacker;