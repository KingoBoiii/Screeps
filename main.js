const ROLES = {
    Harvester: 'harvester',
    Upgrader: 'upgrader',
    Builder: 'builder'
};

const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const spawner = require('spawner');

module.exports.loop = function () {
    
    spawner.spawn(3, 'Harvester', ROLES.Harvester, [WORK,CARRY,MOVE]);
    spawner.spawn(1, 'Upgrader', ROLES.Upgrader, [WORK,CARRY,MOVE]);
    spawner.spawn(2, 'Builder', ROLES.Builder, [WORK,CARRY,MOVE]);

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        if(creep.memory.role == ROLES.Harvester) {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == ROLES.Upgrader) {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == ROLES.Builder) {
            roleBuilder.run(creep);
        }
    }
    
}