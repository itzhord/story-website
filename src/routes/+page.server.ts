import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GOOGLE_API } from '$env/static/private';

const genAI = new GoogleGenerativeAI(GOOGLE_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const prompt = "Write a story about a magic backpack.";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());




export const load = (async () => {
    
    return {
       
    };
}) satisfies PageServerLoad;


export const actions = {
	tell_story: async ({ request}) => {
        const data = await request.formData();
		const story = data.get('story');

        console.log(story)
		// const password = data.get('password');

        const prompt = `Write a story about a ${story}`;
        const result = await model.generateContent(prompt);
        let theStory = result.response.text()
console.log(result.response.text());
return{
    result:theStory,
    error:''
}
	},
} satisfies Actions;