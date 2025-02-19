import { persistentAtom, persistentMap } from '@nanostores/persistent';

export const counter = persistentAtom('counter', 0, { decode: Number, encode: String });

export const user = persistentMap<User>('user', {
    theme: 'light',
});
