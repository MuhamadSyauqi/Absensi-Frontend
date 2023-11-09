import React, { useState } from 'react';
import Image from 'next/image';
import CustomTheme from "./CustomTheme";
import { AppBar, IconButton, Toolbar, Typography, useMediaQuery, useTheme,Box } from '@mui/material';
import Sidebar from './Sidebar';
import { Menu } from '@mui/icons-material';



const Header: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };
  
  return (
    <>
    <CustomTheme> 
      <AppBar position="fixed" sx={{height:'64px'}} color="primary">
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleSidebarOpen}>
              <Menu />
            </IconButton>
         
          <Box sx={{ display:'flex',alignItems:'center'}}>
            <Image src="/images/logo.png" alt="logo pt arka geulima indonesia" width={70} height={70}/>
            <Typography variant="h6">Absensi Karyawan</Typography>
        </Box>  
        </Toolbar>
      </AppBar>
      <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
    </CustomTheme>
      
    </>
  );
};

export default Header;
