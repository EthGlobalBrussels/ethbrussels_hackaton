'use client'

import ProfileClient from './userData/userProfile';
import { useUser } from '@auth0/nextjs-auth0/client';
import menu from './menu.module.css';
import Link from 'next/link';

export default function Menu() {
	const { user, error, isLoading } = useUser();
  
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;
  
	return (
	  <div>
		<div className="w=screen justify-right  items-right text-right">
	
	
		  {!user && (
			<a href="/api/auth/login" className='bg-gradient-to-r from-sky-400 to-pink-600 px-10 py-2 rounded-full'>
			  Login
			</a>
		  )}
		  {user && (
			<a href="/api/auth/logout" style={{ fontSize: '30px' }}>
			  Logout
			</a>
		  )}
		</div>
		{user && (
		  <div>
			<img src={user.picture} alt={user.name} />
			<h2>{user.name}</h2>
			<p>{user.email}</p>
		  </div>
		)}
	  </div>
	);
  }

