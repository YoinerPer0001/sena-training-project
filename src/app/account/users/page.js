'use client'
import SignUpCards from '@/components/SignUpCard/SignUpCards';
import styles from './Users.module.scss'
import ManageCoursesCard from '@/components/ManageCoursesCard/ManageCoursesCard';
import DataTable, { defaultThemes } from 'react-data-table-component';
import { useState, useEffect } from 'react';
import { Spinner } from '@/components/Spinner/Spinner';
import { columnsUsers, dataUsers } from '@/utils/exampleData';
import { NoDataComponent } from '@/components/NoDataComponent/NoDataComponent';

export default function Users() {

    const [firstData, setFirstData] = useState([])
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(true)
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M2bmdsdXA1YmFibiIsIk5vbV9Vc2VyIjoiU3RldmVuIiwiQXBlX1VzZXIiOiJDdWVudGFzIiwiRW1hX1VzZXIiOiJzdGV2ZW4wODEwbWlndWVsQG91dGxvb2suZXMiLCJJZF9Sb2xfRksiOjJ9LCJpYXQiOjE3MTI3ODYzNjksImV4cCI6MTcxMjg3Mjc2OX0.HIZfrtavK8dU8sM7_fqXgva7nS_M-BKz_2G9lqIV8Uc'
    useEffect(() => {
        try {
            fetch('http://localhost:3000/api/v1/users', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': "Bearer " + token
                }
            })
                .then(data => data.json())
                .then(data => {
                    console.log(data)
                    const users = data.data.map(user => ({
                        'names': user.Nom_User,
                        'lastnames': user.Ape_User,
                        'email': user.Ema_User
                    }));
                    setFirstData(users)
                    setRecords(users)
                    setLoading(false)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])


    const handleChange = (e) => {
        const inputValue = e.target.value.toLowerCase();
        const filteredRecords = firstData.filter(record => {
            const fullName = `${record.names.toLowerCase()} ${record.lastnames.toLowerCase()}`;
            return fullName.includes(inputValue) || record.email.toLowerCase().includes(inputValue);
        });
        setRecords(filteredRecords);
    }
    return (
        <section className={styles.container}>
            <div className={styles.container_button_add}>
                <h3>Usuarios</h3>
                <hr />
                <div className={styles.search}>
                    <div>
                        <label>Nombre: </label>
                        <input name='users_filter' type="text" placeholder="Steven Gonzalez" onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div className={styles.container_cursos}>
                <DataTable
                    columns={columnsUsers}
                    data={records}
                    selectableRows
                    pagination
                    fixedHeader
                    progressPending={loading}
                    progressComponent={<Spinner />}
                    highlightOnHover
                    noDataComponent={<NoDataComponent />}
                />
            </div>
        </section>
    );
}