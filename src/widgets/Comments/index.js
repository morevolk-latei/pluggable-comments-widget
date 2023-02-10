import React, { memo, useEffect, useReducer, useState } from "react";

import Datastore from "../../utils/Datastore";
import Textarea from "../../components/Textarea";
import CommentsService from "../../utils/CommentsService";
import commentsReducer, { commentsInitialState } from "../../reducers/comments";

import './index.scss';
import RenderComments from "./RenderComments";


function Comments() {
  const [commentService, setCommentService] = useState(null)
  const [commentsData, dispatcher] = useReducer(commentsReducer, commentsInitialState)


  useEffect(() => {
    const commentService = new CommentsService(new Datastore(dispatcher))
    setCommentService(commentService)

    return () => {
      setCommentService(null)
    }
  }, [])


  const handleCommentpost = (data) => {
    console.log('comment = \n', data)
    commentService.postComment(data)
  }

  if (!commentService) {
    return <div className='content-loader'>Loading...</div>
  }

  console.log(commentsData)

  return (
    <div className='comments-container'>
      <Textarea onSubmit={handleCommentpost} />
      <RenderComments {...commentsData} commentService={commentService} />
    </div>
  )
}

export default memo(Comments)

