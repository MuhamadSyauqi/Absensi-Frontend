import { teal } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery} from '@mui/material';


export default function CustomTheme({children} : any){
 const theme = createTheme({
    palette: {
      primary: {
        main: teal[400],
      },
      secondary: {
        main: '#11cb5f',
      },
    },
  });
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  
  return(
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );
}