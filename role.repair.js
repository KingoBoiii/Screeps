const { shouldCreepWork } = require('functions');

const roleRepair = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.memory.working = shouldCreepWork(creep, 'Harvest', 'Repair');
        // if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
        //     creep.memory.repairing = false;
        //     creep.say('🔄 harvest');
        // }
        // if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
        //     creep.memory.repairing = true;
        //     creep.say('🚧 repair');
        // }

        if(!creep.memory.working) {
            var sourceTarget = creep.pos.findClosestByRange(FIND_SOURCES);

            if(creep.harvest(sourceTarget) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sourceTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.hits < structure.hitsMax;
                }
            });
            
            if(target) {
                if(creep.repair(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }

};

module.exports = roleRepair;