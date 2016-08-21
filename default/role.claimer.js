var helper = require('helper');
var constants = require('constants');


var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
 
        
     
        if (creep.memory.task == constants.CreepTasks.GUARD && helper.compareRoomPos(creep.pos,constants.RoomPositions.GUARDPOST1) && creep.memory.checkRoomTimer <= 0) {
            creep.say('checking room');
            creep.memory.task = constants.CreepTasks.CHECKROOM;
             
        }
        else if (creep.memory.task == constants.CreepTasks.CHECKROOM &&  helper.compareRoomPos(creep.pos,constants.RoomPositions.CHECKROOMSPOT)) {
            
                var  roomController = Game.rooms[constants.RoomNames.ATTACKROOM].find(FIND_STRUCTURES, {
                    filter: object => (object.structureType == STRUCTURE_CONTROLLER)
                });
                
                if (roomController.length > 0 && roomController[0].level == 0) {
                     creep.memory.task = constants.CreepTasks.CLAIM;
                    creep.say('claiming');
                }
                else {
                    creep.memory.task = constants.CreepTasks.GUARD
                    creep.memory.checkRoomTimer = 30;
                }
        }
        else if (creep.memory.task == null) {
            creep.memory.task = constants.CreepTasks.GUARD;
            creep.memory.checkRoomTimer = 30;
        }
        
        if(creep.memory.task == constants.CreepTasks.CHECKROOM) {
	          if (creep.pos != constants.RoomNames.CHECKROOMSPOT) {
                      creep.moveTo(constants.RoomPositions.CHECKROOMSPOT);
              }
              else {
                  
              }
	    }
	    else if(creep.memory.task == constants.CreepTasks.CLAIM) {
	        
	           if ( helper.compareRoomPos(creep.pos,constants.RoomNames.ATTACKROOMSPOT)) {
                      creep.moveTo(constants.RoomPositions.ATTACKROOMSPOT);
              }
              else {
                var  roomController = Game.rooms[constants.RoomNames.ATTACKROOM].find(FIND_STRUCTURES, {
                    filter: object => (object.structureType == STRUCTURE_CONTROLLER)
                });
                
                
                
                if (roomController.length > 0) {
                    if(creep.claimController(roomController[0]) == ERR_NOT_IN_RANGE) {
                     creep.moveTo(roomController[0]);
                    }
                }
              }
	            
	        
          
                
	    }
	     else if(creep.memory.task == constants.CreepTasks.GUARD) {
	       if (creep.pos != constants.RoomNames.GUARDPOST1) {
                      creep.moveTo(constants.RoomPositions.GUARDPOST1);
              }
	    }
	    
	    creep.memory.checkRoomTimer = creep.memory.checkRoomTimer - 1;
     
	}
};

module.exports = roleClaimer;