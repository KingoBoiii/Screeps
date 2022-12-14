require('creep.extensions');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.shouldCreepWork('Harvest', 'Upgrade');

        if(creep.memory.working) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            const storage = creep.findStorage(); 
            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleUpgrader;