'use client';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useGetFetch } from '../../../hooks/fetchActions/GetFetch';
import Box from '@mui/material/Box';
import capitalize from 'capitalize';
import { useRouter } from 'next/navigation';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { esES as materialEsES } from '@mui/material/locale';
import { esES } from '@mui/x-data-grid/locales';
import Image from 'next/image'
import { Settings2 } from "lucide-react";
import Link from 'next/link';
import { Spinner } from '@/components/usersComponents/Spinner/Spinner';


export default function UserTable() {
    const url = 'http://localhost:3000/api/v1/users';
    const { data, isLoading } = useGetFetch(url);
    const existingTheme = useTheme();

    if (isLoading) {
        return <div><Spinner /></div>;
    }

    const rows = data.map((item, index) => ({
        id: item.Id_User,
        colfot: item.Fot_User,
        col1: item.Nom_User + " " + item.Ape_User,
        col2: item.Tel_User,
        col3: item.Ema_User,
        col4: item.Est_Email_User,
        col5: capitalize(item.rol.Nom_Rol),
        col6: item.ESTADO_REGISTRO
    }));

    const columns = [
        {
            field: 'colfot',
            headerName: '',
            width: 100,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {

                if (params.row.colfot != null) {
                    return (
                        <div className='w-full h-full flex justify-center items-center'>
                            <Image className=' rounded-full' src={params.row.colfot} width={40} height={40} alt='userFot' />
                        </div>
                    )
                } else {
                    return (
                        <div className='w-full h-full flex justify-center items-center'>
                            <Image className='rounded-full' src={"/USER-NO-PHOTO.png"} width={40} height={40} alt='userFot' />
                        </div>
                    )
                }

            }
        },
        {
            field: 'col1',
            headerName: 'Nombre',
            width: 200,
            headerClassName: 'super-app-theme--header'
        },
        { field: 'col2', headerName: 'Telefono', width: 150, headerClassName: 'super-app-theme--header', },
        { field: 'col3', headerName: 'Email', width: 250, headerClassName: 'super-app-theme--header', },
        {
            field: 'col4',
            headerName: 'Estado email',
            width: 100,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                if (params.row.col4 === 1) {
                    return <span className='bg-green-100 text-green-700 text-center p-2 rounded-full font-semibold'>Verificado</span>
                } else {
                    return <span className='bg-red-100 text-red-500 text-center p-2 rounded-full font-semibold'>Sin verificar</span>
                }
            }
        },
        { field: 'col5', headerName: 'Rol', width: 100, headerClassName: 'super-app-theme--header', },
        {
            field: 'col6',
            headerName: 'Estado Actual',
            width: 100,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                if (params.row.col6 === 1) {
                    return <span className='bg-green-100 text-green-700 text-center p-2 rounded-full font-semibold'>Activo</span>
                } else {
                    return <span className='bg-red-100 text-red-500 text-center p-2 rounded-full font-semibold'>Inactivo</span>
                }
            }
        },
        {
            field: 'col7',
            headerName:
                '',

            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <Link
                className='flex w-full h-full items-center justify-center'
                    href={'/admin/users/' + params.id}
                    variant="text"
                    color="primary"
                    size="medium"
                >
                    <Settings2 />

                </Link>
            ),
        },
    ];


    const theme = createTheme(
        {
            components: {
                MuiDataGrid: {
                    defaultProps: {
                        localeText: esES.components.MuiDataGrid.defaultProps.localeText,
                    },
                },
            },
        },
        materialEsES, // Esto aplica las traducciones predeterminadas en español
        existingTheme
    );

    return (

        <div className=' overflow-hidden' style={{ backgroundColor: '#F6F4F2', overflow: 'hidden', width: '100%' }}>
            <Box
                sx={{
                    '& .super-app-theme--header': {
                        backgroundColor: '#ffffff',

                    },

                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold',
                    },

                    '& .MuiButtonBase-root': {
                        color: '#00324D'
                    },

                    '& .MuiDataGrid-cell': {
                        backgroundColor: '#ffffff'
                    }
                }}
            >
                <ThemeProvider theme={theme}>

                    <DataGrid

                        rows={rows}
                        columns={columns}
                        initialState={{
                            ...data.initialState,
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                            },
                        }}
                    />
                </ThemeProvider>
            </Box>
        </div>

    );
}
