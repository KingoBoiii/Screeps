require('creep.extensions');
require('room.extensions');
const roleBuilder = require('role.builder');

const roleHarvester = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        creep.shouldCreepWork('Harvest', 'Transfer');

        const target = creep.findStructureWithLowestEnergy();
        if(target) {
            if(!creep.memory.working) {
                const sourceTarget = creep.findEnergySource(); 

                if(creep.pickup(sourceTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE || creep.withdraw(sourceTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                if(creep.harvest(sourceTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } else {
            roleBuilder.run(creep);
        }
    }
    
};

module.exports = roleHarvester;