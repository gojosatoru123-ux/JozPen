// import { auth } from '@/auth';
// import { handleUpload } from '@vercel/blob/client';
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//     const session = await auth();
//     // Make sure you first check if the user is authenticated!
//     const body = (await request.json());

//     try {
//         const jsonResponse = await handleUpload({
//             body,
//             request,
//             onBeforeGenerateToken: async (
//             ) => {
//                 return {
//                     allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
//                     allowOverwrite: true,
//                     tokenPayload: JSON.stringify({
//                         userId: session.id,
//                         // optional, sent to your server on upload completion
//                         // you could pass a user id from auth, or a value from clientPayload
//                     }),
//                 };
//             },
//             onUploadCompleted: async ({ blob, tokenPayload }) => {
//                 // Get notified of client upload completion
//                 // ⚠️ This will not work on `localhost` websites,
//                 // Use ngrok or similar to get the full upload flow

//                 console.log('blob upload completed', blob, tokenPayload);

//                 try {
//                     // Run any logic after the file upload completed
//                     const { userId, projectId } = JSON.parse(tokenPayload);
//                     console.log(`File uploaded for user: ${userId} and projectId: ${projectId}`)
//                 } catch (error) {
//                     console.log(error);
//                     throw new Error('Could not update user');
//                 }
//             },
//         });

//         return NextResponse.json(jsonResponse);
//     } catch (error) {
//         return NextResponse.json({ error: (error).message }, { status: 400 }, // The webhook will retry 5 times waiting for a 200
//         );
//     }
// }