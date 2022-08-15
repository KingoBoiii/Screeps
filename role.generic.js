require('creep.extensions');
require('room.extensions');

const role = {
    
    /** @param {Creep} creep **/
    run: function(creep, workFunction) {
        creep.shouldCreepWork('Harvest', 'Transfer');

        if(!creep.memory.working) {
            const sourceTarget = creep.findEnergySource(); 
            console.log(sourceTarget.resourceType);

            if(creep.pickup(sourceTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE || creep.withdraw(sourceTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sourceTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
            }

            if(creep.harvest(sourceTarget) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sourceTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            if(workFunction(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
    
};

module.exports = roleHarvester;