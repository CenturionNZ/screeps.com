var helper = require('helper');
var constants = require('constants');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
                
        if (!creep.memory.baseRoom) {
            creep.memory.baseRoom = constants.RoomNames.MAINROOM;
        }

       //ASSIGN TASKS
        if (creep.memory.task == constants.CreepTasks.WITHDRAW && creep.carry.energy == creep.carryCapacity) {
            creep.memory.withdrawSourceId = null;
            creep.memory.task = null;
	        
	    }
	    
        if (creep.memory.task == constants.CreepTasks.RENEW) {
             if (creep.ticksToLive >= constants.Ticks.CREEPMAXTICKSTOLIVE) {
                creep.memory.task = null;
            }
        }
        else if (creep.ticksToLive < constants.Ticks.CREEPMINTICKSTOLIVE) {
            if (creep.memory.task != constants.CreepTasks.RENEW) {
                creep.memory.task = constants.CreepTasks.RENEW; 
                creep.say('renewing');
            }
        }
        else if(creep.carry.energy == 0) {
            if (creep.memory.task != constants.CreepTasks.WITHDRAW) {
                creep.memory.task = constants.CreepTasks.WITHDRAW
                creep.say('withdrawing');
            }
	    }
	    else if(creep.carry.energy > 0) {
	        if (creep.memory.task != constants.CreepTasks.UPGRADE) {
    	        creep.memory.task = constants.CreepTasks.UPGRADE
    	        creep.say('upgrading');
	        }
	    }
	    
	    
        //ACTION TASKS  
	    if(creep.memory.task == constants.CreepTasks.RENEW ) {
	       if (creep.pos != constants.RoomPositions.RENEWCREEPSPOT ) {
	            creep.moveTo(constants.RoomPositions.RENEWCREEPSPOT);
	       }
	    }
        else if(creep.memory.task == constants.CreepTasks.UPGRADE) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else if(creep.memory.task == constants.CreepTasks.WITHDRAW) {
            
            helper.withdrawEnergy(creep, false);
        }
	}
};

module.exports = roleUpgrader;