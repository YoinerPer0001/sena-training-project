'use client';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useGetFetch } from '../../../hooks/fetchActions/GetFetch';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import capitalize from 'capitalize';
import { useRouter } from 'next/navigation';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { esES as materialEsES } from '@mui/material/locale';
import { esES } from '@mui/x-data-grid/locales';
import { Edit } from 'lucide-react';
import { Spinner } from '@/components/usersComponents/Spinner/Spinner';
import { Settings2 } from "lucide-react";

export default function CoursesTable() {
    const url = 'http://localhost:3000/api/v1/courses';
    const { data, isLoading } = useGetFetch(url);
    const router = useRouter();

    if (isLoading) {
        return <Spinner />;
    }

    const rows = data.map((item) => ({
        id: item.Id_Cur,
        col1: item.Nom_Cur,
        col2: item.Fech_Crea_Cur,
        col3: capitalize(item.Categoria.Nom_Cat),
        col4: item.Est_Cur,
        col5: capitalize(item.Instructor?.Nom_User == null ? 'Sin instructor' : item.Instructor.Nom_User) ,
        col6: item.ESTADO_REGISTRO
    }));

    // eslint-disable-next-line react-hooks/rules-of-hooks
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
                    return 'Creado';
                } else if (params === 2) {
                    return 'Publicado';
                }
                return '';
            },
            renderCell: (params) => {
                if (params.value === "Creado") {
                    return <span className='bg-gray-200 text-gray-600 text-center p-2 rounded-full font-semibold mx-auto'>{params.value}</span>;
                } else if (params.value === "Publicado") {
                    return <span className='bg-green-100 text-green-700 text-center p-2 rounded-full font-semibold'>{params.value}</span>;
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
                    return 'Activo';
                } else if (params === 0) {
                    return 'Eliminado';
                }
                return '';
            },
            renderCell: (params) => {
                if (params.value === "Activo") {
                    return <span className='bg-green-100 text-green-700 text-center p-2 rounded-full font-semibold'>{params.value}</span>;
                } else if (params.value === "Eliminado") {
                    return <span className='bg-red-100 text-red-500 text-center p-2 rounded-full font-semibold'>{params.value}</span>;
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
                    startIcon={<Settings2 size={20}/>}
                    onClick={() => {
                        router.push(`/admin/courses/${params.id}`);
                    }}
                />
            ),
        },
    ];

    return (
        <div className='overflow-hidden rounded-lg' style={{ backgroundColor: '#fff', overflow: 'hidden', width: '100%', margin: '8px' }}>
        <Box
            sx={{
                '& .super-app-theme--header': {
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',

                },

                '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 'bold',
                    borderRadius: '8px',
                },

                '& .MuiButtonBase-root': {
                    color: '#00324D'
                },

                '& .MuiDataGrid-cell': {
                    backgroundColor: '#ffffff',
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
