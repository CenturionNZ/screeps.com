var helper = require('helper');
var constants = require('constants');


var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        //creep.moveTo()
        
        var attackObject = Game.getObjectById(creep.memory.attackId);
        
                   //Find healers first
         var      enemyTargets = creep.room.find(FIND_HOSTILE_CREEPS, {
                filter: object => ((object.body.filter(object => (object.type == 'heal'))).length > 0)
            });
            
            if (enemyTargets.length == 0) {
                 var      enemyTargets = creep.room.find(FIND_HOSTILE_CREEPS);
            }
            
          if (creep.memory.task == constants.CreepTasks.RENEW) {
             if (creep.ticksToLive >= constants.Ticks.CREEPMAXTICKSTOLIVE) {
                 creep.moveTo(creep.pos.x, creep.pos.y + 1);
                creep.memory.task = null;
            }
        }
        else if (creep.ticksToLive < constants.Ticks.CREEPMINTICKSTOLIVE) {
            if (creep.memory.task != constants.CreepTasks.RENEW) {
                creep.memory.task = constants.CreepTasks.RENEW; 
                creep.say('renewing');
            }
        }
        else if (attackObject) {
            creep.memory.task = constants.CreepTasks.ATTACK;
        }
        else if (enemyTargets.length > 0) {
            creep.memory.task = constants.CreepTasks.ATTACK;
        }
       else {
            creep.memory.task = constants.CreepTasks.GUARD;
       }
        
        //ACTION TASKS  
	    if(creep.memory.task == constants.CreepTasks.RENEW ) {
          helper.renewCreep(creep); 
	    }
        else if (creep.memory.task == constants.CreepTasks.GUARD ) {
             
            if (creep.pos != constants.RoomPositions[creep.memory.baseRoom].GUARDPOST) {
                creep.moveTo(constants.RoomPositions[creep.memory.baseRoom].GUARDPOST);
            }
        }
        else if (creep.memory.task == constants.CreepTasks.ATTACK) {
            
            if (attackObject) {
                if(creep.attack(attackObject) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(attackObject);
                }
            }
            else if (enemyTargets.length > 0) {
              if(creep.attack(enemyTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(enemyTargets[0]);
                }
            }
        }
         
	}
};

module.exports = roleAttacker;