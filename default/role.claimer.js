var helper = require('helper');
var constants = require('constants');


var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        creep.memory.baseRoom = constants.RoomNames.THIRDROOM;
        
 	  
 
        creep.memory.task = constants.CreepTasks.CLAIM
        
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
	    else if(creep.memory.task == constants.CreepTasks.CLAIM ) {
	        
	   //   var  roomController = Game.rooms['E48N55'].find(FIND_STRUCTURES, {
    //                 filter: object => (object.structureType == STRUCTURE_CONTROLLER)
    //             });
    //             console.log(roomController[0].name)
                
                var controllera = Game.getObjectById('579fa9e80700be0674d301af');
                if (controllera) {
                    var a = creep.claimController(controllera);
                    
                console.log(a);
                    
                    if(creep.claimController(controllera) == ERR_NOT_IN_RANGE) {
                        
                     creep.moveTo(controllera);
                    }
                }
	        
	       //   if (!creep.memory.reachedAttackSpot == true && !helper.compareRoomPos(creep.pos,constants.RoomPositions.ATTACKROOMSPOT)) {
        //               creep.moveTo(constants.RoomPositions.ATTACKROOMSPOT);
        //       }
        //       else {
        //               creep.memory.reachedAttackSpot = true;
        //         var  roomController = Game.rooms[constants.RoomNames.ATTACKROOM].find(FIND_STRUCTURES, {
        //             filter: object => (object.structureType == STRUCTURE_CONTROLLER)
        //         });
                
                
                
        //         if (roomController.length > 0) {
        //             if(creep.claimController(roomController[0]) == ERR_NOT_IN_RANGE) {
        //              creep.moveTo(roomController[0]);
        //             }
        //         }
        //       }
	            
	        
          
                
	    }
     
	}
};

module.exports = roleClaimer;