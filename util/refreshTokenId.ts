import { getAuth } from "firebase/auth";

export default async function refreshTokenId(): Promise<string | null> {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken(false);
    if (token) {
      return Promise.resolve(token);
    }
    return Promise.resolve(null);
  }
  return Promise.resolve(null);
}
