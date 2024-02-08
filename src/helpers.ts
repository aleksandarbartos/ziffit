import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const randomEmail = require('random-email');
const passwordGenerator = require('generate-password');

export module Helpers {
    async function fetchData(nameType: NameTypes): Promise<string> {
    	try {
    		const response = await fetch(`https://www.randomlists.com/data/names-${nameType}.json`);
    		if (!response.ok) {
    			throw new Error('Network response was not ok');
    		}
    		return response.json();
    	} catch (error) {
    		console.error('Unable to fetch data:', error);
    		throw new Error('Error while fetching data');
    	}
    }

    export async function getFirstname () {
    	const json = JSON.stringify(await fetchData(NameTypes.firstName));
    	const jsonData = JSON.parse(json);
    	return jsonData.data[Math.floor(Math.random() * jsonData.data.length)];
    }

    export async function getLastname() {
    	const json = JSON.stringify(await fetchData(NameTypes.lastName));
    	const jsonData = JSON.parse(json);
    	return jsonData.data[Math.floor(Math.random() * jsonData.data.length)];
    }

    export function getEmail() {
    	return randomEmail({domain: 'ziffit.com'});
    }

    export function getPassword() {
    	return passwordGenerator.generate({
    		length: 8,
    		numbers: true,
    		symbols: false,
    		upperCase: false
    	});
    }

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

    export enum NameTypes {
        firstName = 'male',
        lastName = 'surnames'
    }
}