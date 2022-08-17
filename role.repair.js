require('creep.extensions');
require('room.extensions');

const roleRepair = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.shouldCreepWork('Harvest', 'Repair');

        if(!creep.memory.working) {
            const storage = creep.findStorage(); 
            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            const target = creep.room.findStructureWithLowestHits([STRUCTURE_WALL, STRUCTURE_ROAD]);
            if(target) {
                if(creep.repair(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }

};

module.exports = roleRepair;