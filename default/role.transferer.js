var helper = require('helper');
var constants = require('constants');

var roleTransferer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        //creep.memory.baseRoom = constants.RoomNames.MAINROOM;
        
        helper.setWithdrawSource(creep)
        
        var energyStructures = helper.getEmptyEnergyStructures(creep);
       var repairStructures = helper.getStructuresToRepair(creep, creep.memory.baseRoom);
        var constructionSites = helper.getConstructionsSites(creep, creep.memory.baseRoom);
        
        //ASSIGN TASKS
      if (creep.memory.task == constants.CreepTasks.WITHDRAW && creep.carry.energy == creep.carryCapacity) {
            creep.memory.task = null;
	        
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
        else if(creep.carry.energy == 0) {
            if (creep.memory.task != constants.CreepTasks.WITHDRAW) {
                creep.memory.task = constants.CreepTasks.WITHDRAW; 
                creep.say('withdrawing');
                
            }
	    }
	    else if(energyStructures.length > 0 && creep.carry.energy > 0) {
	        if (creep.memory.task != constants.CreepTasks.TRANSFER) {
    	        creep.memory.task = constants.CreepTasks.TRANSFER 
    	        creep.say('transfering');
	        }
	    }
		else if(repairStructures.length > 0  || creep.memory.repairStructureId) {
            if (creep.memory.task != constants.CreepTasks.REPAIR) {
    	        creep.memory.task = constants.CreepTasks.REPAIR 
				creep.say('repairing');
            }
	    }
	    else if(constructionSites.length > 0 && creep.carry.energy > 0) {
	        if (creep.memory.task != constants.CreepTasks.BUILD) {
    	        creep.memory.task = constants.CreepTasks.BUILD 
    	        creep.say('building');
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
	      helper.renewCreep(creep); 
	    }
        else if(creep.memory.task == constants.CreepTasks.TRANSFER ) {
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.energy < structure.energyCapacity;
                        }
                });
                
            if (targets.length == 0) {
                 var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
             
            }
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
                else {
    	        
                    //nsole.log(Game.rooms[constants.RoomNames.MAINROOM].energyAvailable+' total energy');
                }
            }
        
        }
        else if(creep.memory.task == constants.CreepTasks.BUILD) {
            if(constructionSites.length) {
                if(creep.build(constructionSites[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSites[0]);
                }
            }
	    }
	    else if(creep.memory.task == constants.CreepTasks.REPAIR) {
	        
	        //Store structure to be repaired
	        if (creep.memory.repairStructureId == null)
	        {
	            creep.memory.repairStructureId = repairStructures[0].id;
	        }
	        
	        var object = Game.getObjectById(creep.memory.repairStructureId)
	        
	        //Repair strucuture to half way
	        if (object != null && object.hits < constants.RepairValues[creep.memory.baseRoom].MAXREPAIRHITS && object.hits <  object.hitsMax)
	        {
	             if(creep.repair(object) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(object);
                }
	        }
	        else {
	            creep.memory.repairStructureId = null;
	            creep.memory.task = null;
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

module.exports = roleTransferer;