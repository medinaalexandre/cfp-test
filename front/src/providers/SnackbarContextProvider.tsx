import {
    createContext,
    ReactElement,
    ReactNode,
    useContext,
    useState,
} from 'react';
import { Snackbar } from '@mui/joy';
import { DefaultColorPalette } from '@mui/joy/styles/types/colorSystem';
import InfoIcon from '@mui/icons-material/Info';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

interface SnackbarProviderInterface {
    children: ReactElement;
}

interface SnackbarContextInterface {
    add: (data: SnackbarData) => void;
    addSuccess: (text: string) => void;
    addError: (text: string) => void;
}

interface SnackbarData {
    text: string;
    color: DefaultColorPalette;
}

const SnackbarContext = createContext({} as SnackbarContextInterface);
export const useSnackbar = () => useContext(SnackbarContext);

const SnackbarContextProvider = ({ children }: SnackbarProviderInterface) => {
    const [data, setData] = useState<SnackbarData>({} as SnackbarData);
    const [open, setOpen] = useState<boolean>(false);

    const iconByType = (): ReactNode => {
        switch (data.color) {
            case 'primary':
            case 'neutral':
                return <InfoIcon />;
            case 'danger':
                return <ErrorIcon />;
            case 'success':
                return <DoneIcon />;
            case 'warning':
                return <WarningIcon />;
        }
    };

    const add = (data: SnackbarData) => {
        setData(data);
        setOpen(true);
    };

    const addSuccess = (text: string) => {
        add({
            text,
            color: 'success',
        });
    };

    const addError = (text: string) => {
        add({
            text,
            color: 'danger',
        });
    };

    return (
        <SnackbarContext.Provider value={{ add, addSuccess, addError }}>
            <div>
                <Snackbar
                    open={open}
                    onClose={() => {
                        setOpen(false);
                    }}
                    autoHideDuration={5000}
                    startDecorator={iconByType()}
                    color={data.color}
                >
                    {data.text}
                </Snackbar>
                {children}
            </div>
        </SnackbarContext.Provider>
    );
};

export default SnackbarContextProvider;
