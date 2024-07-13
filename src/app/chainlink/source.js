const url = 'https://league-of-legends-esports.p.rapidapi.com/schedule?leagueId=98767991299243165%252C99332500638116286%252C98767991302996019';
console.log(`HTTP GET Request to ${url}`);


const response = await Functions.makeHttpRequest({
    url: url,
    method: 'GET',
    headers: {
      'x-rapidapi-key': '127c64da5fmsh6599ba8bd9bae2ap10960djsnde33c2b25cf4',
      'x-rapidapi-host': 'league-of-legends-esports.p.rapidapi.com',
    }
});

// console.log(response);

// if (!response.error) 
// {
//     throw new Error(`HTTP error! Status: ${response.status}`);
// }

// const data = await response.json();
const data = response["data"];
//  console.log(data); 

// extract the winner for a given match ID
const events = data.data.schedule.events;
console.log(events); 
const matchId = args[0];
// console.log(matchId); 
// const matchId = "112352881166864380";

var i;

i = 0;
  // Iterate through the events to find the match with the given ID
while(events[i]) 
  {
    if (events[i].match.id === matchId) 
    {

      const teams = events[i].match.teams;      
      // Iterate through the teams to find the one with outcome "win"
      for (let i = 0; i < teams.length; i++) 
      {
        if (teams[i].result.outcome === "win") 
        {
         console.log(`The winning team index for match ID ${matchId} is ${i}`);
        return Functions.encodeUint256(Math.round(i * 100));        
        }
      }
    }
    i++;      
  }
  console.log(`Did not find match ID`);
  return Functions.encodeUint256(Math.round(999 * 100));  
