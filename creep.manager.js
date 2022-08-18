const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleRepair = require('role.repair');
const roleBuilder = require('role.builder');
const roleCollector = require('role.collector');
const roleRampartRepair = require('role.rampart.repair');
const spawner = require('room.spawner');
require('room.extensions');

const ROLES = require('./roles');

function CreepManager() {
    this.creeps = Game.creeps;

    this.spawnCreeps = function() {
        const worker = [WORK,CARRY,MOVE]; // Build cost: 200
        const bigWorker = [WORK,WORK,CARRY,CARRY,MOVE,MOVE]; // Build cost: 550
    
        const harvesterBodyParts = [WORK,WORK,WORK,WORK,WORK,MOVE]; // Build cost: 550
        const collectorBodyParts = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]; // Build cost: 400
    
        _.forEach(Game.rooms, function(room) {
            if(room && room.controller && room.controller.my) {
                const bodyParts = room.getBodyPartsBySegments(worker);
    
                const havesterCount = _.sum(Game.creeps, (creep) => creep.memory.role == ROLES.Harvester);
                const collectorCount = _.sum(Game.creeps, (creep) => creep.memory.role == ROLES.Collector);
                spawner.spawn(room, 'Harvester', ROLES.Harvester, harvesterBodyParts);
                spawner.spawn(room, 'Collector', ROLES.Collector, collectorBodyParts);
                spawner.spawn(room, 'Builder', ROLES.Builder, bodyParts);
                if(havesterCount > 1 && collectorCount > 1) {
                    spawner.spawn(room, 'Upgrader', ROLES.Upgrader, bodyParts);
                    spawner.spawn(room, 'Repair', ROLES.Repair, bodyParts);
                    spawner.spawn(room, 'RampartRepair', ROLES.RampartRepair, worker);
                }
            }
        });
    }

    this.run = function() {
        for(const name in this.creeps) {
            var creep = Game.creeps[name];
    
            if(creep.memory.role == ROLES.Harvester) {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == ROLES.Collector) {
                roleCollector.run(creep);
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

    this.clearDeadCreeps = function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }
}

module.exports = CreepManager;

