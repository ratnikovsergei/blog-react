import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PostPanel } from '../PostPanel/PostPanel';
import { Input } from '../../../../ui';
import { sanitizeContent } from './utils';
import { savePostAsync } from '../../../../store/actions';
import { useServerRequest } from '../../../../hooks';

export const PostForm = ({ post: { id, title, imageUrl, content, publishedAt } }) => {
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requestServer = useServerRequest();

  const onSave = () => {
    const newImageUrl = imageRef.current.value;
    const newTitle = titleRef.current.value;
    const newContent = sanitizeContent(contentRef.current.innerHTML);

    dispatch(
      savePostAsync(requestServer, {
        id,
        imageUrl: newImageUrl,
        title: newTitle,
        content: newContent,
      })
    ).then(() => navigate(`/post/${id}`));
  };

  return (
    <div className="post-content">
      <Input ref={imageRef} defaultValue={imageUrl} placeholder="Изображение..." />
      <Input ref={titleRef} defaultValue={title} placeholder="Заголовок..." />
      <PostPanel
        publishedAt={publishedAt}
        editButton={
          <i
            className="fa fa-floppy-o cursor-pointer"
            aria-hidden="true"
            onClick={onSave}
          ></i>
        }
      />
      <div
        ref={contentRef}
        className="post-text"
        contentEditable={true}
        suppressContentEditableWarning={true}
      >
        {content}
      </div>
    </div>
  );
};
