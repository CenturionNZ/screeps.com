var helper = require('helper');
var constants = require('constants');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.carry.energy == 0) {
            if (creep.memory.task != constants.CreepTasks.HARVEST) {
                creep.memory.task = constants.CreepTasks.HARVEST
                creep.say('harvesting');
            }
	    }
	    else if (creep.memory.task == constants.CreepTasks.HARVEST) {
	        if (creep.carry.energy == creep.carryCapacity) {
	            creep.memory.task = null;
	        }
	        
	    }
	    else if(creep.carry.energy > 0) {
	        if (creep.memory.task != constants.CreepTasks.UPGRADE) {
    	        creep.memory.task = constants.CreepTasks.UPGRADE
    	        creep.say('upgrading');
	        }
	    }

	    if(creep.memory.task == constants.CreepTasks.UPGRADE) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            
            if (creep.memory.harvestSource == null)
            {
                if (sources.length > 1)
                {
                    creep.memory.harvestSource = 1
                }
                //creep.memory.harvestSource = helper.rand(sources.length)
            }
            
            if(creep.harvest(sources[creep.memory.harvestSource]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.harvestSource]);
            }
        }
	}
};

module.exports = roleUpgrader;