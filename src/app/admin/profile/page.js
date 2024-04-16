import Image from 'next/image'
import styles from './Profile.module.scss'
import { PiNotePencilBold } from "react-icons/pi";

export default function Profile() {
    return (
        <section className={styles.container}>
            <div className={styles.div}>
                <header className={styles.header}>
                    <picture>
                        <Image src="https://res.cloudinary.com/dla5djfdc/image/upload/v1712821257/blank-avatar-photo-place-holder-600nw-1095249842_a6kf0c.webp" alt="Profile" width={100} height={100}/>
                        <button><PiNotePencilBold /></button>
                    </picture>
                </header>
                <hr />
                <form className={styles.main}>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" placeholder='Steven'/>
                    </div>
                    <div>
                        <label>Apellido:</label>
                        <input type="text" placeholder='Gonzalez'/>
                    </div>
                    <div>
                        <label>Teléfono:</label>
                        <input type="number" placeholder='304 3189031'/>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" placeholder='steven@gmail.com'/>
                    </div>
                    <button type="submit">Actualizar perfil</button>
                </form>
            </div>
        </section>
    );
}