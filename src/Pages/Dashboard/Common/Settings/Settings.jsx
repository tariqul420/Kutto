import AccountSettings from '../../../../Components/Dashboard/Settings/AccountSettings'
import BillingAddress from '../../../../Components/Dashboard/Settings/BillingAddress';
import ChangePassword from '../../../../Components/Dashboard/Settings/ChangePassword';
import useAuth from '../../../../Hook/useAuth';

const Settings = () => {
    const { user } = useAuth()

    const isEmailPasswordUser = user?.providerData.some(
        (provider) => provider.providerId === "password"
    );

    return (
        <div>
            <AccountSettings />
            <BillingAddress />
            {
                isEmailPasswordUser && <ChangePassword />
            }
        </div>
    );
};

export default Settings;