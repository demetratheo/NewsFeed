import db from '../../db'
import getUser from './user'

type Args = {
  id: number;
  page: number;
}

type Newsfeed = {
  name: string;
  description: string;
}

export default async function userNewsfeed(parent: unknown, {id, page}: Args): Promise<Newsfeed[]> {
  const user = await getUser(null, {id})
  const fellowships = findAnnouncementFellowship(user.fellowship)

  const rowNumb = 3;
  const start = (page - 1) * rowNumb;
  const newsfeed: Newsfeed[] | undefined = await db.getAll(
    ` SELECT * FROM
        (SELECT title AS name, body AS description
          FROM announcements
          WHERE fellowship IN(${fellowships.map(f=> `'${f}'`).join(',')})
          ORDER BY created_ts DESC
          LIMIT ${start}, ${rowNumb})
      ${['founders', 'angels'].includes(user.fellowship) ? projectsQuery(start, rowNumb, user.id) : ''}
      `,
  )

  return newsfeed
}

const projectsQuery = (start: number, rowNumb: number, userId: number) => `
  UNION
    SELECT * FROM
      (SELECT DISTINCT p.name, description
        FROM user_projects up
        JOIN users u ON up.user_id = u.id
        JOIN projects p ON p.id = up.project_id
        WHERE u.fellowship = "founders"
        AND u.id != ${userId}
        ORDER BY p.created_ts DESC
        LIMIT ${start}, ${rowNumb})
`

function findAnnouncementFellowship(userFellowship: string){
  switch (userFellowship) {
    case 'founders':
      return ['angels', 'founders', 'all']
    case 'angels':
      return ['angels', 'founders', 'all']
    case 'writers':
      return ['writers', 'all']
    default:
      return []
  }
}
