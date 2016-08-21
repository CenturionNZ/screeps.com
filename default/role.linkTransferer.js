var helper = require('helper');
var constants = require('constants');

var roleLinkTransferer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
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
                creep.memory.task = constants.CreepTasks.WITHDRAW; 
                creep.say('withdrawing');
                
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
	       if (creep.pos != constants.RoomPositions.RENEWCREEPSPOT ) {
	            creep.moveTo(constants.RoomPositions.RENEWCREEPSPOT);
	       }
	    }
        else if(creep.memory.task == constants.CreepTasks.TRANSFER ) {
            
           var object = Game.getObjectById(constants.ObjectIds.STORAGE)
            
                if (object != null) {
                    if(creep.transfer(object, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(object);
                }
            }
        
        }
        else if(creep.memory.task == constants.CreepTasks.WITHDRAW) {
            
              
           var object = Game.getObjectById(constants.ObjectIds.RECEIVINGLINK)
          	     if(creep.withdraw(object, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(object);
                }
           
        }
	}
};

module.exports = roleLinkTransferer;