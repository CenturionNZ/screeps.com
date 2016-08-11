var constants = require('constants');

module.exports.clearMemory = function() {

        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non existing creep memory:' + name);
            }
        }
	}

module.exports.rand = function(max) {

	  var ran_unrounded=Math.random()*max;
      var ran_number=Math.floor(ran_unrounded);
      
      return ran_number
	}
	
module.exports.getCreepsRoleCount = function(roleName) {
    var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == roleName);
    
    return creeps.length;
}
	
	
module.exports.spawnCreeps = function(roleName, max, enableSmallCreeps, enableBigCreeps) {
	    
	    var creepCount = this.getCreepsRoleCount(roleName) ;
	    
	    if (creepCount < max) {
            if (enableBigCreeps && Game.spawns['Spawn1'].canCreateCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE]) == 0) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: roleName});
                console.log('Spawning new Big ' + roleName + ':' + newName);
            }
            else if(enableSmallCreeps && Game.spawns['Spawn1'].canCreateCreep([WORK,CARRY,MOVE]) == 0) {
                  var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: roleName});
                 console.log('Spawning new ' + roleName + ':' + newName);
            }
	    }
	}	
	
module.exports.spawnAttackCreeps = function(roleName, max) {
	    
	    var creepCount = this.getCreepsRoleCount(roleName) ;
	    
	    if (creepCount < max) {
            if(Game.spawns['Spawn1'].canCreateCreep([ATTACK,MOVE,TOUGH,TOUGH]) == 0) {
                  var newName = Game.spawns['Spawn1'].createCreep([ATTACK,MOVE,TOUGH,TOUGH], undefined, {role: roleName});
                 console.log('Spawning new ' + roleName + ':' + newName);
            }
	    }
	}	
	
	

module.exports.healTowers = function() {

  var tower = Game.getObjectById('943233ea25da0a3d99dae0a1');
    if (tower) {
        
        var closestDamagedStruc = tower.pos.findClosestByRange(FIND_STRUCTURES, { filter: (structure) => structure.hits < structure.hitsMax});
        
        if (closestDamagedStruc) {
            tower.repair(closestDamagedStruc);
        }
        
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }
}	

module.exports.getEmptyEnergyStructures = function(creep) {
         var energyStructures = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.energy < (object.energyCapacity)
        });
        
        return energyStructures;
}

module.exports.getStructuresToRepair = function(creep) {
    var repairStructures = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < (object.hitsMax / 3) && object.hits  < constants.RepairValues.MAXREPAIRHITS
        });
        
        return repairStructures;
}

module.exports.getConstructionsSites = function(creep) {
    var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
    
    return constructionSites;
}

module.exports.getEnemyTargetsInRange = function(creep) {
    var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS,3)
    
    return targets;
}

