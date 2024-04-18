import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';

import { Button, Divider, Link, useColorScheme } from '@mui/joy';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Auth } from '../entities/Auth.ts';
import { useAuth } from '../providers/AuthContextProvider.tsx';

export default function Sidebar() {
    const navigate = useNavigate();
    const auth = useAuth();
    const { mode, setMode } = useColorScheme();

    return (
        <Sheet
            sx={{
                position: { xs: 'fixed' },
                zIndex: 1000,
                height: '100vh',
                width: 200,
                p: 2.5,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography level="title-lg">CFP ACL</Typography>
            </Box>
            <Box>
                <List size="sm">
                    <Link component={ReactRouterLink} to="/" underline="none">
                        <ListItem>
                            <ListItemButton>
                                <HomeRoundedIcon />
                                <ListItemContent>
                                    <Typography level="title-sm">
                                        Home
                                    </Typography>
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link
                        component={ReactRouterLink}
                        to="/users"
                        underline="none"
                    >
                        <ListItem>
                            <ListItemButton>
                                <PersonIcon />
                                <ListItemContent>
                                    <Typography level="title-sm">
                                        Users
                                    </Typography>
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
            </Box>
            <Button
                sx={{
                    mt: 'auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
                variant="outlined"
                onClick={() => {
                    setMode(mode === 'light' ? 'dark' : 'light');
                }}
            >
                <Typography level="body-sm">Change mode </Typography>
                {mode === 'light' ? <LightModeIcon /> : <DarkModeRoundedIcon />}
            </Button>
            <Divider />
            <Button
                endDecorator={<LogoutIcon />}
                variant="plain"
                color="neutral"
                onClick={() =>
                    Auth.logout().then(() => {
                        auth.setIsAuthenticated(false);
                        navigate('/login');
                    })
                }
                sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                }}
            >
                <Typography level="body-sm">Logout</Typography>
            </Button>
        </Sheet>
    );
}
