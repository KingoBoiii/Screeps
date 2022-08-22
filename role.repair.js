require('creep.extensions');
require('room.extensions');

const roleRepair = {

    /** @param {Creep} creep **/
    runStructures: function(creep, structures) {
        creep.shouldCreepWork('Harvest', 'Repair');

        if(!creep.memory.working) {
            const storage = creep.findStorage(); 
            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            const target = creep.room.findStructureWithLowestHits(structures);
            if(target) {
                if(creep.repair(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    },

    /** @param {Creep} creep **/
    run: function(creep) {
        this.runStructures(creep, [STRUCTURE_CONTAINER, STRUCTURE_WALL, STRUCTURE_ROAD]); // 
    }

};

module.exports = roleRepair;