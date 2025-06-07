import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useTranslate } from 'src/locales';
import { HOST_API } from 'src/config-global';
import { getStocks, deleteStock } from 'src/api/stock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar/use-snackbar';

export default function StockListView() {
  const { t } = useTranslate();
  const settings = useSettingsContext();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const [stocks, setStocks] = useState([]);

  const fetchStocks = useCallback(async () => {
    try {
      const { result: stocksData } = await getStocks();
      setStocks(stocksData || []);
    } catch (error) {
      showSnackbar('Failed to fetch stocks', 'error');
      setStocks([]);
    }
  }, [showSnackbar]);

  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteStock(id);
        showSnackbar('Stock deleted successfully', 'success');
        fetchStocks();
      } catch (error) {
        showSnackbar('Failed to delete stock', 'error');
      }
    },
    [showSnackbar, fetchStocks]
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(paths.dashboard.stocks.edit(id));
    },
    [router]
  );

  const columns: GridColDef[] = [
    {
      field: 'image',
      headerName: 'Image',
      renderCell: (params) => (
        <img
          src={`${HOST_API}/${params.value}`}
          alt="stock"
          style={{ height: '100%', padding: '5px' }}
        />
      ),
    },
    { field: 'optionType', headerName: 'Option Type', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => handleDelete(params.row._id)}
        />,
        <GridActionsCellItem
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEdit(params.row._id)}
        />,
      ],
    },
  ];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Button
        variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
        onClick={() => router.push(paths.dashboard.stocks.create)}
        sx={{ mb: 2 }}
      >
        {t('stocks.newStock')}
      </Button>
      <Card>
        <DataGrid rows={stocks} columns={columns} getRowId={(row) => row._id} />
      </Card>
    </Container>
  );
}
