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
	
	
module.exports.spawnCreeps = function(spawn, roleName, max) {
	    
	    var creepCount = this.getCreepsRoleCount(roleName) ;
	    
	    if (creepCount < max) {
	        
            console.log('Spawning new  ' + roleName + ':' + newName);
	        
	        if (roleName == constants.RoleNames.HARVESTER3) {
	                    if (spawn.canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE]) == 0) {
                            var newName = 	spawm.createCreep( [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, { role: roleName} );
	                    }
	        }
	        else if (roleName == constants.RoleNames.CLAIMER) {
	                    if (spawn.canCreateCreep([CLAIM,MOVE,MOVE,MOVE]) == 0) {
                            var newName = 	spawn.createCreep( [CLAIM,MOVE,MOVE,MOVE], undefined, { role: roleName } );
	                    }
	        }
	        else if (roleName == constants.RoleNames.LINKTRANSFERER) {
	                    if (spawn.canCreateCreep([CARRY,CARRY,MOVE]) == 0) {
                            var newName = 	spawm.createCreep( [CARRY,CARRY,MOVE], undefined, { role: roleName } );
	                    }
	        }
            else {
                    if (spawn.canCreateCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE]) == 0) {
                        var newName = spawn.createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: roleName});
                }
            }
	    }
	}	
	
// module.exports.spawnAttackCreeps = function(spawn, roleName, max) {
	    
// 	    var creepCount = this.getCreepsRoleCount(roleName) ;
	    
// 	    if (creepCount < max) {
//             if(spawn.canCreateCreep([ATTACK,MOVE,TOUGH,TOUGH]) == 0) {
//                   var newName = spawn.createCreep([ATTACK,MOVE,TOUGH,TOUGH], undefined, {role: roleName});
//                  console.log('Spawning new ' + roleName + ':' + newName);
//             }
// 	    }
// 	}	
	
	

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
            filter: object => (object.structureType == STRUCTURE_SPAWN ||  object.structureType == STRUCTURE_EXTENSION) && object.energy < (object.energyCapacity)
        });
        
        return energyStructures;
}

module.exports.getEmptyContainers = function(creep) {
         var energyStructures = creep.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: object => (object.structureType == STRUCTURE_CONTAINER || object.structureType == STRUCTURE_STORAGE)  && _.sum(object.store) < object.storeCapacity
        });
        
        return energyStructures;
}

module.exports.getNearbyEmptyStorage = function(creep) {
         var energyStructures = creep.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: object => object.structureType == STRUCTURE_STORAGE && _.sum(object.store) < object.storeCapacity
        });
        
        return energyStructures;
}

module.exports.getStructuresToRepair = function(creep) {
    
    //get roads
     var repairStructures = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.structureType == STRUCTURE_ROAD && object.hits  < (object.hitsMax / 3)
            });

    
    //get ramparts
    if (repairStructures.length == 0) {
          repairStructures = creep.room.find(FIND_MY_STRUCTURES, {
                filter: object => object.structureType == STRUCTURE_RAMPART && object.hits  < constants.RepairValues.MINRAMPARTHITS
            });
    }
    
    //get walls    
    if (repairStructures.length == 0) {
         repairStructures = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.structureType == STRUCTURE_WALL && object.hits  < constants.RepairValues.MINWALLHITS
            });
    }
    
    //get everything else   
    if (repairStructures.length == 0) {
          repairStructures = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits  < (object.hitsMax / 3) && object.hitsMax <  constants.RepairValues.MAXREPAIRHITS
        });
    } 
    
    return repairStructures;
}

module.exports.getConstructionsSites = function(creep, roomId) {
    
    
    if (roomId == null) {
        var room = creep.room;
    }
    else {
        var room = Game.rooms[roomId];
        
    }
    
    var constructionSites = room.find(FIND_CONSTRUCTION_SITES);
    
    // if (constructionSites.length == 0) {
    //     constructionSites = Game.rooms[constants.RoomNames.SECONDROOM].find(FIND_CONSTRUCTION_SITES);
    // }
    
    return constructionSites;
}

module.exports.getEnemyTargetsInRange = function(creep) {
    var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS,3)
    
    return targets;
}

