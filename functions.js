const functions = {

    /** @param {string[]} segments **/
    getBodyPartsCost: function(bodyParts) {
        let bodyPartsCost = 0;
        _.forEach(bodyParts, function(bodyPart) {
            bodyPartsCost += BODYPART_COST[bodyPart];
        });
        return bodyPartsCost;
    }

}
    
module.exports = functions;