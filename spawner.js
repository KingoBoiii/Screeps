const spawner = {

    spawn: function(min, name, role, bodyParts, spawnName = 'Spawn1', showSpawning = false) {
        var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);

        if(creeps.length < min) {
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