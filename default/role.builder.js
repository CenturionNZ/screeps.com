var helper = require('helper');
var constants = require('constants');


var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var repairStructures = helper.getStructuresToRepair(creep);
        var constructionSites = helper.getConstructionsSites(creep);
        
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
	        if (creep.memory.task != constants.CreepTasks.WITHDRAW) {
                creep.memory.task = constants.CreepTasks.WITHDRAW 
                creep.say('withdrawing');
	        }
	    }	
	    else if (creep.memory.task == constants.CreepTasks.WITHDRAW) {
	        if (creep.carry.energy == creep.carryCapacity) {
	            creep.memory.withdrawSource = null;
	            creep.memory.task = null;
	        }
	        
	    }
		else if(constructionSites.length > 0) {
	        if (creep.memory.task != constants.CreepTasks.BUILD ) {
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
	    else if(constructionSites.length == 0 && repairStructures.length == 0) {
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
        else if(creep.memory.task == constants.CreepTasks.WITHDRAW) {
            
            helper.withdrawEnergyFromContainer(creep, false);
        }
        
	}
};

module.exports = roleBuilder;