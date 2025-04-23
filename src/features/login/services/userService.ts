import { User } from "@/shared/model";
import { getJsonPlaceholderGeneric } from "@/shared/baseService";

export function getUser(data: { username: string; emailAsPass: string }): Promise<User[]> {
  return getJsonPlaceholderGeneric(`users?username=${data.username}&email=${data.emailAsPass}`);
}
