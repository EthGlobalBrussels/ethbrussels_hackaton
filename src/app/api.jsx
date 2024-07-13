"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TournamentList = () => {
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://league-of-legends-esports.p.rapidapi.com/schedule?leagueId=98767991299243165%252C99332500638116286%252C98767991302996019';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '127c64da5fmsh6599ba8bd9bae2ap10960djsnde33c2b25cf4',
          'x-rapidapi-host': 'league-of-legends-esports.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); 
        if (data.data && data.data.schedule && Array.isArray(data.data.schedule.events)) {
          setEvents(data.data.schedule.events);
        } else {
          throw new Error('Invalid data format received');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Filter events where match state is 'unstated'
  const filteredEvents = events.filter(event => event.state === 'unstarted');

  const handleSelectMatch = (matchId) => {
    if (selectedMatchId === matchId) {
      setSelectedMatchId(null); // Deselect if the same match is clicked
    } else {
      setSelectedMatchId(matchId);
    }
  };

  return (
    <div className=''>
      <h1 className='w-96 m-auto justify-center items-centerss text-center'>List of Scheduled Tournaments</h1>
      <ul className='grid grid-cols-2 gap-4'>
        {filteredEvents.slice(0, 6).map((event) => (
          <li key={event.match.id} className='border-4 border-pink-500 shadow-inner shadow-black bg-gradient-to-b from-blue-800 to-purple-900 gap-4 my-7 p-4 rounded-xl justify-center items-center'>
            <div>Tournament Name: {event.league.name}</div>
           
            <div>Status: {event.state}</div>
            <div>Teams: {event.match.teams.map(team => team.name).join(' vs ')}</div>
            <div>Start Time: {new Date(event.startTime).toLocaleString()}</div>
            <div className='flex'>
              <h1
                className='shadow-lg mx-auto my-5 px-10 bg-gradient-to-r from-blue-500 to-pink-600 py-2 rounded-full cursor-pointer'
                onClick={() => handleSelectMatch(event.match.id)}
              >
                Select Match
              </h1>
            </div>
            {selectedMatchId === event.match.id && (
              <motion.div className='mt-4 grid grid-cols-2 gap-2'>
                <button  className='shadow-lg mx-auto my-2 px-6 bg-gradient-to-r from-green-500 to-blue-600 py-2 rounded-full'>
                  Bet {event.match.teams[0].name}
                </button>
                <button className='shadow-lg mx-auto my-2 px-6 bg-gradient-to-r from-red-500 to-yellow-600 py-2 rounded-full'>
                  Bet {event.match.teams[1].name}
                </button>
              </motion.div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TournamentList;
