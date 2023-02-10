import { ADD_COMMENT, ADD_REPLY, DELETE_COMMENT, UPDATE_COMMENT } from "../reducers/actionConstants"

export default class Datastore {
  constructor(dispatcher) {
    this.dispatch = dispatcher
  }

  createComment(comment) {
    // debug statement
    // console.log('datastore create comment - ', comment)

    this.dispatch({
      type: ADD_COMMENT,
      payload: { comment }
    })
  }

  updateComment(id, key, value) {
    this.dispatch({
      type: UPDATE_COMMENT,
      payload: { id, key, value }
    })
  }

  delete(commentId) {
    this.dispatch({
      type: DELETE_COMMENT,
      payload: { commentId }
    })
  }

  createReply(parentId, newCommentId) {
    // debug statement
    // console.log('datastore data ', this.data)

    this.dispatch({
      type: ADD_REPLY,
      payload: { parentId, newCommentId }
    })
  }

  getComments() {

  }

  getReplies() {

  }
}
