import axios from 'axios';

export default async function handler(req, res) {
  const { summonerName } = req.query;

  try {
    // Get encrypted account ID for given summoner name
    const summonerResponse = await axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_API_KEY}`);
    const puuid = summonerResponse.data.puuid;
    console.log(puuid)

    // Get match list for given account ID

    const matchListResponse = await axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${res.data.puuid}/ids?start=0&count=20&api_key=${RIOT_API_KEY}`);
    const matches = matchListResponse.data.matches;
    console.log(matches)
    let totalKda = 0;
    const totalMatches = matches.length;
    console.log(totalMatches)

    // Iterate through each match and calculate KDA for requested summoner
    for (const match of matches) {
      const matchId = match.gameId;
      // const matchResponse = await axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.RIOT_API_KEY}`);
      const matchData = matchListResponse.data;

      let participantId = null;
      for (const participant of matchData.participantIdentities) {
        if (participant.player.puuid === puuid) {
          participantId = participant.participantId;
          break;
        }
      }

      for (const participant of matchData.participants) {
        if (participant.participantId === participantId) {
          const kda = (participant.stats.kills + participant.stats.assists) / participant.stats.deaths;
          totalKda += kda;
        }
      }
    }

    const averageKda = totalKda / totalMatches;
    console.log(averageKda)

    res.status(200).json({ averageKda });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving KDA data' });
  }
}