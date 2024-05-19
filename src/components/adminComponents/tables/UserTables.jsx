'use client';

import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useGetFetch } from '../fetchActions/GetFetch';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import capitalize from 'capitalize';

const columns = [
    { field: 'col1', headerName: 'Nombre', width: 100 },
    { field: 'col2', headerName: 'Telefono', width: 150 },
    { field: 'col3', headerName: 'Email', width: 250 },
    {
        field: 'col4',
        headerName: 'Estado email',
        width: 150,
        renderCell: (params) => {
            if (params.row.col4 === 1) {
                return <span className='bg-[#9aec85] text-center p-2 rounded-md'>verificado</span>
            } else {
                return <span className='bg-[#e78b67] text-center p-2 rounded-md'>no verificado</span>
            }
        }
    },
    { field: 'col5', headerName: 'Rol', width: 150 },
    {
        field: 'col6',
        headerName: 'Estado Actual',
        width: 150,
        renderCell: (params) => {
            if (params.row.col6 === 1) {
                return <span className='bg-[#9aec85] text-center p-2 rounded-md'>activo</span>
            } else {
                return <span className='bg-[#e78b67] text-center p-2 rounded-md'>inactivo</span>
            }
        }
    },
    {
        field: 'col7',
        headerName:
            'Acciones',
        width: 150,
        renderCell: (params) => (
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    console.log(params.id);
                }}
            >
                Acción
            </Button>
        ),
    },
];

export default function UserTable() {
    const url = 'http://localhost:3000/api/v1/users';
    const { data, isLoading } = useGetFetch(url);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const rows = data.map((item, index) => ({
        id: item.Id_User,
        col1: item.Nom_User + " " + item.Ape_User,
        col2: item.Tel_User,
        col3: item.Ema_User,
        col4: item.Est_Email_User,
        col5: capitalize(item.rol.Nom_Rol),
        col6: item.ESTADO_REGISTRO,
        key: item.Id_User,
    }));

    return (

        <div className=' overflow-hidden' style={{overflow:'hidden', height: '32rem', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    ...data.initialState,
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
            />
        </div>

    );
}
