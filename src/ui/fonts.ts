import { Roboto, Charm } from 'next/font/google';

export const roboto = Roboto({
    weight: ['100', '300', '400','500', '700', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-roboto'
});

export const charm = Charm({
    weight: ['400','700'],
    style: ['normal'],
    subsets: ['latin'],
    variable: '--font-charm'
});
