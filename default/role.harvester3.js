var helper = require('helper');
var constants = require('constants');

var roleHarvester3 = {

    /** @param {Creep} creep **/
    run: function(creep) {

        helper.setHarvestSource(creep)
        helper.setTransferSource(creep)
        
        
        var emptyContainers = helper.getEmptyContainers(creep);
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
	    else if(creep.carry.energy > 0) {
	        if (creep.memory.task != constants.CreepTasks.TRANSFER) {
    	        creep.memory.task = constants.CreepTasks.TRANSFER 
    	        creep.say('transfering');
	        }
	    }
	    
        //ACTION TASKS  
	    if(creep.memory.task == constants.CreepTasks.RENEW ) {
	         helper.renewCreep(creep); 
	    }
        else if(creep.memory.task == constants.CreepTasks.TRANSFER ) {
            
            if (creep.memory.transferSourceId == null){
                if (creep.memory.harvestSource == 1) {
                    creep.memory.transferSourceId = '57b41827a8d0e1d76bf79507';
                }
                else 
                if (creep.memory.harvestSource == 0) {
                    creep.memory.transferSourceId = '57b44a96eead0db92ed6d3aa';
                }
                else {
                    creep.memory.transferSourceId = '57b41827a8d0e1d76bf79507';
                }
            }
            
            var object = Game.getObjectById(creep.memory.transferSourceId)
            
                if (object != null) {
                    if(creep.transfer(object, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(object);
                }
            }
        
        }
        else if(creep.memory.task == constants.CreepTasks.HARVEST) {
            
            helper.harvestSource(creep);
           
        }
	}
};

module.exports = roleHarvester3;