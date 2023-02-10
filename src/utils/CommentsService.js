/**
 * `CommentsService` is a constructor function that takes a datastore as an argument and sets it to the
 * `datastore` property of the object it creates.
 * @param datastore - The datastore object that will be used to store the data.
 */
export default function CommentsService(datastore) {
  this.constructor(datastore)
}

// private member <eid> and function <createComment>
CommentsService.eid = 100 // initializing entity id for comment obj
CommentsService.createComment = function (comment, parentId = null, hasReplies = false) {
  return {
    id: CommentsService.eid++,
    comment,
    parentId,
    timestamp: +new Date(), // EPOCH timestamp format
    hasReplies
  }
}

CommentsService.prototype.constructor = function (datastore) {
  this.datastore = datastore
}

CommentsService.prototype.postComment = function (comment, parentId) {
  const newComment = CommentsService.createComment(comment, parentId)
  // console.log('---- ', newComment)
  this.datastore.createComment(newComment)

  // parentId if present, i.e this comment is the reply of comment with id as parentId
  if (parentId) {
    this.datastore.createReply(parentId, newComment.id)

    // since this is the reply of the comment with id (parentId)
    // need to mark parent comment to have replies, by making hasReplies true
    this.datastore.updateComment(parentId, 'hasReplies', true)
  }
}

CommentsService.prototype.editComment = function (comment) {
  this.datastore.edit()
}

CommentsService.prototype.deleteComment = function (commentId) {
  this.datastore.delete(commentId)
}
