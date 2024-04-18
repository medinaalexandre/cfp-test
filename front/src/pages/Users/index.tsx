import { ChangeEvent, useEffect } from 'react';
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
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';

import { useQuery, useQueryClient, useMutation } from 'react-query';
import {
    Button,
    CircularProgress,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    Input,
    Option,
    Select,
    Sheet,
    Stack,
    Table,
} from '@mui/joy';
import {
    User,
    UserData,
    UserDeleteInterface,
    UserListParams,
    UserListResponse,
} from '../../entities/User.ts';
import Typography from '@mui/joy/Typography';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useState } from 'react';
import { perPageOptions } from '../../constants/pagination.ts';
import UserListTableSkeleton from '../../components/UserListTableSkeleton.tsx';
import { useSnackbar } from '../../providers/SnackbarContextProvider.tsx';

const initialParamsValue: UserListParams = {
    current_page: 1,
    email: undefined,
    first_name: undefined,
    username: undefined,
    id: undefined,
    last_name: undefined,
    mobile: undefined,
    per_page: 15,
};

const Users = () => {
    const queryClient = useQueryClient();
    const snackBar = useSnackbar();

    const [params, setParams] = useState<UserListParams>(initialParamsValue);
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const fetchData = async () => await User.list(params);
    const { isLoading, data } = useQuery(['orders', params], fetchData);

    const updateFilter = (event: ChangeEvent<HTMLInputElement>) => {
        setParams({ ...params, [event.target.name]: event.target.value });
    };

    const updatePagination = (
        field: 'current_page' | 'per_page',
        value: number | undefined
    ) => {
        setParams({ ...params, [field]: value });
    };

    const { mutateAsync: deleteUserFn } = useMutation({
        mutationFn: async (variables: UserDeleteInterface) => {
            await User.delete(variables);
            return null;
        },
        onSuccess: async (_, variables) => {
            const prevData: UserListResponse | undefined =
                queryClient.getQueryData(['orders', params]);

            if (!prevData) {
                return;
            }

            const updatedData: UserListResponse = {
                ...prevData,
                data: prevData.data.filter((u) => u.id !== variables.id),
                meta: {
                    ...prevData.meta,
                    total: prevData.meta.total - 1,
                },
            };

            queryClient.setQueryData(['orders', params], updatedData);
        },
    });

    const handleDeleteUser = (user: UserData) => {
        deleteUserFn({
            id: user.id,
        })
            .then(() => {
                snackBar.addSuccess(`User ${user.username} deleted`);
            })
            .catch((e) => {
                snackBar.addError(e.response.data);
            });
    };

    useEffect(() => {
        queryClient.invalidateQueries('orders', {});
    }, [params]);

    if (isLoading || !data) {
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
            <Stack direction="row" alignItems="end">
                <FormControl sx={{ flex: 1 }} size="sm">
                    <FormLabel>Search</FormLabel>
                    <Input
                        size="sm"
                        placeholder="Search by username, email or mobile"
                        startDecorator={<SearchIcon />}
                    />
                </FormControl>
                <IconButton
                    sx={{ ml: 2 }}
                    onClick={() => setShowFilters((prev) => !prev)}
                >
                    <FilterAltIcon />{' '}
                    <Typography level="body-md">Filters</Typography>
                </IconButton>
            </Stack>
            <Grid
                container
                spacing={2}
                sx={{
                    visibility: showFilters ? 'visible' : 'hidden',
                    height: showFilters ? 'auto' : 0,
                    mb: 1,
                }}
            >
                <Grid xs={2}>
                    <FormControl sx={{ flex: 1 }} size="sm">
                        <FormLabel>ID</FormLabel>
                        <Input
                            size="sm"
                            value={params.id}
                            name="id"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                updateFilter(e)
                            }
                            placeholder="Search by ID"
                            endDecorator={<FingerprintIcon />}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={2}>
                    <FormControl sx={{ flex: 1 }} size="sm">
                        <FormLabel>First Name</FormLabel>
                        <Input
                            size="sm"
                            name="first_name"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                updateFilter(e)
                            }
                            value={params.first_name}
                            placeholder="Search by first name"
                            endDecorator={<BadgeIcon />}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={2}>
                    <FormControl sx={{ flex: 1 }} size="sm">
                        <FormLabel>Last Name</FormLabel>
                        <Input
                            size="sm"
                            name="last_name"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                updateFilter(e)
                            }
                            value={params.last_name}
                            placeholder="Search by last name"
                            endDecorator={<BadgeIcon />}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={2}>
                    <FormControl sx={{ flex: 1 }} size="sm">
                        <FormLabel>Username</FormLabel>
                        <Input
                            size="sm"
                            name="username"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                updateFilter(e)
                            }
                            value={params.username}
                            placeholder="Search by username"
                            endDecorator={<PersonIcon />}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={2}>
                    <FormControl sx={{ flex: 1 }} size="sm">
                        <FormLabel>E-mail</FormLabel>
                        <Input
                            size="sm"
                            name="email"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                updateFilter(e)
                            }
                            value={params.email}
                            placeholder="Search by e-mail"
                            endDecorator={<EmailIcon />}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={2}>
                    <FormControl sx={{ flex: 1 }} size="sm">
                        <FormLabel>Mobile</FormLabel>
                        <Input
                            size="sm"
                            name="mobile"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                updateFilter(e)
                            }
                            value={params.mobile}
                            placeholder="Search by mobile"
                            endDecorator={<PhoneIphoneIcon />}
                        />
                    </FormControl>
                </Grid>
            </Grid>
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
                            {isLoading ? (
                                <UserListTableSkeleton
                                    lines={params.per_page}
                                />
                            ) : (
                                <>
                                    {data?.data.map((user: UserData) => (
                                        <tr
                                            key={user.id}
                                            style={{ width: '100%' }}
                                        >
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
                                                <IconButton
                                                    onClick={() =>
                                                        handleDeleteUser(user)
                                                    }
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}
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
                            onChange={async (_, newValue) => {
                                if (newValue) {
                                    setParams((prev) => ({
                                        ...prev,
                                        per_page: +newValue,
                                    }));
                                }
                            }}
                        >
                            {perPageOptions.map((i) => (
                                <Option value={i} key={i}>
                                    {i}
                                </Option>
                            ))}
                        </Select>
                        <Typography level="body-sm">
                            {data?.meta.from}-{data?.meta.to} of{' '}
                            {data?.meta.total} items
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <IconButton
                            color="primary"
                            disabled={params.current_page <= 1}
                            onClick={() => updatePagination('current_page', 1)}
                        >
                            <FirstPageIcon />
                        </IconButton>
                        <Button
                            startDecorator={<NavigateBeforeIcon />}
                            size="sm"
                            variant="plain"
                            disabled={params.current_page <= 1}
                            onClick={() =>
                                updatePagination(
                                    'current_page',
                                    params.current_page - 1
                                )
                            }
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
                            sx={{ width: 40, mr: 1 }}
                            onChange={(e) =>
                                updatePagination(
                                    'current_page',
                                    +e.target.value
                                )
                            }
                        />
                        of {data?.meta.last_page}
                        <Button
                            endDecorator={<NavigateNextIcon />}
                            size="sm"
                            variant="plain"
                            disabled={
                                !data ||
                                params.current_page >= data.meta.last_page
                            }
                            onClick={() =>
                                updatePagination(
                                    'current_page',
                                    params.current_page + 1
                                )
                            }
                        >
                            Next
                        </Button>
                        <IconButton
                            color="primary"
                            disabled={
                                !data ||
                                params.current_page >= data.meta.last_page
                            }
                            onClick={() =>
                                updatePagination(
                                    'current_page',
                                    data?.meta.last_page
                                )
                            }
                        >
                            <LastPageIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </div>
        </Box>
    );
};

export default Users;
