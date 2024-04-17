import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from 'react-query';
import {
    Button,
    CircularProgress,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    Option,
    Select,
    Sheet,
    Stack,
    Table,
} from '@mui/joy';
import { User, UserData } from '../../entities/User.ts';
import Typography from '@mui/joy/Typography';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { perPageOptions } from '../../constants/pagination.ts';

interface UserListParams {
    per_page?: number;
    current_page: number;
}

const Users = () => {
    const [params, setParams] = useState<UserListParams>({} as UserListParams);

    const fetchData = async () => await User.list();
    const { isLoading, data } = useQuery(['orders', ''], fetchData);

    useEffect(() => {
        if (!data) {
            return;
        }
        setParams({
            per_page: data.meta.per_page,
            current_page: data.meta.current_page,
        });
    }, [data]);

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
            <Stack>
                <FormControl sx={{ flex: 1 }} size="sm">
                    <FormLabel>Search by email</FormLabel>
                    <Input
                        size="sm"
                        placeholder="Search"
                        startDecorator={<SearchIcon />}
                    />
                </FormControl>
            </Stack>
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
                <Stack
                    sx={{ py: 2 }}
                    direction="row"
                    justifyContent="space-between"
                >
                    <Stack direction="row" alignItems="center">
                        <Typography level="body-sm">Items per page</Typography>
                        <Select
                            defaultValue={15}
                            sx={{ mx: 1 }}
                            size="sm"
                            onChange={(_, newValue) => {
                                if (newValue) {
                                    setParams((prev) => ({
                                        ...prev,
                                        per_page: +newValue,
                                    }));
                                }
                            }}
                        >
                            {perPageOptions.map((i) => (
                                <Option value={i}>{i}</Option>
                            ))}
                        </Select>
                        <Typography level="body-sm">
                            {data?.meta.from}-{data?.meta.to} of{' '}
                            {data?.meta.total} items
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <IconButton color="primary">
                            <FirstPageIcon />
                        </IconButton>
                        <Button
                            startDecorator={<NavigateBeforeIcon />}
                            size="sm"
                            variant="plain"
                        >
                            Previous
                        </Button>
                        <Input
                            size="sm"
                            type="tel"
                            slotProps={{
                                input: {
                                    min: 1,
                                    max: data?.meta.last_page,
                                    step: 1,
                                },
                            }}
                            value={params.current_page}
                            sx={{ width: 30, mr: 1 }}
                            onChange={(e) =>
                                setParams((prev) => ({
                                    ...prev,
                                    current_page: +e.target.value,
                                }))
                            }
                        />
                        of {data?.meta.last_page}
                        <Button
                            endDecorator={<NavigateNextIcon />}
                            size="sm"
                            variant="plain"
                        >
                            Next
                        </Button>
                        <IconButton color="primary">
                            <LastPageIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </div>
        </Box>
    );
};

export default Users;
