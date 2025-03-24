import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

const users = [
    {
        id: 1,
        name: 'John Doe',
        email: "john1@example.com",
        type: "admin",
        password: bcrypt.hashSync("john123", 10),
    },
    {
        id: 2,
        name: 'Sam Smith',
        email: "sam@example.com",
        type: "user",
        password: bcrypt.hashSync("sam123", 10),
    },
    {
        id: 3,
        name: 'Sara Smith',
        email: "sara@example.com",
        type: "moderator", 
        password: bcrypt.hashSync("sarah123", 10),
    },
    {
        id: 4,
        name: 'David Doe',
        email: "david@example.com",
        type: "user",
        password: bcrypt.hashSync("david123", 10),
    }
]

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
                    throw new Error("Email and password are required")
                }

                const user = users.find((user) => user.email === credentials.email)
                if (!user) {
                    throw new Error("User not found")
                }

                const isValidPassword = await bcrypt.compare(credentials.password, user.password)
                if (!isValidPassword) {
                    throw new Error("Invalid credentials")
                }

                return { id: user.id, name: user.name, email: user.email, type: user.type }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            console.log(token)
            if (user) {
                token.type = user.type
            }
            return token
        },
        async session({ session, token }) {
            if (token?.type) {
                session.user.type = token.type
            }
            return session
        }
    },
    maxAge: 60 * 60 * 24 * 30,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
