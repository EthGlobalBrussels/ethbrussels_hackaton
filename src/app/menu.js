import menu from './menu.module.css'
import Link from 'next/link'

export default function Menu(){
	return (
		<div>
			<div className={menu.wrapper}>
				<Link href='/' style={{alignSelf:'center'}}>
				Available bet
				</Link>
				<button style={{fontSize:'30px'}}>
					Connexion
				</button>
			</div>
		</div>
	)
}
