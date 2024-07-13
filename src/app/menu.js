'use client'

import { useUser } from '@auth0/nextjs-auth0/client';
import menu from './menu.module.css';
import Link from 'next/link';
import ConnectWallet from './userData/connectWallet';

export default function Menu() {
    const { user, error, isLoading } = useUser();

    // if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
      <div>
        <div className='fade-in' >

            <ConnectWallet/>
          </div>
        </div>
    );
  }