var helper = require('helper');
var constants = require('constants');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        var secondRoom = Game.rooms[constants.RoomNames.SECONDROOM];
        var thirdRoom = Game.rooms[constants.RoomNames.THIRDROOM];
        creep.memory.baseRoom = constants.RoomNames.THIRDROOM;
        
        helper.setHarvestSource(creep)
        helper.setTransferSource(creep)
        var energyStructures = helper.getEmptyEnergyStructures(creep, secondRoom);
        var constructionSites = helper.getConstructionsSites(creep, constants.RoomNames.THIRDROOM);
        
        try {
        var repairStructures = helper.getStructuresToRepair(creep, constants.RoomNames.THIRDROOM);
        }
        catch(err) {
            
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
	    
// 		else if(constructionSites.length > 0) {
// 	        if (creep.memory.task != constants.CreepTasks.BUILD ) {
// 				creep.memory.task = constants.CreepTasks.BUILD 
// 				creep.say('building');
// 	        }
// 	    }		
// 		else if(repairStructures && repairStructures.length > 0) {
//             if (creep.memory.task != constants.CreepTasks.REPAIR) {
//     	        creep.memory.task = constants.CreepTasks.REPAIR 
// 				creep.say('repairing');
//             }
// 	    }
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
	        
	        //Repair strucuture to object max hits or to global maximum hits
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
        else  if(creep.memory.task == constants.CreepTasks.TRANSFER ) {
            
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
            if(creep.upgradeController(thirdRoom.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(thirdRoom.controller);
            }
        }
        else {
          
                helper.harvestSource(creep );
                
     
           
        }
	}
};

module.exports = roleHarvester;