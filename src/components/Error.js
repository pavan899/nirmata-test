import React from 'react';
import { Box, Link } from '@mui/material/';

export default function ErrorPage() {
  return (
    <Box sx={{ width: '100%', height: '88vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ fontSize: 'calc(0.75vw + 10px)', display: 'flex', flexDirection: 'column' }}>
            Page Not Found !
            <Link href="/">go home</Link>
        </Box>
    </Box>
  )
}
