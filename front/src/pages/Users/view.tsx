import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { User } from '../../entities/User.ts';
import {
    Link as ReactRouterLink,
    useNavigate,
    useParams,
} from 'react-router-dom';
import { UserViewResource } from '../../entities/User.types.ts';
import { useSnackbar } from '../../providers/SnackbarContextProvider.tsx';
import {
    Box,
    Button,
    Chip,
    ChipDelete,
    CircularProgress,
    DialogActions,
    DialogContent,
    FormControl,
    FormLabel,
    Link,
    Modal,
    ModalDialog,
    Option,
    Select,
    Stack,
} from '@mui/joy';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Typography from '@mui/joy/Typography';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import Sheet from '@mui/joy/Sheet';
import {
    AccountBox,
    AddCircle,
    AddModerator,
    NavigateBefore,
    Security,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { Role as RoleEntity } from '../../entities/Role.ts';
import { Role } from '../../entities/Role.types.ts';

const UserView = () => {
    const [user, setUser] = useState<UserViewResource>({} as UserViewResource);
    const [roleToDelete, setRoleToDelete] = useState<Role>();
    const [roleToAdd, setRoleToAdd] = useState<Role>();
    const [isAddRoleModalOpen, setIsAddRoleModalOpen] =
        useState<boolean>(false);
    const { userId } = useParams();
    const snackBar = useSnackbar();
    const navigate = useNavigate();

    const fetchRoles = async () => await RoleEntity.list();
    const { data: roles } = useQuery({
        queryKey: ['roles'],
        queryFn: fetchRoles,
        staleTime: 60 * 1000,
    });

    const addRole = () => {
        if (!user || !roleToAdd) {
            return;
        }

        User.addRole(user.id, roleToAdd.id)
            .then(() => {
                setUser((prev) => ({
                    ...prev,
                    roles: [...prev.roles, roleToAdd],
                }));
                snackBar.addSuccess(`Role ${roleToAdd.name} added`);
                setRoleToAdd(undefined);
                setIsAddRoleModalOpen(false);
            })
            .catch((e) => snackBar.addError(e.response.data));
    };

    const removeRole = () => {
        if (!user || !roleToDelete) {
            return;
        }

        User.deleteRole(user.id, roleToDelete.id)
            .then(() => {
                setUser((prev) => ({
                    ...prev,
                    roles: prev.roles.filter((i) => i.id !== roleToDelete.id),
                }));
            })
            .catch((e) => snackBar.addError(e.message))
            .finally(() => setRoleToDelete(undefined));
    };

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
                px: {
                    xs: 1.5,
                    sm: 4,
                },
                py: 4,
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'column',
                gap: 1,
            }}
        >
            <Box
                sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
            >
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
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                }}
            >
                <Stack direction="row" gap={4} flexWrap="wrap">
                    <div>
                        <Typography level="title-lg" sx={{ mb: 2 }}>
                            About <AccountBox />
                        </Typography>
                        <Typography>
                            <b>First name:</b> {user.first_name}
                        </Typography>
                        <Typography>
                            <b>Last name:</b> {user.last_name}
                        </Typography>
                        <Typography>
                            <b>Birthday:</b>{' '}
                            {user.birthday ? user.birthday : '-'}
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
                            <b>Mobile:</b> {user.mobile ? user.mobile : '-'}
                        </Typography>
                    </div>
                    <div>
                        <Typography level="title-lg" sx={{ mb: 2 }}>
                            Credentials <Security />
                        </Typography>
                        <Typography>
                            <b>Admin:</b> {user.is_admin ? 'Yes' : 'No'}
                        </Typography>
                        <Stack gap={2} direction="row">
                            <Typography>
                                <b>Credentials:</b>
                            </Typography>
                            {user.roles?.length
                                ? user.roles.map((role) => (
                                      <Chip
                                          key={role.id}
                                          color="primary"
                                          endDecorator={
                                              <ChipDelete
                                                  onDelete={() =>
                                                      setRoleToDelete(role)
                                                  }
                                              />
                                          }
                                      >
                                          {role.name}
                                      </Chip>
                                  ))
                                : '-'}
                        </Stack>
                    </div>
                </Stack>
                <Stack
                    direction="row"
                    sx={{ mt: 2 }}
                    gap={2}
                    flexWrap="wrap"
                    justifyContent="flex-end"
                >
                    <div>
                        <Button
                            component={ReactRouterLink}
                            to="/users"
                            variant="outlined"
                            startDecorator={<NavigateBefore />}
                        >
                            Back to the list
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="soft"
                            startDecorator={<AddModerator />}
                            sx={{ minWidth: 159 }}
                            onClick={() => setIsAddRoleModalOpen(true)}
                        >
                            Add role
                        </Button>
                    </div>
                </Stack>
            </Sheet>
            <Modal
                open={!!roleToDelete}
                onClose={() => setRoleToDelete(undefined)}
            >
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogContent>
                        <Box>
                            <Typography>
                                Are you sure you want to remove role{' '}
                                <b>{roleToDelete?.name}</b> from{' '}
                                <b>{user.username}</b>
                            </Typography>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="solid"
                            color="danger"
                            onClick={removeRole}
                        >
                            Remove role
                        </Button>
                        <Button
                            variant="plain"
                            color="neutral"
                            onClick={() => setRoleToDelete(undefined)}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
            <Modal
                open={isAddRoleModalOpen}
                onClose={() => setIsAddRoleModalOpen(false)}
            >
                <ModalDialog>
                    <DialogContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                        }}
                    >
                        <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>
                                <Typography>Select a role</Typography>
                            </FormLabel>
                            <Select
                                onChange={(
                                    event: SyntheticEvent | null,
                                    newValue
                                ) => {
                                    if (!event || !newValue) {
                                        return;
                                    }
                                    const { target } =
                                        event as ChangeEvent<HTMLInputElement>;

                                    setRoleToAdd({
                                        id: +newValue,
                                        name: target.innerText,
                                    });
                                }}
                            >
                                {roles?.data.map((i) => (
                                    <Option key={i.id} value={i.id}>
                                        {i.name}
                                    </Option>
                                ))}
                            </Select>
                        </FormControl>
                        <Button variant="plain" onClick={addRole}>
                            <AddCircle />
                        </Button>
                    </DialogContent>
                </ModalDialog>
            </Modal>
        </Box>
    );
};

export default UserView;
