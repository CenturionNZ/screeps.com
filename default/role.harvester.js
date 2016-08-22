var helper = require('helper');
var constants = require('constants');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var secondRoom = Game.rooms[constants.RoomNames.SECONDROOM];
        
        if (creep.memory.harvestSourceId == null) {
            creep.memory.harvestSourceId = '579fa9e80700be0674d301b3';
        }
        

        //ASSIGN TASKS

        if(creep.carry.energy == 0) {
            if (creep.memory.task != constants.CreepTasks.HARVEST) {
                creep.memory.task = constants.CreepTasks.HARVEST; 
                creep.say('harvesting');
            }
	    }
	    else if(creep.carry.energy  == creep.carryCapacity) {
	        if (creep.memory.task != constants.CreepTasks.UPGRADE) {
    	        creep.memory.task = constants.CreepTasks.UPGRADE
    	        creep.say('upgrading');
	        }
	    }
	    
        //ACTION TASKS  
	   if(creep.memory.task == constants.CreepTasks.UPGRADE) {
            if(creep.upgradeController(secondRoom.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(secondRoom.controller);
            }
        }
        else {
            
              if (!creep.memory.reachedAttackSpot == true && !helper.compareRoomPos(creep.pos,constants.RoomPositions.ATTACKROOMSPOT)) {
                      creep.moveTo(constants.RoomPositions.ATTACKROOMSPOT);
                      
                      creep.memory.reachedAttackSpot = true;
              }
              else {
                helper.harvestSource(creep, constants.RoleHarvestSource.HARVESTER, false);
              }
           
        }
	}
};

module.exports = roleHarvester;