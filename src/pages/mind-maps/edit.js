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
  const [userMap, setUserMap] = React.useState()
  const [userMapKeys, setUserMapKeys] = React.useState()
  const [branch, setBranch] = React.useState()
  let mapId = '';

  if (identity.isLoggedIn) {
    if (window.location.href.indexOf('=') === -1) window.location.href = '/mind-maps';
    mapId = window.location.href.split('=')[1].split('&')[0]
  }

  useFirebase(firebase => {
    if (identity.isLoggedIn) {
      firebase
        .database()
        .ref(`/mindmap`)
        .once('value')
        .then(snapshot => {
          setUserMapKeys(Object.keys(snapshot.val()[identity.user.id][mapId]))
          setUserMap(Object.values(snapshot.val()[identity.user.id][mapId]))
        })
    }
  }, [])

  function changeBranch(e) {
    setBranch(e.target.value);
  }

  function addBranch(userId) {
    return function(e) {
      if (branch) {
        firebase.database().ref(`/mindmap/${userId}/${mapId}`).push(branch)
      }

      firebase
        .database()
        .ref('/mindmap')
        .once('value')
        .then(snapshot => {
          setUserMap(Object.values(snapshot.val()[identity.user.id][mapId]))
        })
    }
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
      <h1>Edit Mind Map</h1>
      <Link to="/mind-maps" className="top-link">
        <FontAwesomeIcon icon={faArrowCircleLeft} />
      </Link>
      <input type="text" name="branch" id="branch" onChange={changeBranch} />
      <button type="submit" onClick={addBranch(identity.user.id)} className="inline page-nav__item">Add Branch</button>
      <div className="map-links">
        {userMap ? userMap.map((branch, index) => (
          (userMapKeys[index] !== 'title') ?
          <a href={`/mind-maps/edit?mapid=${mapId}&branch=${userMapKeys[index]}`} className="map-link">{branch}</a> : <a href={`/mind-maps/edit?mapid=${mapId}`} className="map-link">{branch}</a> 
        )) : <h2>No branches</h2>}
      </div>
    </Page>
  )
}

export default MindMapPage
