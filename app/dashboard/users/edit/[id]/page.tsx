import { userSingle } from '@/app/lib/actions/users/users-action';
import UserUpdate from '@/app/ui/users/user-update';

export default async function Page({ params }: { params: { id: number } }) {
    const user = await userSingle(params.id);
    return (
        <>
            <h1>Edit User</h1>
            <UserUpdate userdata={user} />
        </>
    );
}