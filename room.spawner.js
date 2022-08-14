const { getBodyPartsCost } = require('functions');

const spawner = {

    spawn: function(room, name, role, bodyParts, defaultTarget = 0, spawnName = 'Spawn1', showSpawning = false) {
        const bodyPartsCost = getBodyPartsCost(bodyParts);
        if(room.energyAvailable < bodyPartsCost) {
            return;
        }

        const target = _.get(room.memory, ['census', role], defaultTarget);
        
        var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);

        if(creeps.length < target) {
            var newName = name + Game.time;
            Game.spawns[spawnName].spawnCreep(bodyParts, newName, {memory: {role: role}});
        }

        if(Game.spawns[spawnName].spawning && showSpawning) {
            var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
            Game.spawns[spawnName].room.visual.text('🛠️' + spawningCreep.memory.role, Game.spawns[spawnName].pos.x + 1, Game.spawns[spawnName].pos.y,{align: 'left', opacity: 0.8});
        }
    }

}

module.exports = spawner;