
var helper = require('helper');
var constants = require('constants');
var roleTower = require('role.tower');
 
var myRoom = {
     run: function(roomName) {
         
          var towers = helper.getTowers(roomName);
            towers.forEach(tower => roleTower.run(tower));
            
          helper.activateLinks(roomName);    
         
     }
    
    
}


module.exports = myRoom;