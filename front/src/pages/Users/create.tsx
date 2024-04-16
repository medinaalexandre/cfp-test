import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Sheet,
    Link,
    IconButton,
} from '@mui/joy';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Typography from '@mui/joy/Typography';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const CreateUser = () => {
    const [hidePassword, setHidePassword] = useState<boolean>(true);

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
                        Create
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Box
                sx={{
                    mb: 1,
                }}
            >
                <Typography level="h2" component="h1">
                    Create user
                </Typography>
            </Box>
            <Sheet
                variant="outlined"
                sx={{
                    borderRadius: 'sm',
                }}
            >
                <Stack spacing={2} sx={{ flexGrow: 1, p: 4 }}>
                    <Stack direction="row" spacing={2} sx={{ flex: '50%' }}>
                        <FormControl>
                            <FormLabel>First name</FormLabel>
                            <Input placeholder="John" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Last name</FormLabel>
                            <Input placeholder="Doe" />
                        </FormControl>
                    </Stack>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input placeholder="Johndoe" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            placeholder="johndoe@gmail.com"
                            autoComplete="no"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            autoComplete="no"
                            placeholder="*****"
                            type={hidePassword ? 'password' : 'text'}
                            endDecorator={
                                <IconButton>
                                    {hidePassword ? (
                                        <VisibilityOffIcon sx={{}} />
                                    ) : (
                                        <VisibilityIcon />
                                    )}
                                </IconButton>
                            }
                            onClick={() => setHidePassword((prev) => !prev)}
                        />
                    </FormControl>
                </Stack>
            </Sheet>
        </Box>
    );
};

export default CreateUser;
