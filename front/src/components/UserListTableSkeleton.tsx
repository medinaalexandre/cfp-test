import { ReactElement } from 'react';
import { Skeleton } from '@mui/joy';

const columns = 7;

interface UserListTableSkeletonInterface {
    lines: number | undefined | never;
}

const UserListTableSkeleton = ({
    lines,
}: UserListTableSkeletonInterface): ReactElement => {
    return (
        <>
            {[...Array(lines ?? 15)].map((_, idx) => (
                <tr key={idx}>
                    {[...Array(columns)].map((_, idx) => (
                        <td key={idx}>
                            <Skeleton variant="text" animation="wave" />
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
};

export default UserListTableSkeleton;
