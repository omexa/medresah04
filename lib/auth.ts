// import NextAuth, { DefaultSession } from "next-auth";
// import { DefaultJWT, JWT } from "next-auth/jwt";
// import credentials from "next-auth/providers/credentials";
// import { z, ZodError } from "zod";

// import prisma from "./db";
// import bycrypt from "bcryptjs";

// declare module "next-auth" {
//   interface User {
//     id?: string;
//     role: string;
//     email?: string | null;
//     permission: string[];
//   }
// }
// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     id?: string;
//     role: string;
//     email?: string | null;
//     permission: string[];
//   }
// }

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       if (auth?.user) {
//         return true;
//       } else return false;
//     },
//     // authorized() {
//     //   return true;
//     // },

//     jwt({ token, user }) {
//       if (user) {
//         token.email = user.email;
//         token.role = user.role;
//         token.id = user.id;
//         token.permission = user.permission;
//       }
//       return token;
//     },
//     session({ session, token }) {
//       if (token.email && token.id) {
//         session.user.role = token?.role;
//         session.user.id = token.id;
//         session.user.email = token.email;
//         session.user.permission = token.permission;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
//   providers: [
//     credentials({
//       async authorize(credentials, request) {
//         try {
//           const { email, password } = await z
//             .object({
//               email: z.string().email(),
//               password: z.string().min(1),
//             })
//             .parseAsync(credentials);
//           if (email) {
//             const user = await prisma.user.findFirst({
//               where: {
//                 email: email,
//               },
//               select: {
//                 id: true,
//                 fname: true,
//                 role: true,
//                 password: true,
//                 lname: true,
//                 email: true,
//                 permissions: {
//                   select: {
//                     name: true,
//                   },
//                 },
//               },
//             });
//             if (user) {
//               if (await bycrypt.compare(password, user.password)) {
//                 return {
//                   id: user.id,
//                   name: user.fname + " " + user.lname,
//                   role: user.role,
//                   email: user.email,
//                   permission: user.permissions.map((perm) => perm.name),
//                 };
//               }
//               throw Error("Incorrect Password");
//             }
//             throw Error("Invalid Email");
//           }
//           throw Error("Invalid Credentials");
//         } catch (error) {
//           return null;
//         }
//       },
//     }),
//   ],
// });
