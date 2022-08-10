const ROLES = {
    Harvester: 'harvester',
    Upgrader: 'upgrader',
    Builder: 'builder',
    Repair: 'repair'
};

const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRepair = require('role.repair');
const spawner = require('spawner');

function clearMemory() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
}

module.exports.loop = function () {
    
    clearMemory();

    const worker = [WORK,CARRY,MOVE]; // Build cost: 200
    const bigWorker = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE]; // Build cost: 550
    const fastCarrier = [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]; // Build cost: 300

    // spawner.spawn(3, 'Harvester', ROLES.Harvester, worker);
    spawner.spawn(2, 'BigHarvester', ROLES.Harvester, bigWorker);
    spawner.spawn(3, 'Upgrader', ROLES.Upgrader, worker);
    spawner.spawn(3, 'Builder', ROLES.Builder, worker);
    spawner.spawn(1, 'Repair', ROLES.Repair, fastCarrier);

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
        if(creep.memory.role == ROLES.Repair) {
            roleRepair.run(creep);
        }    
    }
    
}