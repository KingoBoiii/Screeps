require('creep.extensions');
require('room.extensions');

const roleRampartRepair = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.shouldCreepWork('Harvest', 'Repair');

        if(!creep.memory.working) {
            const sourceTarget = creep.findEnergySource();

            if(creep.pickup(sourceTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sourceTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            if(creep.harvest(sourceTarget) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sourceTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            const target = creep.room.findStructureWithLowestHits([STRUCTURE_RAMPART]);
            if(target) {
                if(creep.repair(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }

}

module.exports = roleRampartRepair;

