var helper = require('helper');
var constants = require('constants');

var roleLinkTransferer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        helper.setTransferSource(creep)
        helper.setWithdrawSource(creep)
        
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
            
            if (creep.memory.transferSpot && !helper.compareRoomPos(creep.pos,constants.RoomPositions[creep.memory.transferSpot])) {
                      creep.moveTo(constants.RoomPositions[creep.memory.transferSpot]);
              }  
            else {
                var object = Game.getObjectById(creep.memory.transferSourceId)
                    if (object != null) {
                        if(creep.transfer(object, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(object);
                    }
                }
            }
        
        }
        else if(creep.memory.task == constants.CreepTasks.WITHDRAW) {
               if (creep.memory.transferSpot && !helper.compareRoomPos(creep.pos,constants.RoomPositions[creep.memory.transferSpot])) {
                      creep.moveTo(constants.RoomPositions[creep.memory.transferSpot]);
              }  
            else {
               var object = Game.getObjectById(creep.memory.withdrawSourceId)
              	     if(creep.withdraw(object, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(object);
                    }
            
            }
           
        }
	}
};

module.exports = roleLinkTransferer;