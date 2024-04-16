import { FormControl, FormLabel, Input } from '@mui/joy';

const CreateUser = () => {
    return (
        <>
            <FormControl>
                <FormLabel>First name</FormLabel>
                <Input placeholder="John" />
            </FormControl>
        </>
    );
};

export default CreateUser;
