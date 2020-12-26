import { API_URI } from "./constants";
import { getIdToken } from "./cognito";
import { Note, Patch } from "./types";

const getAuthorizationHeader = async () => {
  const idToken = await getIdToken();
  return `Bearer ${idToken.getJwtToken()}`;
};

export const getNotes = async (): Promise<Note[]> => {
  const Authorization = await getAuthorizationHeader();
  const response = await fetch(`${API_URI}/notes`, {
    headers: { Authorization },
  });
  if (!response.ok) throw Error(String(response.status));
  return response.json();
};

export const patchNotes = async (patch: Patch): Promise<void> => {
  const Authorization = await getAuthorizationHeader();
  const response = await fetch(`${API_URI}/notes`, {
    body: JSON.stringify(patch),
    headers: { Authorization, "Content-Type": "application/json" },
    method: "PATCH",
  });
  if (!response.ok) throw Error(String(response.status));
};
