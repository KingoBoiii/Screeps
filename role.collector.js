const roleRepair = require('role.repair');

const roleCollector = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.shouldCreepWork('Collect', 'Transfer');

        // const energyBelowCapacity = creep.room.energyAvailable < creep.room.energyCapacityAvailable;

        if(creep.memory.working) {
            const storage = creep.findStorage();
            if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            const target = creep.findHarvestingContainer();
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }

};

module.exports = roleCollector;