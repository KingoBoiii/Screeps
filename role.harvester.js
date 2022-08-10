const { shouldCreepWork } = require('functions');
const roleRepair = require('role.repair');

const roleHarvester = {
    
    run: function(creep) {
        creep.memory.working = shouldCreepWork(creep, 'Harvest', 'Transfer');

        const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        if(target) {
            if(!creep.memory.working) {
                const sourceTarget = creep.pos.findClosestByRange(FIND_SOURCES);
                if(creep.harvest(sourceTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else {
                if(target) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        } else {
            roleRepair.run(creep);
        }
    }
    
};

module.exports = roleHarvester;