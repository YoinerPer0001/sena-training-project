'use client';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useGetFetch } from '../fetchActions/GetFetch';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import capitalize from 'capitalize';
import { FaEllipsis } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { esES as materialEsES } from '@mui/material/locale';
import { esES } from '@mui/x-data-grid/locales';
import Image from 'next/image'





export default function UserTable() {
    const url = 'http://localhost:3000/api/v1/users';
    const { data, isLoading } = useGetFetch(url);

    const router = useRouter();

    if (isLoading) {
        return <div>Loading...</div>;
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
                    return <span className='bg-[#9aec85] text-center p-2 rounded-md'>verificado</span>
                } else {
                    return <span className='bg-[#e78b67] text-center p-2 rounded-md'>no verificado</span>
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
                    return <span className='bg-[#9aec85] text-center p-2 rounded-md'>activo</span>
                } else {
                    return <span className='bg-[#e78b67] text-center p-2 rounded-md'>inactivo</span>
                }
            }
        },
        {
            field: 'col7',
            headerName:
                '',

            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <Button
                    variant="text"
                    color="primary"
                    size="medium"
                    startIcon={<FaEdit />}
                    onClick={() => {
                        router.push('/')
                    }}
                >

                </Button>
            ),
        },
    ];

    const existingTheme = useTheme();

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