import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from '@mui/joy';
import { Link as ReactRouterLink } from 'react-router-dom';

export default function Sidebar() {
    return (
        <Sheet
            sx={{
                position: { xs: 'fixed', md: 'sticky' },
                zIndex: 1000,
                height: '100vh',
                width: 200,
                top: 0,
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
        </Sheet>
    );
}
