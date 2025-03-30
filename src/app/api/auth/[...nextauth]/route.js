import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/connectDB";
import User from "@/models/User";

connectDB();

export const authOptions = {
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter your email address" },
                password: { label: "Password", type: "password", placeholder: "Enter Your Password" },
            },
            async authorize(credentials) {

                if (!credentials.email || !credentials.password) {
                    console.error("Email and password are required");
                    throw new Error("Email and password are required");
                }

                // Fetch user from the database
                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    console.error("User not found for email:", credentials.email);
                    throw new Error("User not found");
                }
                
                console.log("User authenticated successfully:", user);
                return { id: user._id, name: user.name, email: user.email, type: user.role , phone: user.phone };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.type = user.type;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.type) {
                session.user.type = token.type;
            }
            return session;
        },
    },
    maxAge: 60 * 60 * 24 * 30,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
