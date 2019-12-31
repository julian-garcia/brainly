import React from "react"
import Page from "../components/page"
import SEO from "../components/seo"
import { useIdentityContext } from "react-netlify-identity-widget"
import { useFirebase } from "gatsby-plugin-firebase"

const MindMapPage = () => {
  const identity = useIdentityContext()
  const [mindMaps, setMindMaps] = React.useState()

  useFirebase(firebase => {
    firebase
      .database()
      .ref('/mindmap')
      .once('value')
      .then(snapshot => {
        console.log(Object.values(snapshot.val()[identity.user.id]))
        setMindMaps(Object.values(snapshot.val()[identity.user.id]))
      })
  }, [])

  if (!identity.isLoggedIn) {
    return (
      <Page>
        <SEO title="Mind Maps" />
        <h1>Mind Maps</h1>
        <h2>Please log in</h2>
      </Page>
    )
  }

  return (
    <Page>
      <SEO title="Mind Maps" />
      <h1>Mind Maps</h1>
      {mindMaps ? mindMaps.map(mindmap => (
        <h2>{mindmap.title}</h2>
      )) : <h2>No mind maps</h2>}
    </Page>
  )
}

export default MindMapPage
