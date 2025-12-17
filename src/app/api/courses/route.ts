import { NextResponse } from 'next/server';
import { get_all_courses } from '../../../database/database.js';
import {get_coures_by_key_word} from "../../../database/database.js";
//export const runtime = 'nodejs';

export async function GET(req: Request){
    const {searchParams} = new URL(req.url);
    const word = searchParams.get('key_word');
    const keyword = word === "" ? null: word
    const prerequisites = searchParams.get('prerequisites');
    const credits = searchParams.get('credits');
    console.log("credits: " + credits);
    console.log("prerequisites: " + prerequisites);
    console.log(keyword + " this is keyword");

    let courses;
    try{
        //if (!keyword){
        //    courses = await get_all_courses(); 
        //}
        //else {
        courses = await get_coures_by_key_word(keyword,prerequisites,credits);
        //}

        return NextResponse.json(courses); 
    } catch (error){
        console.log("Error fetching courses:", error);
        return NextResponse.json(error); 
    }


}
