import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const AttendanceDataGrid = ({
  employees,
  filteredEmployees,
  monthDays,
  today,
  daysInMonth,
  attendance,
  setSelectedEmployee,
  setSelectedDate,
  isMobile
}) => {
  // Convert getStatusColor to MUI style format
  const getStatusStyles = (status) => {
    switch (status) {
      case 'present': return { bgcolor: 'success.light', border: '1px solid', borderColor: 'success.main' };
      case 'absent': return { bgcolor: 'error.light', border: '1px solid', borderColor: 'error.main' };
      case 'late': return { bgcolor: 'warning.light', border: '1px solid', borderColor: 'warning.main' };
      default: return { bgcolor: 'grey.100', border: '1px solid', borderColor: 'grey.300' };
    }
  };

  // Prepare columns
  const columns = [
    {
      field: 'employee',
      headerName: 'Employee',
      width: 200,
      renderCell: (params) => (
        <Box 
          onClick={() => setSelectedEmployee(params.row.id)} 
          sx={{ 
            cursor: 'pointer',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: '16px' // Add some padding
          }}
        >
          <Typography fontWeight="medium">{params.row.name}</Typography>
          <Typography variant="body2" color="text.secondary">{params.row.department}</Typography>
        </Box>
      ),
      sticky: true,
      headerClassName: 'sticky-header', // Add sticky header class
      cellClassName: 'sticky-cell' // Add sticky cell class
    },
    ...monthDays.slice(0, isMobile ? 7 : daysInMonth).map(day => ({
      field: `day-${day}`,
      headerName: day.toString(),
      width: 60,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const status = attendance[params.row.id]?.[day]?.status || 'absent';
        const hours = attendance[params.row.id]?.[day]?.hours || 0;
        
        return (
          <Box 
            onClick={() => {
              setSelectedEmployee(params.row.id);
              setSelectedDate(day);
            }}
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backgroundColor: day === today ? 'warning.light' : 'transparent',
              border: day === today ? '2px solid' : 'none',
              borderColor: 'divider',
              ...getStatusStyles(status)
            }}
          >
            {hours > 0 ? (
              <Typography variant="caption" fontWeight="medium">
                {hours}h
              </Typography>
            ) : (
              <Typography variant="body2">
                {status === 'present' ? '✓' :
                 status === 'absent' ? '✗' :
                 status === 'late' ? '⌚' : ''}
              </Typography>
            )}
          </Box>
        );
      }
    }))
  ];

  return (
    <Box sx={{ 
      height: 600, 
      width: '100%',
      '& .sticky-header': {
        position: 'sticky',
        left: 0,
        zIndex: 2,
        backgroundColor: '#f5f5f5',
      },
      '& .sticky-cell': {
        position: 'sticky',
        left: 0,
        zIndex: 1,
        backgroundColor: 'white',
      },
      '& .MuiDataGrid-virtualScroller': {
        overflow: 'auto',
      },
      '& .MuiDataGrid-virtualScrollerContent': {
        position: 'relative',
      },
      '& .MuiDataGrid-columnHeaders': {
        position: 'sticky',
        top: 0,
        zIndex: 3,
        backgroundColor: '#f5f5f5',
      }
    }}>
      <DataGrid
        rows={filteredEmployees}
        columns={columns}
        hideFooter
        disableColumnMenu
        disableSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        sx={{
          '& .MuiDataGrid-cell': {
            padding: 0,
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'grey.100',
          },
        }}
      />
      
      {isMobile && (
        <Box mt={2} p={2} bgcolor="warning.light" borderRadius={1}>
          <Typography variant="body2" color="warning.contrastText">
            Scroll horizontally to view more days. Showing first 7 days for mobile view.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AttendanceDataGrid;