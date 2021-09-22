import db, {UserRow} from '../../db'

export default async function users(): Promise<UserRow[]> {
  const users: UserRow[] | undefined = await db.getAll('SELECT * FROM users')
  if (!users) {
    throw new Error(`Users not found`)
  }
  return users
}
