import {useQuery, gql} from '@apollo/client'
import Layout from '../../components/Layout'
import NewsfeedCard from '../../components/newsfeed/NewsfeedCard'

const USERS_QUERY = gql`
  query users {
    users{
      id
      name
    }
  }
`

type QueryData = {
  users: User[];
}

type User = {
  id: number;
  name: string;
  bio: string;
  fellowship: "fellows" | "angels" | "writers";
  avatar_url: string;
  projects: Project[];
}

type Project = {
  id: number;
  name: string;
  icon_url: string;
}

export default function NewsFeedPage() {
  const {data, error, loading} = useQuery<QueryData>(
    USERS_QUERY,
  )
  const users = data?.users;

  if (!users || loading || error) {
    return null
  }

  return (
    <Layout>
      <NewsfeedCard users={users} />
    </Layout>
  )
}
