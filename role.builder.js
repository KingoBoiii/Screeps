require('creep.extensions');
const roleRepair = require('role.repair');

const roleBuilder = {
    
    run: function(creep) {
        creep.shouldCreepWork('Harvest', 'Build');

        const target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
            filter: (constructionSite) => {
                return constructionSite.progress < constructionSite.progressTotal;
            }
        });

        if(target) {
            if(creep.memory.working) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                const sourceTarget = creep.findEnergySource();
                if(creep.pickup(sourceTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                if(creep.harvest(sourceTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        } else {
            roleRepair.run(creep);
        }
    }
    
};

module.exports = roleBuilder;