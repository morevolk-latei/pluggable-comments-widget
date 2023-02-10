import classNames from 'classnames'
import React, { useState } from 'react'
import Textarea from '../../components/Textarea'
import { getId } from '../../utils/common'


/**
 * It takes a list of comments and replies, recursively iterates over them and renders them in a tree-like
 * structure
 */
export default function RenderComments({ comments, replies, commentService }) {

  if (Object.keys(comments).length === 0) {
    return null
  }

  // these are the base comments that further will have the replies comments in them if any
  const baseCommentNodes = Object.keys(comments).filter(id => !comments[id].parentId)


  /**
   * It takes a list of comments, recursively iterates over them and renders them in a tree-like structure
   * @param list - list of comments to render
   * @param currentIndex - the index of the comment in the list
   * @param N - total number of comments in the list
   * @param [UI] - this is the list of comments that we'll render on the UI.
   * @param [forReply=false] - this is a boolean flag, which is true when we are rendering the replies
   * of a comment.
   * @returns - if forReply is true, then it returns the view of the comment
   *   - if forReply is false, then it returns the UI list of comments
   */
  const renderComments = (list, currentIndex, N, UI = [], forReply = false) => {

    // debug statement, very useful in case somebody wants to see how recursion working
    // console.log({ forReply, currentIndex, N, id: list[currentIndex], list, UI, })

    if (currentIndex >= N) {
      return forReply ? null : UI
    }

    // comment to render
    const comment = comments[getId(list[currentIndex])]

    function renderReplies() {
      const view = []
      const replyList = replies[comment.id]

      // render the replies
      for (let i = 0; i < replyList.length; i++) {
        view.push(renderComments(replyList, i, replyList.length, [], true))
      }

      return view
    }

    const view = (
      <div
        className={classNames('comment', { 'is-reply': forReply }, comment.id)}
        key={comment.id}
        data-test-id={`${comment.id}${forReply ? '-' + comment.parentId : ''}`}
      >
        {!comment.isDeleted ? (
          <div className='text-box'>
            <p className='text'>{comment.comment}</p>
            <CommentActions commentId={comment.id} parentId={comment.parentId} commentService={commentService} />
          </div>
        ) : <div className='comment deleted' key={comment.id}>Comment deleted...</div>}

        {comment.hasReplies && renderReplies()}
      </div>
    )

    // if there is no parent for this comment, then just add it to UI list, as this is the base comment
    if (!comment.parentId && !forReply) {
      UI.push(view)
      // now iterate for next comment in the list
      return renderComments(list, ++currentIndex, N, UI)
    } else {
      // this means, that this comment <view> is the reply of the comment.parentId comment, hence we do not need to 
      // add it to UI list, cuz it'll render inside parent's container therefore just return this view.
      if (forReply) {
        return view
      }
    }
  }


  return (
    <div className='comments-list-box card'>
      {renderComments(baseCommentNodes, 0, baseCommentNodes.length)}
    </div>
  )
}


// keeping the component here is fine. since it is coupled with the RenderComments component
function CommentActions({ commentId, parentId, commentService }) {
  const [showReplyInput, setShowReplyInput] = useState(false)

  const toggleReplyInputHandler = () => setShowReplyInput(flag => !flag)

  const handleCommentReply = (comment) => {
    commentService.postComment(comment, commentId)
    toggleReplyInputHandler()
  }

  const handleCommentDelete = (commentId) => {
    commentService.deleteComment(commentId)
  }


  return (
    <div className='action-buttons'>
      <input type='button' value='Reply' onClick={toggleReplyInputHandler} disabled={showReplyInput} />
      <input type='button' value='Delete' onClick={handleCommentDelete.bind(null, commentId, parentId)} />

      {showReplyInput && <Textarea onSubmit={handleCommentReply} inlineView={true} cancelCallback={toggleReplyInputHandler} />}
    </div>
  )
}

