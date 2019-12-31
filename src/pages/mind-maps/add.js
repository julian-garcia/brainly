import React from "react"
import Page from "../../components/page"
import SEO from "../../components/seo"
import { useIdentityContext } from "react-netlify-identity-widget"
import { FirebaseContext } from "gatsby-plugin-firebase"

const MindMapPage = () => {
  const identity = useIdentityContext()
  const firebase = React.useContext(FirebaseContext)

  function addMindMap(userId) {
    return function(e){
      const title = document.querySelector('input[name="title"]').value;
      firebase.database().ref(`/mindmap/${userId}`).push({'title': title})
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
      <h1>Mind Maps</h1>
      <label for="title">Title</label>
      <input type="text" name="title" id="title" />
      <button type="submit" onClick={addMindMap(identity.user.id)}>Submit</button>
    </Page>
  )
}

export default MindMapPage
