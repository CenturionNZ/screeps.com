var helper = require('helper');
var constants = require('constants');


var roleGuard = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var enemyTargets = helper.getEnemyTargetsInRange(creep);
        
        if (enemyTargets.length > 0) {
              if(creep.attack(enemyTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(enemyTargets[0]);
                }
        }
        else {
            
            if (creep.pos != constants.RoomPositions.GUARDPOST1) {
                creep.moveTo(constants.RoomPositions.GUARDPOST1);
            }
        }
	}
};

module.exports = roleGuard;