import {
    Box,
    Divider,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Sheet,
    Link,
    IconButton,
    Button,
    FormHelperText,
    Grid,
    LinearProgress,
    Switch,
} from '@mui/joy';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Typography from '@mui/joy/Typography';
import {
    Link as ReactRouterLink,
    useNavigate,
    useParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { UserSchema } from '../../validators/User.ts';
import { InfoOutlined } from '@mui/icons-material';
import { User } from '../../entities/User.ts';
import { useSnackbar } from '../../providers/SnackbarContextProvider.tsx';
import {
    UserCreateResponseError,
    UserListResponse,
    UserRequest,
    UserResource,
} from '../../entities/User.types.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const UserForm = () => {
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const [passwordSecurityLevel, setPasswordSecurityLevel] =
        useState<number>(0);
    const [user, setUser] = useState<UserResource>();
    const { userId } = useParams();
    const snackbar = useSnackbar();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isCreating = !user;

    const { mutateAsync: upsertUserFn } = useMutation({
        mutationFn: async (variables: UserRequest) => {
            return User.upsert(variables);
        },
        onSuccess: async (response) => {
            if (isCreating) {
                queryClient.setQueryData(
                    ['users'],
                    (previous: UserListResponse) => {
                        previous.data.unshift(response.data);
                    }
                );
            }

            queryClient.setQueriesData(
                {
                    queryKey: ['users'],
                },
                (previous: UserListResponse | undefined) => {
                    if (!previous) {
                        return undefined;
                    }

                    previous.data.map((user) =>
                        user.id === response.data.id ? response.data : user
                    );
                }
            );
        },
    });

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            email: '',
            mobile: '',
            birthday: '',
            is_admin: false,
        },
        validateOnChange: false,
        validateOnBlur: true,
        validationSchema: UserSchema(!userId),
        onSubmit: (values) => {
            upsertUserFn(values)
                .then((res) => {
                    snackbar.add({
                        text: `User ${res.data.username} ${isCreating ? 'created' : 'updated'} with successs`,
                        color: 'success',
                    });
                    navigate('/users');
                })
                .catch((e: UserCreateResponseError) => {
                    snackbar.add({
                        text:
                            e.response.status == 422
                                ? e.response.data.message
                                : 'Ops! Something gone wrong',
                        color: 'danger',
                    });
                });
        },
    });

    useEffect(() => {
        if (!userId) {
            return;
        }

        User.get(+userId)
            .then((res) => {
                setUser(res.data);
                formik.setValues({ ...res.data, password: '' });
            })
            .catch(() => snackbar.addError('Failed to load the user data'));
    }, []);

    useEffect(() => {
        const currentPassword = formik.values.password;
        let level = formik.values.password.length;

        const patterns = [/[A-Z]/, /[a-z]/, /[0-9]/, /[!@#$%^&*()]/];

        patterns.forEach((pattern) => {
            if (currentPassword.match(pattern)) {
                level += 15;
            }
        });

        setPasswordSecurityLevel(Math.min(level, 100));
    }, [formik.values.password]);

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
                        {user?.username ?? 'Create'}
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Box
                sx={{
                    mb: 1,
                }}
            >
                <Typography level="h2" component="h1">
                    {user ? `Editing ${user.username}` : 'Create user'}
                </Typography>
            </Box>
            <Sheet
                variant="outlined"
                sx={{
                    borderRadius: 'sm',
                }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2} sx={{ flexGrow: 1, p: 4 }}>
                        <Grid xs={6}>
                            <FormControl error={!!formik.errors.first_name}>
                                <FormLabel>First name</FormLabel>
                                <Input
                                    placeholder="John"
                                    id="first_name"
                                    name="first_name"
                                    onChange={formik.handleChange}
                                    value={formik.values.first_name}
                                />
                                {!!formik.errors.first_name && (
                                    <FormHelperText>
                                        <InfoOutlined />{' '}
                                        {formik.errors.first_name}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid xs={6}>
                            <FormControl error={!!formik.errors.last_name}>
                                <FormLabel>Last name</FormLabel>
                                <Input
                                    placeholder="Doe"
                                    id="last_name"
                                    name="last_name"
                                    onChange={formik.handleChange}
                                    value={formik.values.last_name}
                                />
                                {!!formik.errors.last_name && (
                                    <FormHelperText>
                                        <InfoOutlined />{' '}
                                        {formik.errors.last_name}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid xs={6}>
                            <FormControl error={!!formik.errors.username}>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    placeholder="Johndoe"
                                    id="username"
                                    name="username"
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                />
                                {!!formik.errors.username && (
                                    <FormHelperText>
                                        <InfoOutlined />{' '}
                                        {formik.errors.username}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid xs={6}>
                            {!userId && (
                                <FormControl error={!!formik.errors.password}>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        slotProps={{
                                            input: {
                                                autoComplete: 'new-password',
                                                maxLength: 30,
                                            },
                                        }}
                                        placeholder="*****"
                                        type={
                                            hidePassword ? 'password' : 'text'
                                        }
                                        endDecorator={
                                            <IconButton
                                                onClick={() =>
                                                    setHidePassword(
                                                        (prev) => !prev
                                                    )
                                                }
                                            >
                                                {hidePassword ? (
                                                    <VisibilityOffIcon
                                                        sx={{}}
                                                    />
                                                ) : (
                                                    <VisibilityIcon />
                                                )}
                                            </IconButton>
                                        }
                                        id="password"
                                        name="password"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                                    {formik.values.password && (
                                        <>
                                            <LinearProgress
                                                determinate
                                                size="sm"
                                                value={passwordSecurityLevel}
                                                sx={{
                                                    bgcolor:
                                                        'background.level3',
                                                    color: 'hsl(var(--hue) 80% 40%)',
                                                }}
                                            />
                                            <Typography
                                                level="body-xs"
                                                sx={{
                                                    alignSelf: 'flex-end',
                                                    color: 'hsl(var(--hue) 80% 30%)',
                                                }}
                                            >
                                                {passwordSecurityLevel < 30 &&
                                                    'Very weak'}
                                                {passwordSecurityLevel >= 30 &&
                                                    passwordSecurityLevel <
                                                        60 &&
                                                    'Weak'}
                                                {passwordSecurityLevel >= 60 &&
                                                    passwordSecurityLevel <
                                                        100 &&
                                                    'Strong'}
                                                {passwordSecurityLevel ===
                                                    100 && 'Very strong'}
                                            </Typography>
                                        </>
                                    )}
                                    {!!formik.errors.password && (
                                        <FormHelperText>
                                            <InfoOutlined />{' '}
                                            {formik.errors.password}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        </Grid>
                        <Grid xs={6}>
                            <FormControl error={!!formik.errors.email}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    slotProps={{
                                        input: {
                                            autoComplete: 'off',
                                        },
                                    }}
                                    placeholder="johndoe@gmail.com"
                                    autoComplete="no"
                                    id="email"
                                    name="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                {!!formik.errors.email && (
                                    <FormHelperText>
                                        <InfoOutlined /> {formik.errors.email}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid xs={6}>
                            <FormControl error={!!formik.errors.mobile}>
                                <FormLabel>
                                    Mobile{' '}
                                    <Typography level="body-xs">
                                        (optional)
                                    </Typography>
                                </FormLabel>
                                <Input
                                    slotProps={{
                                        input: {
                                            autoComplete: 'off',
                                        },
                                    }}
                                    placeholder="+44 20 7348 3500"
                                    id="mobile"
                                    name="mobile"
                                    onChange={formik.handleChange}
                                    value={formik.values.mobile}
                                />
                                {!!formik.errors.mobile && (
                                    <FormHelperText>
                                        <InfoOutlined /> {formik.errors.mobile}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid xs={6}>
                            <FormControl error={!!formik.errors.birthday}>
                                <FormLabel>
                                    Birthday{' '}
                                    <Typography level="body-xs">
                                        (optional)
                                    </Typography>
                                </FormLabel>
                                <Input
                                    slotProps={{
                                        input: {
                                            autoComplete: 'off',
                                        },
                                    }}
                                    placeholder="31/12/99"
                                    type="date"
                                    id="birthday"
                                    name="birthday"
                                    onChange={formik.handleChange}
                                    value={formik.values.birthday ?? ''}
                                />
                                {!!formik.errors.birthday && (
                                    <FormHelperText>
                                        <InfoOutlined />{' '}
                                        {formik.errors.birthday}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid xs={6}>
                            <FormControl
                                sx={{
                                    flexWrap: 'wrap',
                                    alignContent: 'flex-start',
                                }}
                            >
                                <FormLabel>Admin</FormLabel>
                                <Switch
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            'is_admin',
                                            e.target.checked
                                        )
                                    }
                                    checked={formik.values.is_admin}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Stack
                        direction="row"
                        justifyContent="end"
                        spacing={2}
                        sx={{ flexGrow: 1, p: 4 }}
                    >
                        <Link component={ReactRouterLink} to="/users">
                            <Button variant="plain">Cancel</Button>
                        </Link>
                        <Button type="submit">
                            {userId ? 'Update' : 'Create'}
                        </Button>
                    </Stack>
                </form>
            </Sheet>
        </Box>
    );
};

export default UserForm;
