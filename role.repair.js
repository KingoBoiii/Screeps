const { shouldCreepWork } = require('functions');

const roleRepair = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.memory.working = shouldCreepWork(creep, 'Harvest', 'Repair');

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