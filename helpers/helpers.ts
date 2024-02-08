export function randomizeData<T>(array: Array<T>): T {
    return array[Math.floor(Math.random() * array.length)];
}

export enum MenuItems {
    Sell = 'Sell',
    HowItWorks = 'How It Works',
    ZiffitApp = 'Ziffit App',
    AboutUs = 'About Us',
    Help = 'Help'
}
