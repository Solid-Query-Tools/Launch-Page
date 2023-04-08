import { Admin } from '~/connection';
import { json } from 'solid-start';

function getJSONBody(body: BodyInit): object {
  return new Response(body, { headers: { 'Content-Type': 'application/json' }}).json()
}

function handleError(error: object): object {
  console.log(error)
  return {error}
}

export async function GET(){
    console.log('inside get request');
    console.log(await Admin.find({}));
    return json(await Admin.find({}).catch(error => handleError(error)))
}