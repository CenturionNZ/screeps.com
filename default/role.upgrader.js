var helper = require('helper');
var constants = require('constants');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
                
 
       
        helper.setWithdrawSource(creep)
        helper.setHarvestSource(creep)

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
            if (creep.memory.harvestSourceId) {
    	        if (creep.memory.task != constants.CreepTasks.HARVEST) {
                    creep.memory.task = constants.CreepTasks.HARVEST 
                    creep.say('harvesting');
    	        }
            }
            else {
    	        if (creep.memory.task != constants.CreepTasks.WITHDRAW) {
                    creep.memory.task = constants.CreepTasks.WITHDRAW 
                    creep.say('withdrawing');
    	        }
            }
	    }
	    else if (creep.memory.task == constants.CreepTasks.HARVEST) {
	        if (_.sum(creep.carry) == creep.carryCapacity) {
	            creep.memory.task = null;
	        }
	    }
	    else if(creep.carry.energy > 0) {
	        if (creep.memory.task != constants.CreepTasks.UPGRADE) {
    	        creep.memory.task = constants.CreepTasks.UPGRADE
    	        creep.say('upgrading');
	        }
	    }
	    
	    
        //ACTION TASKS  
	    if(creep.memory.task == constants.CreepTasks.RENEW ) {
	 	      helper.renewCreep(creep); 
	    }
        else if(creep.memory.task == constants.CreepTasks.UPGRADE) {
            
            if (creep.memory.controllerId) {
                var upgradecontroller = Game.getObjectById(upgradecontroller);
            }
            
            if (!upgradecontroller) {
                var upgradecontroller = creep.room.controller;
            }
            
            if(creep.upgradeController(upgradecontroller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(upgradecontroller);
            }
        }
   else if(creep.memory.task == constants.CreepTasks.WITHDRAW) {
            
            helper.withdrawEnergy(creep, false);
        }
        else if(creep.memory.task == constants.CreepTasks.HARVEST) {
            
            helper.harvestSource(creep);
        }
	}
};

module.exports = roleUpgrader;