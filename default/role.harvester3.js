var helper = require('helper');
var constants = require('constants');

var roleHarvester3 = {

    /** @param {Creep} creep **/
    run: function(creep) {

        helper.setHarvestSource(creep)
        helper.setTransferSource(creep)
        
       // console.log(_.sum(creep.carry));
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
        else if(_.sum(creep.carry) == 0) {
            if (creep.memory.task != constants.CreepTasks.HARVEST) {
                creep.memory.task = constants.CreepTasks.HARVEST; 
                creep.say('harvesting');
            }
	    }
	    else if (creep.memory.task == constants.CreepTasks.HARVEST) {
	        if (_.sum(creep.carry) == creep.carryCapacity) {
	            creep.memory.task = null;
	        }
	    }
	    else if(_.sum(creep.carry) > 0) {
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
            
          
            var object = Game.getObjectById(creep.memory.transferSourceId)
                if (object != null) {
                    if (creep.carry.energy > 0) {
                        if(creep.transfer(object, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(object);
                        }
                    }
                    else {
                        if(creep.transfer(object, RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(object);
                         }
                         
                         
                        if(creep.transfer(object, RESOURCE_CATALYST) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(object);
                         }
                    }
                }
            
        
        }
        else if(creep.memory.task == constants.CreepTasks.HARVEST) {
            
            helper.harvestSource(creep);
           
        }
	}
};

module.exports = roleHarvester3;