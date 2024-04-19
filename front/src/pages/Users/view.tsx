import { useEffect, useState } from 'react';
import { User } from '../../entities/User.ts';
import {
    Link as ReactRouterLink,
    useNavigate,
    useParams,
} from 'react-router-dom';
import { UserData } from '../../entities/User.types.ts';
import { useSnackbar } from '../../providers/SnackbarContextProvider.tsx';
import { Box, CircularProgress, Link, Stack } from '@mui/joy';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Typography from '@mui/joy/Typography';

const UserView = () => {
    const [user, setUser] = useState<UserData>();
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
            {user.id}
            {user?.first_name}
        </Box>
    );
};

export default UserView;
