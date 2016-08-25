var helper = require('helper');
var constants = require('constants');

var roleHarvester2 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var emptyContainers = helper.getEmptyContainers(creep);
        
        //ASSIGN TASKS
        
	    
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
            if (creep.memory.task != constants.CreepTasks.HARVEST) {
                creep.memory.task = constants.CreepTasks.HARVEST; 
                creep.say('harvesting');
            }
	    }
	    else if (creep.memory.task == constants.CreepTasks.HARVEST) {
	        if (creep.carry.energy == creep.carryCapacity) {
	            creep.memory.task = null;
	        }
	        
	    }
	    else if(creep.carry.energy > 0) {
	        if (creep.memory.task != constants.CreepTasks.TRANSFER) {
    	        creep.memory.task = constants.CreepTasks.TRANSFER 
    	        creep.say('transfering');
	        }
	    }
	    
        //ACTION TASKS  
	    if(creep.memory.task == constants.CreepTasks.RENEW ) {
	        
	       if (creep.energy >= constants.Ticks.CREEPMAXTICKSTOLIVE) {
	           creep.moveTo(20,36);
	       }
	       else {
    	       if (creep.pos != constants.RoomPositions.RENEWCREEPSPOT ) {
    	            creep.moveTo(constants.RoomPositions.RENEWCREEPSPOT);
    	       }
	       }
	    }
        else if(creep.memory.task == constants.CreepTasks.TRANSFER ) {
            
            var targets = helper.getEmptyContainers(creep);
            
            if (targets.length == 0) {
               var targets = creep.pos.findInRange(FIND_STRUCTURES, 3, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                        _.sum(structure.store) < structure.storeCapacity;
                }
            });
            }
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        
        }
        else if(creep.memory.task == constants.CreepTasks.HARVEST) {
            
            helper.harvestSource(creep);
           
        }
	}
};

module.exports = roleHarvester2;