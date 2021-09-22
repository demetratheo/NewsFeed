import styled from 'styled-components'

export default function Layout({children}: React.PropsWithChildren<{}>) {
  return (
    <Container>
      <Main>
        {children}
      </Main>
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Main = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 10px;
`
