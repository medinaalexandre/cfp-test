import { useEffect, useState } from 'react';
import { User } from '../../entities/User.ts';
import {
    Link as ReactRouterLink,
    useNavigate,
    useParams,
} from 'react-router-dom';
import { UserResource } from '../../entities/User.types.ts';
import { useSnackbar } from '../../providers/SnackbarContextProvider.tsx';
import { Box, Button, CircularProgress, Link, Stack } from '@mui/joy';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Typography from '@mui/joy/Typography';
import InfoIcon from '@mui/icons-material/Info';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import Sheet from '@mui/joy/Sheet';
import { NavigateBefore, Security } from '@mui/icons-material';

const UserView = () => {
    const [user, setUser] = useState<UserResource>();
    const { userId } = useParams();
    const snackBar = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            return;
        }

        User.get(+userId)
            .then((res) => setUser(res.data))
            .catch((e) => {
                console.error(e);
                snackBar.addError(e.message);
                navigate('/users');
            });
    }, []);

    if (!user) {
        return (
            <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Stack>
        );
    }

    return (
        <Box
            sx={{
                height: '100dvh',
                px: 4,
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Breadcrumbs
                    size="sm"
                    separator={<ChevronRightRoundedIcon />}
                    sx={{ pl: 0 }}
                >
                    <Typography fontWeight={500} fontSize={12}>
                        Users
                    </Typography>
                    <Link
                        component={ReactRouterLink}
                        to="/users"
                        color="neutral"
                    >
                        <Typography fontWeight={500} fontSize={12}>
                            List
                        </Typography>
                    </Link>
                    <Typography fontWeight={500} fontSize={12}>
                        {user.username}
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Typography level="h2" component="h1">
                {user.username}
            </Typography>
            <Sheet
                variant="outlined"
                sx={{
                    borderRadius: 'sm',
                    p: 4,
                    mt: 2,
                    w: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                }}
            >
                <Stack direction="row" gap={4} sx={{}}>
                    <div>
                        <Typography level="title-lg" sx={{ mb: 2 }}>
                            About <InfoIcon />
                        </Typography>
                        <Typography>
                            <b>First name:</b> {user.first_name}
                        </Typography>
                        <Typography>
                            <b>Last name:</b> {user.last_name}
                        </Typography>
                        <Typography>
                            <b>Birthday:</b> {user.birthday ?? '-'}
                        </Typography>
                    </div>
                    <div>
                        <Typography level="title-lg" sx={{ mb: 2 }}>
                            Contacts <PhoneIphoneIcon />
                        </Typography>
                        <Typography>
                            <b>E-mail:</b> {user.email}
                        </Typography>
                        <Typography>
                            <b>Mobile:</b> {user.mobile ?? '-'}
                        </Typography>
                    </div>
                    <div>
                        <Typography level="title-lg" sx={{ mb: 2 }}>
                            Credentials <Security />
                        </Typography>
                        <Typography>
                            <b>Admin:</b> {user.is_admin ? 'Yes' : 'No'}
                        </Typography>
                    </div>
                </Stack>
                <div>
                    <Button
                        sx={{ mt: 2 }}
                        component={ReactRouterLink}
                        to="/users"
                        variant="outlined"
                        startDecorator={<NavigateBefore />}
                    >
                        Back to the list
                    </Button>
                </div>
            </Sheet>
        </Box>
    );
};

export default UserView;
