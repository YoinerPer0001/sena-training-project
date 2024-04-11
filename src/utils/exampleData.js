import styles from './exampleData.module.scss'

export const columnsContent = [
    {
        "name": 'Nombres',
        selector: row => row.names,
        sortable: true,
    },
    {
        "name": 'Categoria',
        selector: row => row.categories,
        sortable: true
    },
    {
        "name": 'Instructor',
        selector: row => row.instructors,
        sortable: true
    },
    {
        "name": 'Fecha de creación',
        selector: row => row.createdAt,
        sortable: true
    },
    {
        "name": 'Estado',
        selector: row => row.state,
        sortable: true
    },
    {
        "name": '',
        selector: row => row.actions,
    },
]
export const columnsUsers = [
    {
        "name": 'Nombre',
        selector: row => row.names,
        sortable: true
    },
    {
        "name": 'Apellidos',
        selector: row => row.lastnames,
        sortable: true
    },
    {
        "name": 'Correo',
        selector: row => row.email,
        sortable: true
    },
    {
        "name": '',
        selector: row => row.actions,
        button: true,
        cell: () => <div className={styles.actions_table}>
            <button className={styles.edit_button_table}>Editar</button>
        </div>,
    },
]
export const dataContent = [
    {
        "names": "Desarrollo de software",
        "categories": "Sistemas",
        "instructors": "Juan Olivares",
    },
    {
        "names": "Actividad física con balón retenido",
        "categories": "Deportes",
        "instructors": "Juan Olivares",
    },
    {
        "names": "Base de datos con MySQL y PostgresSQL",
        "categories": "Sistemas",
        "instructors": "Juan Olivares",
    },
    {
        "names": "Diseño gráfico avanzado",
        "categories": "Diseño",
        "instructors": "María López"
    },
    {
        "names": "Inglés para negocios",
        "categories": "Idiomas",
        "instructors": "Ana García"
    },
    {
        "names": "Introducción a la inteligencia artificial",
        "categories": "Tecnología",
        "instructors": "Carlos Martínez"
    },
    {
        "names": "Fotografía digital profesional",
        "categories": "Arte",
        "instructors": "Sofía Hernández"
    },
    {
        "names": "Marketing digital estratégico",
        "categories": "Negocios",
        "instructors": "David Sánchez"
    },
    {
        "names": "Yoga para principiantes",
        "categories": "Salud",
        "instructors": "Laura Rodríguez"
    },
    {
        "names": "Programación en Python",
        "categories": "Tecnología",
        "instructors": "Eduardo Pérez"
    },
    {
        "names": "Finanzas personales",
        "categories": "Finanzas",
        "instructors": "Roberto Gómez"
    },
    {
        "names": "Cocina italiana tradicional",
        "categories": "Cocina",
        "instructors": "Luisa Martínez"
    },
    {
        "names": "Diseño web responsivo",
        "categories": "Diseño",
        "instructors": "Miguel Sánchez"
    },
    {
        "names": "Meditación mindfulness",
        "categories": "Salud",
        "instructors": "María Pérez"
    },
    {
        "names": "Economía básica para emprendedores",
        "categories": "Negocios",
        "instructors": "Andrés Torres"
    },
    {
        "names": "Pintura al óleo para principiantes",
        "categories": "Arte",
        "instructors": "Juan García"
    },
    {
        "names": "Desarrollo de aplicaciones móviles",
        "categories": "Tecnología",
        "instructors": "Alejandro Martín"
    },
    {
        "names": "Gestión del tiempo y productividad",
        "categories": "Desarrollo personal",
        "instructors": "Laura Gutiérrez"
    },
    {
        "names": "Nutrición y dietética",
        "categories": "Salud",
        "instructors": "Ana Fernández"
    },
    {
        "names": "Técnicas de ventas efectivas",
        "categories": "Negocios",
        "instructors": "José Pérez"
    },
    {
        "names": "Física cuántica para no físicos",
        "categories": "Ciencia",
        "instructors": "Carlos Ruiz"
    },
    {
        "names": "Escritura creativa",
        "categories": "Literatura",
        "instructors": "Laura Sánchez"
    },
    {
        "names": "Guitarra eléctrica: técnicas avanzadas",
        "categories": "Música",
        "instructors": "Pedro Martínez"
    }
]
export const dataUsers = [
    {
        "names": "Steven",
        "lastnames": "Gonzalez",
        "email": "steven@gmail.com"
    },
    {
        "names": "María",
        "lastnames": "López",
        "email": "maria.lopez@example.com"
    },
    {
        "names": "Juan",
        "lastnames": "García",
        "email": "juangarcia@hotmail.com"
    },
    {
        "names": "Ana",
        "lastnames": "Martínez",
        "email": "ana.martinez@gmail.com"
    },
    {
        "names": "Pedro",
        "lastnames": "Sánchez",
        "email": "pedro.sanchez@example.com"
    },
    {
        "names": "Laura",
        "lastnames": "Hernández",
        "email": "laura_hernandez@gmail.com"
    },
    {
        "names": "Carlos",
        "lastnames": "Martín",
        "email": "carlos.martin@example.com"
    },
    {
        "names": "Sofía",
        "lastnames": "Gómez",
        "email": "sofia_gomez@hotmail.com"
    },
    {
        "names": "Luis",
        "lastnames": "Pérez",
        "email": "luis.perez@gmail.com"
    },
    {
        "names": "Andrea",
        "lastnames": "Rodríguez",
        "email": "andrea.rodriguez@example.com"
    },
    {
        "names": "David",
        "lastnames": "Gutiérrez",
        "email": "david.gutierrez@hotmail.com"
    },
    {
        "names": "Marta",
        "lastnames": "Fernández",
        "email": "marta_fernandez@gmail.com"
    },
    {
        "names": "José",
        "lastnames": "López",
        "email": "jose.lopez@example.com"
    },
    {
        "names": "Paula",
        "lastnames": "Díaz",
        "email": "paula.diaz@hotmail.com"
    },
    {
        "names": "Daniel",
        "lastnames": "Martínez",
        "email": "daniel_martinez@gmail.com"
    },
    {
        "names": "Carla",
        "lastnames": "García",
        "email": "carla_garcia@example.com"
    },
    {
        "names": "Pablo",
        "lastnames": "Hernández",
        "email": "pablo.hernandez@hotmail.com"
    },
    {
        "names": "Lucía",
        "lastnames": "Sánchez",
        "email": "lucia.sanchez@gmail.com"
    },
    {
        "names": "Mario",
        "lastnames": "Gonzalez",
        "email": "mario.gonzalez@example.com"
    },
    {
        "names": "Elena",
        "lastnames": "Pérez",
        "email": "elena_perez@hotmail.com"
    },
    {
        "names": "Fernando",
        "lastnames": "López",
        "email": "fernando.lopez@example.com"
    },
    {
        "names": "Isabel",
        "lastnames": "García",
        "email": "isabel.garcia@hotmail.com"
    },
    {
        "names": "Diego",
        "lastnames": "Martínez",
        "email": "diego.martinez@gmail.com"
    }
]