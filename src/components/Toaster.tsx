import React from 'react';

import { Toaster as HotToaster } from 'react-hot-toast';

import '@/styles/components/Toaster.scss';

function Toaster(): React.ReactElement {
    return (
        <HotToaster
            gutter={18}
            position="bottom-right"
            reverseOrder
            toastOptions={{ className: 'c-toaster', duration: 5000 }}
        />
    );
}

export default Toaster;
