var helper = require('helper');
var constants = require('constants');


var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        creep.memory.baseRoom = constants.RoomNames.SECONDROOM;
        
 	  
 
        creep.memory.task = constants.CreepTasks.RESERVE
        
        // else if (creep.memory.task == constants.CreepTasks.CHECKROOM && helper.compareRoomPos(creep.pos,constants.RoomPositions.CHECKROOMSPOT)) {
            
        //         var  roomController = Game.rooms[constants.RoomNames.ATTACKROOM].find(FIND_STRUCTURES, {
        //             filter: object => (object.structureType == STRUCTURE_CONTROLLER)
        //         });
                
        //         if (roomController.length > 0 && roomController[0].level == 0) {
        //              creep.memory.task = constants.CreepTasks.CLAIM;
        //             creep.say('claiming');
        //         }
        // }
        
        
        //ACTION TASKS    
	    if(creep.memory.task == constants.CreepTasks.CHECKROOM) {
	          if (!helper.compareRoomPos(creep.pos,constants.RoomPositions.CHECKROOMSPOT)) {
                      creep.moveTo(constants.RoomPositions.CHECKROOMSPOT);
              }
	    }
	    else 	    if(creep.memory.task == constants.CreepTasks.RESERVE) {
	       
	          if (!creep.memory.reachedAttackSpot == true && !helper.compareRoomPos(creep.pos,constants.RoomPositions.CHECKROOMSPOT)) {
                      creep.moveTo(constants.RoomPositions.CHECKROOMSPOT);
              }
              else if (Game.rooms[constants.RoomNames.ATTACKROOM]){
                  
                      creep.memory.reachedAttackSpot = true;
                var  roomController = Game.rooms[constants.RoomNames.ATTACKROOM].find(FIND_STRUCTURES, {
                    filter: object => (object.structureType == STRUCTURE_CONTROLLER)
                });
                
                
                
                
                if (roomController.length > 0) {
                    if(creep.reserveController(roomController[0]) == ERR_NOT_IN_RANGE) {
                     creep.moveTo(roomController[0]);
                    }
                }
              }
	    }
	    else if(creep.memory.task == constants.CreepTasks.CLAIM && helper.doIOwnRoom(constants.RoomNames.SECONDROOM)) {
	        
	          if (!creep.memory.reachedAttackSpot == true && !helper.compareRoomPos(creep.pos,constants.RoomPositions.ATTACKROOMSPOT)) {
                      creep.moveTo(constants.RoomPositions.ATTACKROOMSPOT);
              }
              else {
                      creep.memory.reachedAttackSpot = true;
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
     
	}
};

module.exports = roleClaimer;