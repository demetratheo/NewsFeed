import {useState} from 'react';
import Select from 'react-select'
import styled from 'styled-components'
import {useLazyQuery, gql} from '@apollo/client'
import InfiniteScroll from 'react-infinite-scroll-component';

import Card from '../Card'
import NewsfeedList from './NewsfeedList'

const GET_USER_NEWSFEED_QUERY = gql`
  query userNewsfeed($id: Int!, $page: Int!) {
    userNewsfeed(id: $id, page: $page) {
      name
      description
    }
  }
`

type Newsfeed = {
  name: string;
  description: string;
}

type QueryData = {
  userNewsfeed: Newsfeed[]
}

type QueryVars = {
  id: number;
  page: number;
}

type Props = {
  users: User[];
}

type User = {
  id: number;
  name: string;
}

export default function NewsfeedCard({users}: Props) {
  const usersSelect = users.map((u) => {return {label: u.name, value: u.id}})

  const [user, setUser] = useState();
  const [newsFeed, setNewsFeed] = useState([] as Newsfeed[]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [getUserNewsfeed, {}] = useLazyQuery<QueryData, QueryVars>(
    GET_USER_NEWSFEED_QUERY,
    {
      onCompleted: (data) => {
        if (data && data.userNewsfeed && data.userNewsfeed.length !== 0) {
          const newData = newsFeed.concat(data.userNewsfeed)
          setNewsFeed(newData)
          setHasMore(true)
        } else {
          setHasMore(false)
        }
      },
    }
  );

  return (
    <Card>
      <Rows>
        <h3>News Feed</h3>
        <SelectContainer>
          <Select
            options={usersSelect}
            value={user}
            placeholder={'Select...'}
            onChange={(newValue: any) => {
              setUser(newValue)
              setNewsFeed([])
              getUserNewsfeed({variables: {id: newValue.value, page: 1}})
              setPage(2)
            }}
          />
        </SelectContainer>
        <NewsfeedContainer>
          {(newsFeed && user) && (
            <InfiniteScroll
              loader={<h4>Loading...</h4>}
              dataLength={newsFeed.length}
              hasMore={hasMore}
              next={()=> {
                getUserNewsfeed({variables: {id: (user as any).value, page}})
                setPage(page + 1)
              }}
            >
              <NewsfeedList newsfeeds={newsFeed} />
            </InfiniteScroll>
          )}
        </NewsfeedContainer>
      </Rows>
    </Card>
  )
}

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 25rem;
`

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1.5rem;
  width: 100%;
`

const NewsfeedContainer = styled.div`
  display: inline-block;
  max-width: 25rem;
`
