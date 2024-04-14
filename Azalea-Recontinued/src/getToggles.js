export function getToggle(cmdname) {
    let score = 0;
    try {
        let objective = world.scoreboard.getObjective("cmdtoggles");
        let participant = objective.getParticipants()
            .find(participantData => participantData.displayName == cmdname);
        if (participant) score = objective.getScore(participant);
    } catch {
        score = 0;
    }
}