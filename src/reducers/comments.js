import { ADD_COMMENT, ADD_REPLY, DELETE_COMMENT, UPDATE_COMMENT } from "./actionConstants";
import { cloneDeep } from 'lodash'
import { getId } from "../utils/common";


// here object id is prefixed by _ cuz in browser objects with numeric keys will be sorted
// automatically in increasing order, so to prevent that behaviour
// keeping keys as string
const comments = {
  '_123': {
    id: 123,
    comment: 'Hi there, this is the comment posted and some more comments will be posted in this series.\n This comment widget is highly optimized and reusable that is build on top of view-controller-service pattern that enables this widget to be easily managable and quite simple to enhance it if need be.',
    parentId: null,
    timestamp: +new Date(),
    hasReplies: false
  },
  '_125': {
    id: 125,
    comment: 'Hi there, this is the comment posted and some more comments will be posted in this series.\n This comment widget is highly optimized and reusable that is build on top of view-controller-service pattern that enables this widget to be easily managable and quite simple to enhance it if need be.',
    parentId: 124,
    timestamp: +new Date(),
    hasReplies: false
  },
  '_124': {
    id: 124,
    comment: 'Hi there, this is the comment posted and some more comments will be posted in this series.\n This comment widget is highly optimized and reusable that is build on top of view-controller-service pattern that enables this widget to be easily managable and quite simple to enhance it if need be.',
    parentId: null,
    timestamp: +new Date(),
    hasReplies: true
  },
  '_127': {
    id: 127,
    comment: 'Hi there, this is the comment posted and some more comments will be posted in this series.\n This comment widget is highly optimized and reusable that is build on top of view-controller-service pattern that enables this widget to be easily managable and quite simple to enhance it if need be.',
    parentId: 124,
    timestamp: +new Date(),
    hasReplies: false
  },
  '_129': {
    id: 129,
    comment: 'Hi there, this is the comment posted and some more comments will be posted in this series.\n This comment widget is highly optimized and reusable that is build on top of view-controller-service pattern that enables this widget to be easily managable and quite simple to enhance it if need be.',
    parentId: null,
    timestamp: +new Date(),
    hasReplies: false
  },
  '_126': {
    id: 126,
    comment: 'Hi there, this is the comment posted and some more comments will be posted in this series.\n This comment widget is highly optimized and reusable that is build on top of view-controller-service pattern that enables this widget to be easily managable and quite simple to enhance it if need be.',
    parentId: 124,
    timestamp: +new Date(),
    hasReplies: false
  },
  '_128': {
    id: 128,
    comment: 'Hi there, this is the comment posted and some more comments will be posted in this series.\n This comment widget is highly optimized and reusable that is build on top of view-controller-service pattern that enables this widget to be easily managable and quite simple to enhance it if need be.',
    parentId: null,
    timestamp: +new Date(),
    hasReplies: false
  },
  '_130': {
    id: 130,
    comment: 'Hi there, this is the comment posted and some more comments will be posted in this series.\n This comment widget is highly optimized and reusable that is build on top of view-controller-service pattern that enables this widget to be easily managable and quite simple to enhance it if need be.',
    parentId: null,
    timestamp: +new Date(),
    hasReplies: true
  },
  '_131': {
    id: 131,
    comment: 'Hi there, this is the comment posted and some more comments will be posted in this series.\n This comment widget is highly optimized and reusable that is build on top of view-controller-service pattern that enables this widget to be easily managable and quite simple to enhance it if need be.',
    parentId: 130,
    timestamp: +new Date(),
    hasReplies: true
  },
  '_132': {
    id: 132,
    comment: 'Hi there, this is the comment posted and some more comments will be posted in this series.\n This comment widget is highly optimized and reusable that is build on top of view-controller-service pattern that enables this widget to be easily managable and quite simple to enhance it if need be.',
    parentId: 131,
    timestamp: +new Date(),
    hasReplies: true
  },
  '_133': {
    id: 133,
    comment: 'Hi there, this is the comment posted and some more comments will be posted in this series.\n This comment widget is highly optimized and reusable that is build on top of view-controller-service pattern that enables this widget to be easily managable and quite simple to enhance it if need be.',
    parentId: 132,
    timestamp: +new Date(),
    hasReplies: false
  }
}

const replies = {
  124: [125, 126, 127],
  130: [131],
  131: [132],
  132: [133]
}

export const commentsInitialState = {
  comments,
  replies
};

const commentsReducer = (state = commentsInitialState, { type, payload }) => {
  switch (type) {
    case ADD_COMMENT: {
      const { comment } = payload
      const { comments: oldComments, replies } = state
      const comments = cloneDeep(oldComments)

      // Add comment is fairly easy here, since we already done the major hard work in normalizing the comments and replies in linear form
      comments[getId(comment.id)] = comment

      return {
        comments,
        replies
      }
    }
    case UPDATE_COMMENT: {
      const { id, key, value } = payload
      const { comments, replies } = state
      const clonedComments = cloneDeep(comments)
      const commentId = getId(id)
      const targetComment = clonedComments[commentId]

      targetComment[key] = value

      clonedComments[commentId] = targetComment

      return {
        comments: clonedComments,
        replies
      }
    }
    case DELETE_COMMENT: {
      const { commentId } = payload
      const { comments, replies } = state
      const clonedComments = cloneDeep(comments)

      // Delete is easy here, since we already done the major hard work in normalizing the comments data in linear form
      clonedComments[getId(commentId)].isDeleted = true

      return {
        comments: clonedComments,
        replies
      }
    }
    case ADD_REPLY: {
      const { replies: oldReplies, comments } = state
      const { parentId, newCommentId } = payload
      const replies = cloneDeep(oldReplies)
      const currentReplies = replies[parentId]
      // if the replies exists for comment<parentId>
      // add new reply to this existing list
      // or, create the list to this comment<parentId>
      if (currentReplies?.length > 0) {
        const newReplies = [...currentReplies, newCommentId]
        replies[parentId] = newReplies
      } else {
        replies[parentId] = [newCommentId]
      }

      return {
        comments,
        replies
      }
    }
    default:
      return state
  }
}

export default commentsReducer
