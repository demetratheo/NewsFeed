import styled from 'styled-components'

type Newsfeed = {
  name: string;
  description: string;
}

type Props = {
  newsfeeds: Newsfeed[];
}

export default function NewsfeedList({newsfeeds}: Props) {
  return (
    <List>
      {newsfeeds.map((newsfeed: Newsfeed, i) => (<ListItem key={i}>
        <Title>{newsfeed.name}</Title>
        <Body>{newsfeed.description}</Body>
      </ListItem>))}
    </List>
  )
}

const List = styled.div`
  display: inline-flex;
  flex-direction: column;
`

const ListItem = styled.div`
  border-top: 1px solid #c3c3c3;
  padding-top: 10px;
`
const Title = styled.span`
  color: #2a5ca8;
  font-weight: bold;
`

const Body = styled.p`
  padding-top: 10px;
`
