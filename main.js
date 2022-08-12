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

    _.forEach(Game.rooms, function(room) {
        if(room && room.controller && room.controller.my) {
            spawner.spawn(room, 'Harvester', ROLES.Harvester, bigWorker);
            spawner.spawn(room, 'Upgrader', ROLES.Upgrader, worker);
            spawner.spawn(room, 'Builder', ROLES.Builder, worker);
            spawner.spawn(room, 'Repair', ROLES.Repair, worker);
        }
    });


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