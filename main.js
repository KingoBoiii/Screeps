const ROLES = {
    Harvester: 'harvester',
    Upgrader: 'upgrader',
    Builder: 'builder',
    Repair: 'repair',
    RampartRepair: 'rampartRepair'
};

const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRepair = require('role.repair');
const roleRampartRepair = require('role.rampart.repair');
const spawner = require('room.spawner');
require('room.extensions');

function clearMemory() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
}

module.exports.loop = function () {
    
    clearMemory();
    
        var tower = Game.getObjectById('0dcf6099edc0600');
    if(tower) {
        // var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (structure) => structure.hits < structure.hitsMax
        // });
        // if(closestDamagedStructure) {
        //     tower.repair(closestDamagedStructure);
        // }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    const worker = [WORK,CARRY,MOVE]; // Build cost: 200
    const bigWorker = [WORK,WORK,CARRY,CARRY,MOVE,MOVE]; // Build cost: 550

    _.forEach(Game.rooms, function(room) {
        if(room && room.controller && room.controller.my) {
            const bodyParts = room.getBodyPartsBySegments(worker);

            const havesterCount = _.sum(Game.creeps, (creep) => {
                return creep.memory.role == ROLES.Harvester;
            });
            spawner.spawn(room, 'Harvester', ROLES.Harvester, bodyParts);
            if(havesterCount > 1) {
                spawner.spawn(room, 'Upgrader', ROLES.Upgrader, bodyParts);
                spawner.spawn(room, 'Builder', ROLES.Builder, bodyParts);
                spawner.spawn(room, 'Repair', ROLES.Repair, bigWorker);
                spawner.spawn(room, 'RampartRepair', ROLES.RampartRepair, worker);
            }
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
        if(creep.memory.role == ROLES.RampartRepair) {
            roleRampartRepair.run(creep);
        }
    }
    
}