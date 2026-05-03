import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Correo Electrónico", type: "email", placeholder: "ejemplo@docpol.pe" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        try {
          const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
          const apiUrl = rawApiUrl.replace(/\/$/, ""); // Remover slash final si existe
          console.log("Intentando login en:", `${apiUrl}/api/auth/login`);
          
          const res = await fetch(`${apiUrl}/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });
          
          const data = await res.json();
          console.log("Respuesta del backend:", res.status, data);
          
          if (res.ok && data.user) {
            return {
              ...data.user,
              apiToken: data.token,
            };
          }
          console.log("Login fallido:", data.error || "Credenciales incorrectas");
          return null;
        } catch (e) {
          console.error("Error en authorize fetch:", e);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.grado = user.grado;
        token.cargo = user.cargo;
        token.nombreCompleto = user.nombreCompleto;
        token.apiToken = user.apiToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.grado = token.grado;
      session.user.cargo = token.cargo;
      session.user.nombreCompleto = token.nombreCompleto;
      session.apiToken = token.apiToken;
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "DocPol_S3cr3t_Key_2026_Fallback",
});

export { handler as GET, handler as POST };
