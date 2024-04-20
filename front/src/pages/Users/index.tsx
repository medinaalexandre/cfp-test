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
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
    Button,
    Chip,
    Divider,
    Dropdown,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    Input,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    Option,
    Select,
    Sheet,
    Stack,
    Table,
} from '@mui/joy';
import { User } from '../../entities/User.ts';
import {
    UserResource,
    UserDeleteInterface,
    UserListParams,
    UserListResponse,
} from '../../entities/User.types.ts';
import Typography from '@mui/joy/Typography';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { perPageOptions } from '../../constants/pagination.ts';
import UserListTableSkeleton from '../../components/UserListTableSkeleton.tsx';
import { useSnackbar } from '../../providers/SnackbarContextProvider.tsx';
import { isMobile } from 'react-device-detect';
import { MoreVert } from '@mui/icons-material';

export const initialParamsValue: UserListParams = {
    current_page: 1,
    email: '',
    first_name: '',
    username: '',
    id: null,
    last_name: '',
    mobile: '',
    per_page: 15,
};

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const Users = () => {
    const queryClient = useQueryClient();
    const snackBar = useSnackbar();
    const navigate = useNavigate();

    const [params, setParams] = useState<UserListParams>(initialParamsValue);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const debouncedParamsValue = useDebounce<UserListParams>(params, 200);

    const fetchData = async () => await User.list(debouncedParamsValue);
    const { isLoading, data } = useQuery({
        queryKey: ['orders', debouncedParamsValue],
        queryFn: fetchData,
        staleTime: 20 * 1000,
    });

    const updateFilter = (event: ChangeEvent<HTMLInputElement>) => {
        setParams({
            ...params,
            [event.target.name]: event.target.value,
            current_page: 1,
        });
    };

    const updatePagination = async (
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
                queryClient.getQueryData(['orders', debouncedParamsValue]);

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

    const handleDeleteUser = (user: UserResource) => {
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

    const renderMobileUserList = () => (
        <>
            {data?.data.map((user) => (
                <>
                    <Box sx={{ p: 2, position: 'relative' }} key={user.id}>
                        <div
                            style={{
                                position: 'absolute',
                                top: 12,
                                right: 5,
                            }}
                        >
                            <Dropdown>
                                <MenuButton
                                    slots={{ root: IconButton }}
                                    slotProps={{
                                        root: {
                                            variant: 'plain',
                                            color: 'neutral',
                                        },
                                    }}
                                >
                                    <MoreVert />
                                </MenuButton>
                                <Menu placement="bottom-end">
                                    <MenuItem>
                                        <IconButton
                                            size="sm"
                                            onClick={() =>
                                                navigate(`/users/${user.id}`)
                                            }
                                        >
                                            <ArrowForwardIosIcon />
                                            <Typography
                                                style={{ marginLeft: 5 }}
                                            >
                                                View
                                            </Typography>
                                        </IconButton>
                                    </MenuItem>
                                    <MenuItem>
                                        <IconButton
                                            size="sm"
                                            onClick={() =>
                                                navigate(
                                                    `/users/${user.id}/edit`
                                                )
                                            }
                                        >
                                            <EditIcon />
                                            <Typography
                                                style={{ marginLeft: 5 }}
                                            >
                                                Edit
                                            </Typography>
                                        </IconButton>
                                    </MenuItem>
                                    <MenuItem>
                                        <IconButton
                                            size="sm"
                                            onClick={() =>
                                                handleDeleteUser(user)
                                            }
                                        >
                                            <DeleteIcon />
                                            <Typography
                                                style={{ marginLeft: 5 }}
                                            >
                                                Delete
                                            </Typography>
                                        </IconButton>
                                    </MenuItem>
                                </Menu>
                            </Dropdown>
                        </div>

                        <Link
                            component={ReactRouterLink}
                            to={`/users/${user.id}`}
                        >
                            <Typography
                                endDecorator={
                                    user.is_admin && (
                                        <Chip size="sm" color="primary">
                                            admin
                                        </Chip>
                                    )
                                }
                            >
                                {user.id} - <b>{user.username}</b>
                            </Typography>
                        </Link>

                        <Typography sx={{ pb: 2 }} level="body-sm">
                            {user.first_name} {user.last_name}{' '}
                            {!!user.birthday && `(${user.birthday})`}
                        </Typography>
                        <Typography>
                            <EmailIcon /> {user.email}
                        </Typography>
                        <Typography>
                            <PhoneIphoneIcon /> {user.mobile}
                        </Typography>
                    </Box>
                    <Divider sx={{ m: 1 }} />
                </>
            ))}
        </>
    );
    const renderTableList = () => (
        <Table
            stickyHeader
            stickyFooter
            stripe="odd"
            hoverRow
            sx={{ overflowX: 'scroll' }}
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
                    <UserListTableSkeleton lines={params.per_page} />
                ) : (
                    <>
                        {data?.data.map((user: UserResource) => (
                            <tr key={user.id}>
                                <td>
                                    <Typography level="body-sm">
                                        {user.id}
                                    </Typography>
                                </td>
                                <td>
                                    <Link
                                        component={ReactRouterLink}
                                        to={`/users/${user.id}`}
                                    >
                                        <Typography
                                            level="body-sm"
                                            endDecorator={
                                                user.is_admin && (
                                                    <Chip
                                                        size="sm"
                                                        color="primary"
                                                    >
                                                        admin
                                                    </Chip>
                                                )
                                            }
                                        >
                                            {user.username}{' '}
                                        </Typography>
                                    </Link>
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
                                <td>
                                    <IconButton
                                        onClick={() =>
                                            navigate(`/users/${user.id}/edit`)
                                        }
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        sx={{
                                            ':hover': {
                                                backgroundColor:
                                                    'var(--joy-palette-danger-800)',
                                                color: 'var(--joy-palette-danger-300)',
                                            },
                                        }}
                                        onClick={() => handleDeleteUser(user)}
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
    );

    return (
        <Box
            sx={{
                height: '100dvh',
                px: isMobile ? 2 : 4,
                py: isMobile ? 0 : 4,
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
                    flexDirection: 'row',
                    alignItems: 'center',
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
                        name="search"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            updateFilter(e)
                        }
                    />
                </FormControl>
                <IconButton
                    sx={{ ml: 2 }}
                    onClick={() => setShowFilters((prev) => !prev)}
                >
                    <FilterAltIcon />
                    {isMobile ? (
                        ''
                    ) : (
                        <Typography level="body-md">Filters</Typography>
                    )}
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
                <Grid xs={6} md={2}>
                    <FormControl sx={{ flex: 1 }} size="sm">
                        <FormLabel>ID</FormLabel>
                        <Input
                            size="sm"
                            value={params.id ?? ''}
                            name="id"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                updateFilter(e)
                            }
                            placeholder="Search by ID"
                            endDecorator={<FingerprintIcon />}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={6} md={2}>
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
                <Grid xs={6} md={2}>
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
                <Grid xs={6} md={2}>
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
                <Grid xs={6} md={2}>
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
                <Grid xs={6} md={2}>
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
                    {isMobile ? renderMobileUserList() : renderTableList()}
                </Sheet>
                <Stack
                    sx={{ py: 2 }}
                    direction="row"
                    flexWrap="wrap"
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
                            {!isMobile && 'Previous'}
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
                            {!isMobile && 'Next'}
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
