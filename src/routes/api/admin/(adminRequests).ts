import { Admin } from '~/connection';

import { json } from 'solid-start';

function getJSONBody(body: BodyInit): object {
  return new Response(body, { headers: { 'Content-Type': 'application/json' }}).json()
}

function handleError(error: object): object {
  console.log(error)
  return {error}
}

export async function POST({request}){
  // get json body
   const body = await getJSONBody(request.body)
   console.log('request body: ', body);

  // create new todo in database
  await Admin.create(body).catch(error => handleError(error))
  // return all todos as json
  return json(await Admin.find({}).catch(error => handleError(error)))
}