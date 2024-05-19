'use client';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useGetFetch } from '../fetchActions/GetFetch';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import capitalize from 'capitalize';
import { FaEdit } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { esES as materialEsES } from '@mui/material/locale';
import { esES } from '@mui/x-data-grid/locales';

export default function CoursesTable() {
    const url = 'http://localhost:3000/api/v1/courses';
    const { data, isLoading } = useGetFetch(url);
    const router = useRouter();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const rows = data.map((item) => ({
        id: item.Id_Cur,
        col1: item.Nom_Cur,
        col2: item.Fech_Crea_Cur,
        col3: capitalize(item.Categoria.Nom_Cat),
        col4: item.Est_Cur,
        col5: capitalize(item.Instructor.Nom_User),
        col6: item.ESTADO_REGISTRO
    }));

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

    const columns = [
        { field: 'col1', headerName: 'Titulo', width: 200, headerClassName: 'super-app-theme--header' },
        { field: 'col2', headerName: 'Fecha Creación', width: 150, headerClassName: 'super-app-theme--header' },
        { field: 'col3', headerName: 'Categoria', width: 250, headerClassName: 'super-app-theme--header' },
        {
            field: 'col4',
            headerName: 'Est. Publicación',
            width: 150,
            headerClassName: 'super-app-theme--header',
            valueGetter: (params) => {
                if (params === 1) {
                    return 'creado';
                } else if (params === 2) {
                    return 'publicado';
                }
                return '';
            },
            renderCell: (params) => {
                if (params.value === "creado") {
                    return <span className='bg-[#e6b55c] text-center p-2 rounded-md'>{params.value}</span>;
                } else if (params.value === "publicado") {
                    return <span className='bg-[#9aec85] text-center p-2 rounded-md'>{params.value}</span>;
                }
                return null;
            }
        },
        { field: 'col5', headerName: 'Instructor', width: 100, headerClassName: 'super-app-theme--header' },
        {
            field: 'col6',
            headerName: 'Estado',
            width: 150,
            headerClassName: 'super-app-theme--header',
            valueGetter: (params) => {
                if (params === 1) {
                    return 'activo';
                } else if (params === 0) {
                    return 'eliminado';
                }
                return '';
            },
            renderCell: (params) => {
                if (params.value === "activo") {
                    return <span className='bg-[#9aec85] text-center p-2 rounded-md'>{params.value}</span>;
                } else if (params.value === "eliminado") {
                    return <span className='bg-[#e76767] text-center p-2 rounded-md'>{params.value}</span>;
                }
                return null;
            }
        },
        {
            field: 'col7',
            headerName: '',
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <Button
                    variant="text"
                    color="primary"
                    size="medium"
                    startIcon={<FaEdit />}
                    onClick={() => {
                        router.push('/');
                    }}
                />
            ),
        },
    ];

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
