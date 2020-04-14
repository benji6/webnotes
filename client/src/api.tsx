import { apiUri } from "./constants";
import { getIdToken } from "./cognito";
import { Note } from "./types";

const getAuthorizationHeader = async () => {
  const idToken = await getIdToken();
  return `Bearer ${idToken.getJwtToken()}`;
};

export const deleteNote = async (body: {
  dateCreated: string;
}): Promise<void> => {
  const Authorization = await getAuthorizationHeader();
  const response = await fetch(`${apiUri}/notes`, {
    body: JSON.stringify(body),
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
  if (!response.ok) throw Error(String(response.status));
};

export const getNotes = async (): Promise<Note[]> => {
  const Authorization = await getAuthorizationHeader();
  const response = await fetch(`${apiUri}/notes`, {
    headers: { Authorization },
  });
  if (!response.ok) throw Error(String(response.status));
  return response.json();
};

export const putNote = async (note: {
  body: string;
  dateCreated: string;
  dateUpdated: string;
}): Promise<void> => {
  const Authorization = await getAuthorizationHeader();
  const response = await fetch(`${apiUri}/notes`, {
    body: JSON.stringify(note),
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
    method: "PUT",
  });
  if (!response.ok) throw Error(String(response.status));
};
