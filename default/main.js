var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleGuard = require('role.guard');
var roleTower = require('role.tower');
var roleSpawn = require('role.spawn');
var roleHarvester2 = require('role.harvester2');
var roleTransferer = require('role.transferer');

var helper = require('helper');
var constants = require('constants');

module.exports.loop = function () {
    
    helper.healTowers();
    
    helper.clearMemory();
    
    roleSpawn.run(Game.spawns[constants.SpawnNames.MAINSPAWN])
   
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.memory.role == constants.RoleNames.HARVESTER) {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == constants.RoleNames.HARVESTER2) {
            roleHarvester2.run(creep);
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
        else if(creep.memory.role == constants.RoleNames.GUARD) {
            roleGuard.run(creep);
        }
    }
    
    var towers = helper.getTowers();
    
    towers.forEach(tower => roleTower.run(tower));
    
 
}