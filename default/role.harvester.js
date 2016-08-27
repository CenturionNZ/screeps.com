var helper = require('helper');
var constants = require('constants');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        var secondRoom = Game.rooms[constants.RoomNames.SECONDROOM];
        creep.memory.baseRoom = constants.RoomNames.SECONDROOM;
        
        helper.setHarvestSource(creep)
        helper.setTransferSource(creep)
        
        var energyStructures = helper.getEmptyEnergyStructures(creep, secondRoom);
        
        if (creep.memory.harvestSourceId == null) {
            creep.memory.harvestSourceId = '579fa9e80700be0674d301b0';
        }
        

        //ASSIGN TASKS
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
	    else if((creep.memory.transferSourceId || energyStructures.length > 0) && creep.carry.energy > 0) {
	        if (creep.memory.task != constants.CreepTasks.TRANSFER) {
    	        creep.memory.task = constants.CreepTasks.TRANSFER 
    	        creep.say('transfering');
	        }
	    }
	    else if(creep.carry.energy  && creep.carry.energy > 0) {
	        if (creep.memory.task != constants.CreepTasks.UPGRADE) {
    	        creep.memory.task = constants.CreepTasks.UPGRADE
    	        creep.say('upgrading');
	        }
	    }
	    
        //ACTION TASKS  
        if(creep.memory.task == constants.CreepTasks.RENEW ) {
	       helper.renewCreep(creep); 
	    }
        else   if(creep.memory.task == constants.CreepTasks.TRANSFER ) {
            
            if (creep.memory.transferSourceId) {
                var target = Game.getObjectById(creep.memory.transferSourceId)
            }
            else {
                   
                var room = Game.rooms[constants.RoomNames.SECONDROOM];
                
                var targets = room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_TOWER) &&
                                structure.energy < structure.energyCapacity;
                        }
                });
                
                if (targets.length == 0) {
                    var targets = room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                    structure.energy < structure.energyCapacity;
                            }
                    });
                 
                }
                
                if(targets.length > 0) {
                    target = targets[0];
                }
                
            }
            
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        
        }
	   else if(creep.memory.task == constants.CreepTasks.UPGRADE) {
            if(creep.upgradeController(secondRoom.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(secondRoom.controller);
            }
        }
        else {
     
                helper.harvestSource(creep );
           
        }
	}
};

module.exports = roleHarvester;