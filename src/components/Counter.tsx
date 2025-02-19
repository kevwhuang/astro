import React from 'react';
import { useStore } from '@nanostores/react';

import { counter } from '@/store';

import '@/styles/components/Counter.scss';

function Counter(): React.ReactElement {
    return <p className="c-counter">{useStore(counter)}</p>;
}

export default Counter;
