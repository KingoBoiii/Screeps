const { shouldCreepWork } = require('functions');
const roleRepair = require('role.repair');

const roleBuilder = {
    
    run: function(creep) {
        creep.memory.working = shouldCreepWork(creep, 'Harvest', 'Build');

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
                const sourceTarget = creep.pos.findClosestByRange(FIND_SOURCES);
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