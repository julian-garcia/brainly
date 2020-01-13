import React from "react"
import Page from "../../components/page"
import SEO from "../../components/seo"
import { Link } from "gatsby"
import { useIdentityContext } from "react-netlify-identity-widget"
import { FirebaseContext, useFirebase } from "gatsby-plugin-firebase"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'

const MindMapPage = () => {
  const identity = useIdentityContext()
  const firebase = React.useContext(FirebaseContext)
  const [userMaps, setUserMaps] = React.useState()
  const [title, setTitle] = React.useState()
  const [exists, setExists] = React.useState()

  useFirebase(firebase => {
    if (identity.isLoggedIn) {
      firebase
        .database()
        .ref('/mindmap')
        .once('value')
        .then(snapshot => {
          setUserMaps(Object.values(snapshot.val()[identity.user.id]))
        })
    }
  }, [])

  function addMindMap(userId) {
    return function(e){
      const mindMapExists = userMaps ? userMaps.filter(item => item.title === title) : '';

      if (!mindMapExists || mindMapExists.length === 0) {
        if (title) {
          firebase.database().ref(`/mindmap/${userId}`).push({'title': title});
          setExists('added');
        }
      }

      firebase
        .database()
        .ref('/mindmap')
        .once('value')
        .then(snapshot => {
          setUserMaps(Object.values(snapshot.val()[identity.user.id]))
        })
    }
  }

  function titleChange(e) {
    setTitle(e.target.value);
    setExists('already exists');
  }

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
      <h1>Add a Mind Map</h1>
      <Link to="/mind-maps" className="top-link">
        <FontAwesomeIcon icon={faArrowCircleLeft} />
      </Link>
      <input type="text" name="title" id="title" onChange={titleChange} />
      <button type="submit" onClick={addMindMap(identity.user.id)} className="inline page-nav__item">Add</button>
      {(userMaps) ? userMaps.map(mindmap => (
        (mindmap.title === title) ? <h2>Mindmap {mindmap.title} {exists} &#128578;</h2> : '' 
      )) : ''}
    </Page>
  )
}

export default MindMapPage
