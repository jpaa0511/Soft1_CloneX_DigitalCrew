import styled from 'styled-components'
import { createContext, useEffect, useState } from 'react'

import ProfileHeader from './ProfileHeader'
import ProfileBio from './ProfileBio'
import TabList from './TabList'
import ProfileTweets from './ProfileTweets'

const Container = styled.div`
  --profile-image-size: 120px;

  .tab-list {
    margin-top: 30px;
  }
`

export default function ProfileContent() {

  return (
      <Container>
        <ProfileHeader />
        <main>
          <ProfileBio />
          <div className="tab-list">
            <TabList />
          </div>
          <ProfileTweets />
        </main>
      </Container>
  )
}
