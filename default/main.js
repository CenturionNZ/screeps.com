var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleGuard = require('role.guard');
var helper = require('helper');
var constants = require('constants');

module.exports.loop = function () {
    
    helper.healTowers();
    
    helper.clearMemory();
    
    if (helper.getCreepsRoleCount(constants.RoleNames.HARVESTER) < constants.MaxCreeps.HARVESTER)
    {
         helper.spawnCreeps(constants.RoleNames.HARVESTER, constants.MaxCreeps.HARVESTER, true, true);
    }
    else
    {
        helper.spawnCreeps(constants.RoleNames.UPGRADER, constants.MaxCreeps.UPGRADER, true, true);
        
        helper.spawnCreeps(constants.RoleNames.BUILDER, constants.MaxCreeps.BUILDER, true, true);
        
        helper.spawnAttackCreeps(constants.RoleNames.GUARD, constants.MaxCreeps.GUARD);
    }
  

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == constants.RoleNames.HARVESTER) {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == constants.RoleNames.UPGRADER) {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == constants.RoleNames.BUILDER) {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == constants.RoleNames.GUARD) {
            roleGuard.run(creep);
        }
    }
}