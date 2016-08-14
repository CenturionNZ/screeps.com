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
                
                console.log(Game.rooms[constants.RoomNames.MAINROOM].energyAvailable+' total energy');
            }
	    }
	    else if (creep.memory.task == constants.CreepTasks.HARVEST) {
	        if (creep.carry.energy == creep.carryCapacity) {
	            creep.memory.task = null;
	        }
	        
	    }
	    else if(emptyContainers.length > 0 && creep.carry.energy > 0) {
	        if (creep.memory.task != constants.CreepTasks.TRANSFER) {
    	        creep.memory.task = constants.CreepTasks.TRANSFER 
    	        creep.say('transfering');
	        }
	    }
	    
        //ACTION TASKS  
	    if(creep.memory.task == constants.CreepTasks.RENEW ) {
	       if (creep.pos != constants.RoomPositions.RENEWCREEPSPOT ) {
	            creep.moveTo(constants.RoomPositions.RENEWCREEPSPOT);
	       }
	    }
        else if(creep.memory.task == constants.CreepTasks.TRANSFER ) {
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                            _.sum(structure.store) < structure.storeCapacity;
                    }
            });
            
            if (targets.length == 0) {
                targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                                structure.energy < structure.energyCapacity;
                        }
                });
             
            }
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        
        }
        else {
            
            helper.harvestSource(creep, constants.RoleHarvestSource.HARVESTER, false);
           
        }
	}
};

module.exports = roleHarvester2;