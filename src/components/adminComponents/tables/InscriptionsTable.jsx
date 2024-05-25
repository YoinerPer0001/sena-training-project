'use client';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useGetFetch } from '../fetchActions/GetFetch';
import ProgressBar from "@ramonak/react-progress-bar";
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { esES as materialEsES } from '@mui/material/locale';
import { esES } from '@mui/x-data-grid/locales';
import Image from 'next/image'
import { lime, purple } from '@mui/material/colors';
import { Spinner } from '@/components/usersComponents/Spinner/Spinner';




export default function InscriptionTable({ id }) {

    const url = `http://localhost:3000/api/v1/inscription/user/${id}`;
    const { data, isLoading } = useGetFetch(url);

    // eslint-disable-next-line react-hooks/rules-of-hooks

    const theme = createTheme(
        {
            components: {
                MuiDataGrid: {
                    defaultProps: {
                        localeText: esES.components.MuiDataGrid.defaultProps.localeText,
                    },
                },
            },
            palette: {
                palette: {
                    primary: lime,
                    secondary: purple,
                },
            }
        },
        materialEsES, // Esto aplica las traducciones predeterminadas en español

    );

    if (isLoading) {
        return <div><Spinner /></div>;
    }


    const rows = data.map((item, index) => ({

        id: item.Id_Cur_FK,
        colfot: item.Curso.Fot_Cur,
        col1: item.Curso.Nom_Cur,
        col2: item.Prog_Cur,
        col3: item.fecha_insc,
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
                            <Image className='rounded-full' src={"/Cursos-defecto.JPG"} width={40} height={40} alt='userFot' />
                        </div>
                    )
                }

            }
        },
        {
            field: 'col1',
            headerName: 'Curso',
            width: 200,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'col2',
            headerName: 'Progreso',
            width: 150,
            headerClassName: 'super-app-theme--header',

            renderCell: (params) => (

                <ProgressBar
                    animateOnRender= "true"
                    labelAlignment='center'
                    borderRadius='8px'
                    labelColor={parseFloat(params.value) >= 80 ? '#15803D' : parseFloat(params.value) <= 40 ? '#EF4444' : '#FFFFFF'}
                    className='mt-4 rounded-lg'
                    bgColor={parseFloat(params.value) >= 80 ? '#DCFCE7' : parseFloat(params.value) <= 40 ? '#EF4444' : '#F9B588'} completed={parseInt(params.value) || 1} width='100%' />


            )
        },
        { field: 'col3', headerName: 'Fecha Insc', width: 250, headerClassName: 'super-app-theme--header', },

    ];



    return (



        <div className='overflow-hidden' style={{ backgroundColor: '#F6F4F2', overflow: 'hidden', width: '100%' }}>
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
                </ThemeProvider>
            </Box>
        </div>

    );
}
