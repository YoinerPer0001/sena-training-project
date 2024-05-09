'use client'
import SignUpCards from '@/components/SignUpCard/SignUpCards';
import styles from './Users.module.scss'
import ManageCoursesCard from '@/components/ManageCoursesCard/ManageCoursesCard';
import DataTable, { defaultThemes } from 'react-data-table-component';
import { useState, useEffect } from 'react';
import { Spinner } from '@/components/Spinner/Spinner';
import { columnsUsers, dataUsers } from '@/utils/exampleData';
import { NoDataComponent } from '@/components/NoDataComponent/NoDataComponent';
import { getCookie } from 'cookies-next';

export default function Users() {

    const [firstData, setFirstData] = useState([])
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(true)
    const token = getCookie('sessionToken')
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

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };
    return (
        <div className="bg-gray-100 flex flex-col h-full gap-2 p-4 max-h-full rounded-lg overflow-y-auto">
            <div className={styles.container_button_add}>
                <h3>Usuarios</h3>
                <hr />
                <div className='flex gap-2 my-4 justify-center items-center'>
                    <div>
                        <label>Nombre: </label>
                        <input className='p-2 rounded-lg border-1 border-gray-200' name='users_filter' type="text" placeholder="Steven Gonzalez" onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div className='rounded-lg'>
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
                    paginationComponentOptions={paginationComponentOptions}
                    className='border-1 border-gray-200'
                />
            </div>
        </div>
    );
}