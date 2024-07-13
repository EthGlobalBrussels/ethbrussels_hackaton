"use client"
"use client";

import React, { useState, useEffect } from 'react';

const TournamentList = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const url = 'https://league-of-legends-esports.p.rapidapi.com/schedule?leagueId=98767991299243165%252C99332500638116286%252C98767991302996019';
//       const options = {
//         method: 'GET',
//         headers: {
//           'x-rapidapi-key': '789311f9fcmshd9faed448710a37p106a01jsn2afba2b5e47c',
//           'x-rapidapi-host': 'league-of-legends-esports.p.rapidapi.com'
//         }
//       };
      
//       try {
//         const response = await fetch(url, options);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log(data); 
//         if (data.data && data.data.schedule && Array.isArray(data.data.schedule.events)) {
//           setEvents(data.data.schedule.events);
//         } else {
//           throw new Error('Invalid data format received');
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Error fetching data');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className='w-full m-auto justify-center items-centerss text-center'>List of Scheduled Tournaments</h1>
      <ul>
        {/* {events.slice(0, 5).map((event) => ( 
          <li key={event.match.id} className=' border border-1 border-white gap-4 my-7  p-4 rounded-xl  justify-center items-center'>
            <div>Tournament Name: {event.league.name}</div>
            <div>Match ID: {event.match.id}</div>
            <div>Teams: {event.match.teams.map(team => team.name).join(' vs ')}</div>
            <div>Start Time: {new Date(event.startTime).toLocaleString()}</div>
            <div className='flex'>
            <h1 className='w-1/3 m-auto rounded-xl mx-auto my-2 cursor-pointer text-center p-2 border border-1 border-white'>Bet</h1>
            </div>
          </li>
        ))} */}
         <li  className=' border border-1 border-white gap-4 my-7  p-4 rounded-xl  justify-center items-center'>
            <div>Tournament Name:</div>
            <div>Match ID: </div>
            <div>Teams: ' vs '</div>
            <div>Start Time: </div>
            <div className='flex'>
            <h1 className='w-1/3 m-auto rounded-xl mx-auto my-2 cursor-pointer text-center p-2 border border-1 border-white'>Bet</h1>
            </div>
          </li>
      </ul>
    </div>
  );
};

export default TournamentList;
