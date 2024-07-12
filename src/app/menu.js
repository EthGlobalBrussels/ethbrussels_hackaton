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
		<div className={menu.wrapper}>
		  <Link href='/' style={{ alignSelf: 'center' }}>
			Available bet
		  </Link>
		  {!user && (
			<a href="/api/auth/login" style={{ fontSize: '30px' }}>
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

