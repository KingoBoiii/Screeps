const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleCollector = require('role.collector');
const roleRampartRepair = require('role.rampart.repair');
const spawner = require('room.spawner');
require('room.extensions');

const ROLES = require('./roles');
const Role = require('./role.base');
const RoleRepairer = require('./role.repairer');

class CreepManager {

    constructor() {
        this.creeps = Game.creeps;
    }

    spawnCreeps() {
        const worker = [WORK,CARRY,MOVE]; // Build cost: 200
        const bigWorker = [WORK,WORK,CARRY,CARRY,MOVE,MOVE]; // Build cost: 550
    
        const harvesterBodyParts = [WORK,WORK,WORK,WORK,WORK,MOVE]; // Build cost: 550
        const collectorBodyParts = [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]; // Build cost: 300
    
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

    run() {
        for(const name in this.creeps) {
            var creep = Game.creeps[name];
            const worker = new Role();
    
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
                Role.castTo(new RoleRepairer(), worker).work(creep);
            }
            if(creep.memory.role == ROLES.RampartRepair) {
                roleRampartRepair.run(creep);
            }
        }
    }

    clearDeadCreeps() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }

}

module.exports = CreepManager;

