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
	
module.exports.getCreepsRoleCount = function(roleName, roomName, countGlobal) {
    
    var creepTotal = 0;
    
    if (!countGlobal) {
         var creeps = Game.rooms[roomName].find(FIND_MY_CREEPS, {
        filter: creep => creep.memory.role == roleName
        });
        
        creepTotal = creeps.length;
    }
    else {
        for (var rName in Game.rooms){
            var creeps = Game.rooms[rName].find(FIND_MY_CREEPS, {
                filter: creep => creep.memory.role == roleName
            });
            
            if (creeps) {
                creepTotal = creepTotal + creeps.length;
            }
        
        }
    }
    
   
    
    return creepTotal;
}
	
	
module.exports.spawnCreeps = function(spawn, roleName, max, countGlobal) {
        
	    var creepCount = this.getCreepsRoleCount(roleName, spawn.room.name, countGlobal) ;
	    if (creepCount < max) {
	        
	        if (roleName == constants.RoleNames.HARVESTER) {
	                    if (spawn.canCreateCreep(constants.CreepBodys[spawn.room.name][roleName]) == 0) {
                            var newName = 	spawn.createCreep( constants.CreepBodys[spawn.room.name][roleName], undefined, { role: roleName, baseRoom: spawn.room.name} );
	                    }
	        }
	        else if (roleName == constants.RoleNames.HARVESTER3) {
	                    if (spawn.canCreateCreep(constants.CreepBodys[spawn.room.name][roleName]) == 0) {
                            var newName = 	spawn.createCreep( constants.CreepBodys[spawn.room.name][roleName], undefined, { role: roleName, baseRoom: spawn.room.name} );
	                    }
	        }
	        else if (roleName == constants.RoleNames.CLAIMER) {
	                    if (spawn.canCreateCreep(constants.CreepBodys[spawn.room.name][roleName]) == 0) {
                            var newName = 	spawn.createCreep( constants.CreepBodys[spawn.room.name][roleName], undefined, { role: roleName , baseRoom: spawn.room.name} );
	                    }
	        }
	        else if (roleName == constants.RoleNames.LINKTRANSFERER) {
	                    if (spawn.canCreateCreep(constants.CreepBodys[spawn.room.name][roleName]) == 0) {
                            var newName = 	spawn.createCreep( constants.CreepBodys[spawn.room.name][roleName], undefined, { role: roleName , baseRoom: spawn.room.name} );
	                    }
	        }
            else {
                    if (spawn.canCreateCreep(constants.CreepBodys[spawn.room.name].Default) == 0) {
                        var newName = spawn.createCreep(constants.CreepBodys[spawn.room.name].Default, undefined, {role: roleName, baseRoom: spawn.room.name});
                }
            }
	        
	        if (newName) {
                console.log('Spawning new  ' + roleName + ':' + newName);
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
	
	



module.exports.getEmptyEnergyStructures = function(creep, roomName) {
    
     var room = creep.room;
    
    if (roomName) {
        room = Game.rooms[roomName];
    }
    
     var energyStructures = creep.room.find(FIND_STRUCTURES, {
        filter: object => (object.structureType == STRUCTURE_SPAWN ||  object.structureType == STRUCTURE_EXTENSION ||  object.structureType == STRUCTURE_TOWER) && object.energy < (object.energyCapacity)
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

module.exports.getStructuresToRepair = function(creep, roomId) {
    
    var room = creep.room;
    
    if (roomId) {
        room = Game.rooms[roomId];
    }
    
    //get roads
     var repairStructures = room.find(FIND_STRUCTURES, {
                filter: object => object.structureType == STRUCTURE_ROAD && object.hits  < (object.hitsMax / 3)
            });

    
    //get ramparts
    if (repairStructures.length == 0) {
          repairStructures = room.find(FIND_MY_STRUCTURES, {
                filter: object => object.structureType == STRUCTURE_RAMPART && object.hits  < constants.RepairValues[room.name].MINRAMPARTHITS
            });
    }
    
    //get walls    
    if (repairStructures.length == 0) {
         repairStructures = room.find(FIND_STRUCTURES, {
                filter: object => object.structureType == STRUCTURE_WALL && object.hits  < constants.RepairValues[room.name].MINWALLHITS
            });
    }
    
    //get everything else   
    if (repairStructures.length == 0) {
          repairStructures = room.find(FIND_STRUCTURES, {
            filter: object => object.hits  < (object.hitsMax / 3) && object.hitsMax <  constants.RepairValues[room.name].MAXREPAIRHITS
        });
    } 
    
    return repairStructures;
}

module.exports.getConstructionsSites = function(creep, roomId) {
    
    
    if (roomId == null) {
        var room = Game.rooms['E49N54'];
    }
    else {
        var room = Game.rooms[roomId];
        
    }
    
    var constructionSites = room.find(FIND_CONSTRUCTION_SITES);
    
    // if (constructionSites.length == 0) {
    //     for (var roomName in Game.rooms){
        
    //         var room2 = Game.rooms[roomName];
            
    //         if (room2.name != room.name) {
    //             var sites = room2.find(FIND_CONSTRUCTION_SITES);
            
    //             if (sites.length > 0) {
    //                 constructionSites = sites;
    //                 break;
    //             }
    //         }
           
    //     }
    
    // }
   
    // var constructionSites = room.find(FIND_CONSTRUCTION_SITES);
    
    // if (constructionSites.length == 0) {
    //     constructionSites = Game.rooms[constants.RoomNames.MAINROOM].find(FIND_CONSTRUCTION_SITES);
    // }
    
    return constructionSites;
}

module.exports.getEnemyTargetsInRange = function(creep) {
    var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS,3)
    
    return targets;
}

module.exports.getTowers = function(roomName) {
    var towers = Game.rooms[roomName].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        
        return towers;
}

module.exports.renewCreep = function(creep) {
    
    if (creep.memory.baseRoom == constants.RoomNames.MAINROOM) {
	       if (creep.pos != constants.RoomPositions.RENEWCREEPSPOT ) {
	            creep.moveTo(constants.RoomPositions.RENEWCREEPSPOT);
	       }
    }
    else if (creep.memory.baseRoom == constants.RoomNames.SECONDROOM) {
	       if (creep.pos != constants.RoomPositions.RENEWCREEPSPOT2 ) {
	            creep.moveTo(constants.RoomPositions.RENEWCREEPSPOT2);
	       }
    }
}


module.exports.setWithdrawSource = function(creep) {
    
  var sourceId = constants.WithdrawSourceId[creep.memory.baseRoom][creep.name];
    
    if (!sourceId) {
        var sourceId = constants.WithdrawSourceId[creep.memory.baseRoom][creep.memory.role];
    }
    
    if (!sourceId) {
        var sourceId = constants.WithdrawSourceId[creep.memory.baseRoom].Default;
    }
    
    
    creep.memory.withdrawSourceId = sourceId;
}


module.exports.setHarvestSource = function(creep) {
    
    var sourceId = constants.HarvestSourceId[creep.memory.baseRoom][creep.name];
    
    if (!sourceId) {
        var sourceId = constants.HarvestSourceId[creep.memory.baseRoom][creep.memory.role];
    }
    
    if (!sourceId) {
        var sourceId = constants.HarvestSourceId[creep.memory.baseRoom].Default;
    }
    
    
    creep.memory.harvestSourceId = sourceId;
}

module.exports.setTransferSource = function(creep) {
    
    var sourceId = constants.TransferSourceId[creep.memory.baseRoom][creep.name];
    
    if (!sourceId) {
        var sourceId = constants.TransferSourceId[creep.memory.baseRoom][creep.memory.role];
    }
    
    if (!sourceId) {
        var sourceId = constants.TransferSourceId[creep.memory.baseRoom].Default;
    }
    
    
    creep.memory.transferSourceId = sourceId;
}

module.exports.harvestSource = function(creep) {
            
   if (creep.memory.harvestSourceId == null ) {
	                  
        var sources = creep.room.find(FIND_SOURCES);
        
        if (creep.memory.harvestSource == null)
        {
          creep.memory.harvestSourceId = sources[1].id;
        }
    }
    
    var sourceObject = Game.getObjectById(creep.memory.harvestSourceId)
  

    if(creep.harvest(sourceObject) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sourceObject);
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
	             
                if (creep.memory.withdrawSourceId == null)
                {
                    creep.memory.withdrawSourceId  = constants.ObjectIds.STORAGE;
                }
	            
	           var object = Game.getObjectById(creep.memory.withdrawSourceId)
                
    		  if (object != null && _.sum(object.store) >= 100)
        	        {
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

module.exports.doIOwnRoom = function(roomName) {
    var ownRoom = false;
     for (var name in Game.rooms){
         if (name == roomName && Game.rooms[name].controller && Game.rooms[name].controller.owner && Game.rooms[name].controller.owner.username == 'CenturionNZ') {
             ownRoom = true;
             break;
         }
     }
     
     return ownRoom;
}
            
