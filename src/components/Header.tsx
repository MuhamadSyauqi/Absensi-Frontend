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
            <Image src="/images/logo-transparent.png" alt="logo pt aloha snack" width={100} height={100}/>
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
