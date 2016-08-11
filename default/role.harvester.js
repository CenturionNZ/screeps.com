var helper = require('helper');
var constants = require('constants');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var energyStructures = helper.getEmptyEnergyStructures(creep);
        var repairStructures = helper.getStructuresToRepair(creep);
        var constructionSites = helper.getConstructionsSites(creep);
        
        if(creep.carry.energy == 0) {
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
	    else if(energyStructures.length > 0 && creep.carry.energy > 0) {
	        if (creep.memory.task != constants.CreepTasks.TRANSFER) {
    	        creep.memory.task = constants.CreepTasks.TRANSFER 
    	        creep.say('transfering');
	        }
	    }
	    else if(constructionSites.length > 0 && creep.carry.energy > 0) {
	        if (creep.memory.task != constants.CreepTasks.BUILD) {
    	        creep.memory.task = constants.CreepTasks.BUILD 
    	        creep.say('building');
	        }
	    }	
		else if(repairStructures.length > 0) {
            if (creep.memory.task != constants.CreepTasks.REPAIR) {
    	        creep.memory.task = constants.CreepTasks.REPAIR 
				creep.say('repairing');
            }
	    }
	    else if(creep.carry.energy > 0) {
	        if (creep.memory.task != constants.CreepTasks.UPGRADE) {
    	        creep.memory.task = constants.CreepTasks.UPGRADE
    	        creep.say('upgrading');
	        }
	    }
        
        if(creep.memory.task == constants.CreepTasks.TRANSFER ) {
            
              
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
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
	        if (object != null && object.hits < constants.RepairValues.MAXREPAIRHITS && object.hits <  object.hitsMax)
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
        else {
            var sources = creep.room.find(FIND_SOURCES);
            
            if (creep.memory.harvestSource == null)
            {
                if (sources.length > 0)
                {
                    creep.memory.harvestSource = 0
                }
                //creep.memory.harvestSource = helper.rand(sources.length)
            }
            creepsAtSourceSpot = creep.room.lookForAt(LOOK_CREEPS,34, 18);
            
            
            //If a harvester is already harvesting form source, move to waiting spot
            if (creepsAtSourceSpot.length && creepsAtSourceSpot[0].name != creep.name) {
                creep.moveTo(35,17);
            }
            else {
            
                if(creep.harvest(sources[creep.memory.harvestSource]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[creep.memory.harvestSource]);
                }
            }
        }
	}
};

module.exports = roleHarvester;