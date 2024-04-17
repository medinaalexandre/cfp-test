import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery } from 'react-query';
import { Button, CircularProgress, Sheet, Stack, Table } from '@mui/joy';
import { User, UserData } from '../../entities/User.ts';
import Typography from '@mui/joy/Typography';
import { Link as ReactRouterLink } from 'react-router-dom';

const Users = () => {
    const fetchData = async () => await User.list();
    const { isLoading, data } = useQuery(['orders', ''], fetchData);

    if (isLoading) {
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
                    <Typography fontWeight={500} fontSize={12}>
                        List
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    mb: 1,
                    gap: 1,
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'start', sm: 'center' },
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                }}
            >
                <Typography level="h2" component="h1">
                    Users
                </Typography>
                <Button
                    startDecorator={<AddIcon />}
                    component={ReactRouterLink}
                    to="/users/create"
                >
                    Create user
                </Button>
            </Box>
            <div>
                <Sheet
                    variant="outlined"
                    sx={{
                        borderRadius: 'sm',
                    }}
                >
                    <Table
                        stickyHeader
                        stickyFooter
                        stripe="odd"
                        hoverRow
                        sx={{ overflowY: 'scroll' }}
                    >
                        <thead>
                            <tr>
                                <th style={{ width: 40 }}>ID</th>
                                <th>Username</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Mobile</th>
                                <th>E-mail</th>
                                <th style={{ width: 100 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data.map((user: UserData) => (
                                <tr key={user.id}>
                                    <td>
                                        <Typography level="body-sm">
                                            {user.id}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography level="body-sm">
                                            {user.username}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography level="body-sm">
                                            {user.first_name}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography level="body-sm">
                                            {user.last_name}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography level="body-sm">
                                            {user.mobile}
                                        </Typography>
                                    </td>
                                    <td
                                        style={{
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <Typography level="body-sm">
                                            {user.email}
                                        </Typography>
                                    </td>
                                    <td
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <EditIcon />
                                        <DeleteIcon />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Sheet>
            </div>
        </Box>
    );
};

export default Users;
