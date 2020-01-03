import React from "react"
import Page from "../components/page"
import SEO from "../components/seo"
import { Link } from "gatsby"
import { useIdentityContext } from "react-netlify-identity-widget"
import { useFirebase } from "gatsby-plugin-firebase"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const MindMapPage = () => {
  const identity = useIdentityContext()
  const [mindMaps, setMindMaps] = React.useState()
  const [mindMapIndexes, setMindMapIndexes] = React.useState()
  
  useFirebase(firebase => {
    if (identity.isLoggedIn) {
      firebase
        .database()
        .ref('/mindmap')
        .once('value')
        .then(snapshot => {
          setMindMapIndexes(Object.keys(snapshot.val()[identity.user.id]))
          setMindMaps(Object.values(snapshot.val()[identity.user.id]))
        })
    }
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
      <Link to="/mind-maps/add" className="top-link">
        <FontAwesomeIcon icon={faPlusCircle} />
      </Link>
      <div className="map-links">
        {mindMaps ? (mindMaps.length > 0) ? mindMaps.map((mindmap, index) => (
          <Link to={`/mind-maps/edit?mapid=${mindMapIndexes[index]}`} className="map-link">{mindmap.title}</Link>
        )) : <h2>No mind maps</h2> : <h2>Loading...</h2>}
      </div>
    </Page>
  )
}

export default MindMapPage