module.exports.getTowers = function() {
    var towers = Game.rooms[constants.RoomNames.MAINROOM].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        
        return towers;
}

module.exports.harvestSource = function(creep, sourceNumber, harvestFromDrops) {
            
            var droppedEnergy = creep.room.find(FIND_DROPPED_ENERGY);
            
	        if (harvestFromDrops == true && droppedEnergy.length > 0) {
	            if(creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy[0]);
                }
	        }
	        else {
                
                var sources = creep.room.find(FIND_SOURCES);
                
                if (creep.memory.harvestSource == null)
                {
                  creep.memory.harvestSource = 1;
                }
    
                if(creep.harvest(sources[creep.memory.harvestSource]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[creep.memory.harvestSource]);
                }
    
                // if (creep.memory.harvestSource == 0){
                //     creepsAtSourceSpot = creep.room.lookForAt(LOOK_CREEPS, constants.RoomPositions.SOURCE0HARVESTSPOT);
                    
                      
                //     //If a harvester is already harvesting form source, move to waiting spot
                //     if (creep.pos != constants.RoomPositions.SOURCE0HARVESTSPOT && creepsAtSourceSpot.length > 0 && creepsAtSourceSpot[0].name != creep.name && creep.pos != constants.RoomPositions.SOURCE0WAITSPOT) {
                //         creep.moveTo(constants.RoomPositions.SOURCE0WAITSPOT);
                //     }
                //     else {
                    
                //         if(creep.harvest(sources[creep.memory.harvestSource]) == ERR_NOT_IN_RANGE) {
                //             creep.moveTo(sources[creep.memory.harvestSource]);
                //         }
                //     }
                
                // }
                // else {
                //          if(creep.harvest(sources[creep.memory.harvestSource]) == ERR_NOT_IN_RANGE) {
                //             creep.moveTo(sources[creep.memory.harvestSource]);
                //         }
                // }
	        }
           
}

module.exports.withdrawEnergyFromContainer = function(creep, harvestFromDrops) {
      
            var droppedEnergy = creep.room.find(FIND_DROPPED_ENERGY);
            
	        if (harvestFromDrops == true && droppedEnergy.length > 0) {
	            if(creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy[0]);
                }
	        }
	        else {
	            
	              containers = creep.room.find(FIND_STRUCTURES, {
                filter: object => (object.structureType == STRUCTURE_CONTAINER || object.structureType == STRUCTURE_STORAGE) && _.sum(object.store) >= 50
            });
                
                if (creep.memory.withdrawSourceId == null)
                {
                    creep.memory.withdrawSourceId  = '57b05cf91300d2aa60b56a7f';
                    var test = Game.getObjectById(creep.memory.withdrawSourceId);
                    
                    if (test != null && _.sum(test.store) == 0)
        	        {
        	              var source  = module.exports.rand(containers.length);
                            var container = containers[source];
                            
                            if (container != null) {
                                creep.memory.withdrawSourceId = containers[source].id;
                            }
        	            
        	        }
                  
                }
                var object = Game.getObjectById(creep.memory.withdrawSourceId);
                if (object != null && _.sum(object.store) > 0)
    	        {
    	             if(creep.withdraw(object, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(object);
    	            }
    	        }
    	        else {
    	           creep.memory.withdrawSourceId  = null;
    	        }
        
               
	        }
    
}

module.exports.withdrawEnergy = function(creep, harvestFromDrops) {
       var droppedEnergy = creep.room.find(FIND_DROPPED_ENERGY);
            
	        if (harvestFromDrops == true && droppedEnergy.length > 0) {
	            if(creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy[0]);
                }
	        }
	        else {
	            
	           var object = Game.getObjectById(constants.ObjectIds.STORAGE)
                
    		if (object != null) {
            		 if(creep.withdraw(object, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            				creep.moveTo(object);
            			}
            		}
            }
}

module.exports.compareRoomPos = function(pos1, pos2) {

    if (pos1.x == pos2.x && pos1.y == pos2.y && pos1.roomName == pos2.roomName) {
        return true;
    }
    else {
        return false;
    }
    
}
            
