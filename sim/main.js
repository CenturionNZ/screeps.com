var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleAttacker = require('role.attacker');
var roleTower = require('role.tower');
var roleSpawn = require('role.spawn');
var roleHarvester2 = require('role.harvester2');
var roleHarvester3 = require('role.harvester3');
var roleTransferer = require('role.transferer');
var roleLinkTransferer = require('role.linkTransferer');
var roleClaimer = require('role.claimer');

var helper = require('helper');
var constants = require('constants');

module.exports.loop = function () {
    
  
    
    helper.healTowers();
    
    //helper.clearMemory();
    
    for (var spawnName in Game.spawns){
	         roleSpawn.run(Game.spawns[spawnName]);
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
   
        // if (name == 'Gabriella') {
        //     creep.moveTo(47,44 );
        // }
        // else {

            if(creep.memory.role == constants.RoleNames.HARVESTER) {
                roleHarvester.run(creep);
            }
            else if(creep.memory.role == constants.RoleNames.HARVESTER2) {
                roleHarvester2.run(creep);
            }
            else if(creep.memory.role == constants.RoleNames.HARVESTER3) {
                roleHarvester3.run(creep);
            }
            else if(creep.memory.role == constants.RoleNames.TRANSFERER) {
               roleTransferer.run(creep);
            }
            else if(creep.memory.role == constants.RoleNames.UPGRADER) {
                roleUpgrader.run(creep);
            }
            else if(creep.memory.role == constants.RoleNames.BUILDER) {
                roleBuilder.run(creep);
            }
            else if(creep.memory.role == constants.RoleNames.ATTACKER) {
                roleAttacker.run(creep);
            }
            else if(creep.memory.role == constants.RoleNames.LINKTRANSFERER) {
               roleLinkTransferer.run(creep);
            }
            else if(creep.memory.role == constants.RoleNames.CLAIMER) {
                roleClaimer.run(creep);
            }
        // }
    }
    
    // var towers = helper.getTowers();
    
    // towers.forEach(tower => roleTower.run(tower));
    
    // var sendingLink = Game.getObjectById('57b44a96eead0db92ed6d3aa');
    // var receivingLink = Game.getObjectById('57b444508f645b7a4a9f4dd9');
    
    // if (sendingLink != null && receivingLink != null && sendingLink.cooldown == 0 && sendingLink.energy >= 50 && receivingLink.energy < receivingLink.energyCapacity) {
    //     sendingLink.transferEnergy(receivingLink);
    // }
    
    for (var roomName in Game.rooms){
        
            if (roomName == constants.RoomNames.SECONDROOM) {
                
                  Game.rooms[roomName].createConstructionSite(48, 44, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(47, 43, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(46, 42, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(45, 41, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(44, 40, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(43, 39, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(43, 38, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(42, 37, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(41, 36, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(40, 36, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(39, 36, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(38, 36, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(37, 36, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(36, 35, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(35, 34, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(34, 33, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(33, 33, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(32, 33, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(31, 33, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(30, 33, STRUCTURE_ROAD);
                Game.rooms[roomName].createConstructionSite(29, 34, STRUCTURE_ROAD);
                
               // Game.rooms['sim'].pos[25,43].ConstructionSite

            }
            
           
    }
    
 
}