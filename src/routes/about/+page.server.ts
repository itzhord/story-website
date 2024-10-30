import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load = (async (

) => {
    return {};
}) satisfies PageServerLoad;


export const actions: Actions = {
    default: async ({ cookies, request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const age = data.get('age');

        let info  = `Name: ${name} and Age: ${age}`

        console.log(info)
        return{
         info
        }
	},
};