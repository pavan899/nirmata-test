import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { Box } from '@mui/material/';

export default function MainLayout() {
  //  This is a template layout to re-use header and layout style
  return (
    <div>
      <Header />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Box sx={{ width: '90%' }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  )
}
